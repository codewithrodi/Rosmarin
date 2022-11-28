const FileSystem = require('fs');
const Sharp = require('sharp');

const GestDestination = (Request, File, Callback) => Callback(null, '/dev/null');

const GetFilename = (Name, Input) =>
    Name.split('.')
        .slice(0, -1).join('.') + 
        `${Input.useTimestamp ? '-' + Date.now() : ''}` +
        '.' + Input.fileFormat;

const PrepareSharpStream = (SharpStream, Input) => {
    if(Input.resize){
        const { width, height, resizeMode } = Input.resize;
        SharpStream.resize({
            width,
            height,
            fit: resizeMode 
        });
    }
    switch(Input.fileFormat){
        case 'png':
            return SharpStream.png(Input.quality ? { quality: Input.quality } : {});
        case 'webp':
            return SharpStream.webp(Input.quality ? { quality: Input.quality } : {});
        default:
            return SharpStream.jpeg(Input.quality ? { quality: Input.quality } : {});
    }
};

const HandleWaterMark = async (SharpStream, Input) => {
    const Locations = {
        'top-left': 'northwest',
        'top-right': 'northeast',
        'bottom-left': 'southwest',
        'bottom-right': 'southeast'
    };
    const Gravity = Locations[Input.location];
    // ! Preparing watermark with transparency
    const Opacity = Input.opacity ? Number(Input.opacity) * 2.55 : 255;
    const WaterMarkStream = await Sharp(Input.input)
        .composite([
            {
                input: Buffer.from([ 0, 0, 0, Opacity ]),
                raw: {
                    width: 1,
                    height: 1,
                    channels: 4
                },
                tile: true,
                blend: 'dest-in'
            }
        ])
        .toFormat('png')
        .toBuffer();
    return SharpStream.composite([{
        input: WaterMarkStream,
        gravity: Gravity || 'center',
        blend: 'atop'
    }])
};

const HandleSave = async (Request, File, Callback, ImageOptions, Path, WaterMarkOptions) => {
    let Stream = Sharp();
    if(WaterMarkOptions)
        Stream = await HandleWaterMark(Stream, WaterMarkOptions);
    let Filename = GetFilename(Date.now().toString() + File.originalname, ImageOptions);
    Stream = PrepareSharpStream(Stream, ImageOptions);
    Stream
        .toFile(Path + '/' + Filename, function(HSError){
            if(HSError) 
                console.error(HSError);
        })
        .on('finish', function(){
            Callback(null, {
                filename: Filename,
                path: Path + '/' + Filename
            });
        });
    File.stream.pipe(Stream);
};

function CustomStorage(Options){
    this.GestDestination = Options.Destination || GestDestination;
    this.ImageOptions = Options.ImageOptions || (
        Options.SharpOptions || { fileFormat: 'jpg', quality: 80 });
    this.WaterMarkOptions = Options.WaterMarkOptions;
};

CustomStorage.prototype._handleFile = function _handleFile(Request, File, Callback){
    const ImageOptions = this.ImageOptions;
    const WaterMarkOptions = this.WaterMarkOptions;
    this.GestDestination(Request, File, function(HFError, Path){
        if(HFError)
            return Callback(HFError);
        HandleSave(Request, File, Callback, ImageOptions, Path, WaterMarkOptions);
    });
};

CustomStorage.prototype._removeFile = function _removeFile(Request, File, Callback){
    FileSystem.unlink(File.path, Callback);
};

module.exports = function(Options){
    return new CustomStorage(Options);
};