const http=require("http");
//moodul URL-i parsimiseks
const url = require("url");
//moodul failiteede haldamiseks
const path = require('path');

const fs = require ('fs').promises;
const dateTimeET = require("./src/dateTimeET")
const textRef = "txt/vanasonad.txt";
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Silvia Kukk, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '<img src="veebiprogrammeerimine_2026_ID.png" alt="Banner">\n';
const pageBody = '\t<h1>Silvia, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res){
	// vaatan URL-i
	console.log('Päring: ' + req.url);
	//Parsin URL-i
	let currentURL = url.parse(req.url, true);
	console.log('Parsituna: ' + currentURL.pathname);
	//console.log('Parsituna: ' + currentURL.href);
	
	if(currentURL.pathname === '/'){
		res.writeHead(200, {"Content-type": "text/html"});
		//res.write("Veebiserver käivitus!");
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\t<p>Nädalapäev: ' + dateTimeET.day() + '</p>\n');
		res.write('\t<p>Kuu: ' + dateTimeET.date(1) + '</p>\n');
		res.write('\t<p>Kellaaeg: ' + dateTimeET.time() + '</p>\n');
		res.write('\n\t<ul>');
		res.write('\n\t\t<li><a href="/kool">Kool</a></li>');
		res.write('\n\t\t<li><a href="/vanasona">Tänane vanasõna</a></li>');
		res.write('\n\t</ul>');
		res.write(pageFoot);
		return res.end();
	}
	
	else if (currentURL.pathname === '/kool'){
		res.writeHead(200, {"Content-type": "text/html"});
		//res.write("Veebiserver käivitus!");
		res.write(pageHead);
		res.write(pageBanner);
		res.write('\t<h1>Tallinna Ülikool</h1>\n\t<p>Tulin Tallinna Ülikooli informaatikat õppima, sest see pakkus mulle huvi. Interaktsioonidisaini valisin, kuna disainimine mulle meeldib.</p>\t<hr>');
		res.write('\n\t<img src="kiisumiisu.jpg" alt="Et su päev hea oleks">\n\t<hr>');
		res.write('\n\t<p><a href="/">Tagasi avalehele</a></p>');
		res.write(pageFoot);
		return res.end();
	
	}
	
	else if (currentURL.pathname === '/vanasona'){
		res.writeHead(200, {"Content-type": "text/html"});
		try {
			const data = await fs.readFile(textRef, "utf8");
			let folkWisdom = data.split(";");
		//res.write("Veebiserver käivitus!");
			res.write(pageHead);
			res.write(pageBanner);
			res.write('\t<h1> Tänane Eesti vanasõna </h1>\n\t<p>Siin näed tänaseks päevaks loositud vanasõna.</p>\t<hr>');
			res.write('\n\t<p>Tänane vanasõna on: ' + folkWisdom[Math.round(Math.random() * (folkWisdom.length - 1))] + '</p><hr>')
			res.write('\n\t<p><a href="/">Tagasi avalehele</a></p>');
			res.write(pageFoot);
			return res.end();
		} catch (err) {
			res.write(pageHead);
			res.write(pageBanner);
			res.writeHead(500, {"Content-type": "text/plain; charset=utf8"});
			return res.end('Vanasõna faili lugemisel tekkis viga!');
		}
	}
	
	else if(path.extname(currentURL.pathname) === '.jpg' || path.extname(currentURL.pathname) === '.JPG'){
		//teeme pildi tegeliku asukoha programmile kättesaadavaks
		let picPath = path.join(__dirname, 'pic', currentURL.pathname);
		try {
			const data = await fs.readFile(picPath);
			res.writeHead(200, {"Content-type": "image/jpeg"});
			res.end(data);
		} catch (err){
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
			return res.end('Pilti ei leitud!');
		}
	}
	
	else if (currentURL.pathname === '/veebiprogrammeerimine_2026_ID.png'){
	 //liidame kättesaamatu päris kataloog jms virtuaalseks failiteeks
		let bannerPath = path.join(__dirname, 'pic', currentURL.pathname)
		try {
			const data = await fs.readFile(bannerPath);
			res.writeHead(200, {"Content-type": "image/png"});
			return res.end(data);
		} catch (err) {
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
			return res.end('Pilti ei leitud!');
		}
	}
	
	//else if (currentURL.pathname === '/veebiprogrammeerimine_2026_ID.png'){
	 //liidame kättesaamatu päris kataloog jms virtuaalseks failiteeks
	//	let bannerPath = path.join(__dirname, 'pic', currentURL.pathname)
		//fs.readFile(bannerPath, (err,data)=>{
			//if (err){
				//throw(err);
			//} else {
			//	res.writeHead(200, {"Content-type": "image/png"});
				//return res.end(data);
		//	}
		//});
	//}
	
	else {
		return res.end ('Viga 404! Ei leia sellist lehte.');
	}
}).listen(5213);