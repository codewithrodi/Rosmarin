const Crypto = require('crypto');
const Mongoose = require('mongoose');
const Validator = require('validator');
const BCrypt = require('bcryptjs');
const Validations = global.Validations.Authentication;

const UserSchema = new Mongoose.Schema({
    Username: {
        type: String,
        minlength: [Validations.Username.MinLength, 'AUTH_USERNAME_MINLENGTH'],
        maxlength: [Validations.Username.MaxLength, 'AUTH_USERNAME_MAXLENGTH'],
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, 'AUTH_USERNAME_NOT_PROVIDED']
    },
    Email: {
        type: String,
        required: [true, 'AUTH_EMAIL_NOT_PROVIDED'],
        unique: true,
        lowercase: true,
        validate: [Validator.isEmail, 'AUTH_INVALID_EMAIL']
    },
    Password: {
        type: String,
        required: [true, 'AUTH_PASSWORD_NOT_PROVIDED'],
        minlength: [Validations.Password.MinLength, 'AUTH_PASSWORD_MINLENGTH'],
        maxlength: [Validations.Password.MaxLength, 'AUTH_PASSWORD_MAXLENGTH'],
        select: false
    },
    PasswordConfirm: {
        type: String,
        required: [true, 'AUTH_PASSWORD_CONFIRM_NOT_PROVIDED'],
        validate: {
            validator: function(Value){
                return Value === this.Password;
            },
            message: 'AUTH_PASSWORD_NOT_SAME'
        }
    },
    Role: {
        type: String,
        lowercase: true,
        enum: ['user', 'admin'],
        default: 'User'
    },
    PasswordChangedAt: Date,
    PasswordResetToken: String,
    PasswordResetExpires: Date,
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function(Next){
    if(!this.isModified('Password')) 
        return Next();
    this.Username = (this.Username.toLowerCase()).replace(/\s+/g, '');
    this.Password = await BCrypt.hash(this.Password, 12);
    this.PasswordConfirm = undefined;
});

UserSchema.pre('save', function (Next){
    if(!this.isModified('Password') || this.isNew)
        return Next();
    this.PasswordChangedAt = Date.now() - 1000;
    Next();
});

UserSchema.methods.IsCorrectPassword = async function (MaybePassword, UserPassword){
    return await BCrypt.compare(MaybePassword, UserPassword);
};

UserSchema.methods.IsChangedPasswordAfterJWTWasIssued = async function (JWTTimestamp){
    if(this.PasswordChangedAt){
        const PasswordChangedAtDateTimestamp = parseInt(this.PasswordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < PasswordChangedAtDateTimestamp;
    }
    return false;
};

UserSchema.methods.CreatePasswordResetToken = function(){
    const ResetToken = Crypto.randomBytes(32).toString('hex');
    this.PasswordResetToken = Crypto.createHash('sha256').update(ResetToken).digest('hex');
    this.PasswordResetExpires = Date.now() + process.env.PASSWORD_RESET_TOKEN_MINUTES_FOR_EXPIRE * 60 * 1000;
    return ResetToken;
};

const User = Mongoose.model('User', UserSchema);

module.exports = User;