# Rosmarin
##### ...Something simple, visually appealing, easy to use, written in JavaScript
Web platform (www.cgacest.com) custom developed to provide new solutions with an expanded view from the General Student Center of the Salesian Institution in Talca, Chile.
Fully built in JavaScript, using the MERN development stack (MongoDB, Express ReactJS and NodeJS), with high-quality production, including sending Emails in actions that the user can perform within the platform.
The plan for the development of this software is to make the stay of the students of the establishment much better, by developing this platform, we are doing something that very probably few student centers have done, and if they have, they use WordPress or some other platform. or tool that facilitates the development of the same; We are here to innovate and revolutionize, creating new solutions and adding value to the presence of this institution in our city, also creating the difference between other student centers that have other establishments with those who have passed after generations through the institution. to which this software is intended.
This is because we like art, we like things well done, we are fascinated by making the ordinary extraordinary, we plan that this system be kept constantly updated while my stay as president in the student center is in force, in a current BETA phase, this web platform is currently under development, so bugs and errors at the experience or system level may arise.
![Rosmarin](https://github.com/codewithrodi/rosmarin/blob/main/Images/Rosmarin-Cover.png?raw=true)
### Features
- Highly secure
- Firewall for XSS attacks
- Helmet for secure HTTP Headers
- Cors integration
- Secure Querys in MongoDB
- Manager to facilitate database tasks
- Responsive
- Capable of sending emails
- Specific actions handled, lost connection or server crash...
- Secure API using JWT
- Small animations to soften the user's view
- Easy-to-use architectures
- Detailed validations
- Detailed visitor metrics
### Installation
It should be noted that the Rosmarin development environment has only been Linux Kernel-based distributions, if you are using MacOS or Linux, it is likely that the different instructions presented to you from this section of the reading below will not work. If you have experience, it will not be a problem.
```bash
# Cloning the repository
git clone https://github.com/CodeWithRodi/Rosmarin/
# Accessing the generated directory
cd Rosmarin
# (( ls )
# > Server (Directory that contains the source code of the Backend)
# > Client (Directory containing the React application (Frontend)
# > LICENSE.md (MIT)
# > README.md 
# Now that we have the cloned repository in our file branch, we will proceed to execute the following command to be able to install the NodeJS modules that need both directories to run.
cd Server && npm i --force && cd ../Client && npm i --force && cd ../
# Once the execution of the command is finished, you should be able to initialize your development environment without problems...
cd Client && npm run start
```

### Configuring the Server application
Inside the directory that contains the source code of the server, there is an environment file (.env), called "Settings.env", which contains variables that you must complete for the correct execution of the backend of the client application in case of that you want to link to it.
```env
# Secure key that will be used for the different 
# data encryptions in the course of the different 
# instructions that can be executed from the server side (backend).
SECRET_KEY = YourUltraSecureKeyHere

# Address of the server where the client application is 
# running, unfortunately, even the technology is NOT 
# guessing and cannot know where the client is being hosted.
CLIENT_HOST = http://cgacest.com

# Port where the server application (backend) will 
# start executing over the network.
SERVER_PORT = 7000

# Hostname where the server will be launched in 
# complement with the previously established 
# port on the network.
SERVER_HOST = 0.0.0.0

DATABASE_HOST = mongodb+srv://idorherz:<password>@cluster0.n9jguaa.mongodb.net/?retryWrites=true&w=majority
DATABASE_PASSWORD = 55563019

# Enter the MongoDB database hostname, this should be the 
# URI, we recommend using mongo db atlas (www.mongodb.com/cloud/atlas)
SSL_CERT = 
SSL_KEY = 

CORS_ORIGIN = *

# JSON Web Token configuration, set the amount of day 
# you want the client JSON web Token to expire, by 
# default it is assigned in 90 days
JWT_EXPIRATION_DAYS = 90d
PASSWORD_RESET_TOKEN_MINUTES_FOR_EXPIRE = 30

# Here you indicate the maximum amount of weight that can 
# be received when data is sent to the server, it is advisable 
# to have this low to avoid lagging in the server.
BODY_MAX_SIZE = 100kb

# Configuration that will serve to make the sending of 
# emails work, you can look for tutorials on how to
# get this information from your email account in GMAIL, or 
# if you have an email server already ready you can assign 
# its configuration to these variables
SMTP_HOST = mail.cgacest.com
SMTP_PORT = 465
SMTP_USERNAME = noreply@cgacest.com
SMTP_PASSWORD = 55563019
SMTP_OPT_FROM = noreply@cgacest.com

NODE_TLS_REJECT_UNAUTHORIZED = 0
```
##### Rosmarin 0.2.0, Pre Alpha.
