var http = require("http");
var fs = require('fs');

var ext = function (file_name) {
    var ppos = file_name.indexOf('.');
    return ppos > 0 ? file_name.substr(ppos + 1) : null;
}
http.createServer(function (request, response) {
    var url = request.url.substr(1);
    url = url ? url : 'index.html';
    console.log(url);

    var mime = "text/plain";
    switch (ext(url)) {
        case 'js':
            mime = "application/javascript";
            break;
        case 'css':
            mime = "text/css";
            break;
        case 'html':
            mime = "text/html";
            break;
        case 'appcache':
            mime = "text/cache-manifest";
            break;
        case 'png':
            mime = "image/png";
            break;
        case 'otf':
            mime = "font/opentype";
            break;
        case 'woff':
            mime = "application/font-woff";
            break;
        case 'ttf':
            mime = "application/x-font-ttf";
            break;


    }
    response.writeHead(200, {"Content-Type": mime});
    response.end(fs.readFileSync('./dist/'+url));
}).listen(9000);
