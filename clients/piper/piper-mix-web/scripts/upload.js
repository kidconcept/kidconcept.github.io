var Sftp = require('sftp-upload'), fs = require('fs');

var options = {
    host: "162.243.27.6",
    username: "kidconcept",
    password: "AMmLbv0jvhPOVPiV",
    path: "./build/",
    remoteDir: "/var/www/capslock.io/public_html/clients/piper/",
	privateKey: fs.readFileSync('D:\\llaves\\tomate.ppk\\')
},

sftp = new Sftp(options);

sftp.on('error', function(err){
    throw err;
})
.on('uploading', function(pgs){
    console.log('Uploading', pgs.file);
    console.log(pgs.percent+'% completed');
})
.on('completed', function(){
    console.log('Upload Completed');
})
.upload();
