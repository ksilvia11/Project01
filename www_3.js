const http=require("http");
const fs = require("fs");
const dateTimeET = require("./src/dateTimeET")
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Silvia Kukk, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Silvia, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	//res.write("Veebiserver käivitus!");
	res.write(pageHead);
	//
	res.write(pageBody);
	res.write('\t<p>Nädalapäev: ' + dateTimeET.day() + '</p>\n');
	res.write('\t<p>Kuu: ' + dateTimeET.date(1) + '</p>\n');
	res.write('\t<p>Kellaaeg: ' + dateTimeET.time() + '</p>\n');
	res.write(pageFoot);
	return res.end();
}).listen(5213);