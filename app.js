var express = require("express");
var common = require("./common");
var fs = require("fs");
var app = express();
var url = require('url');
app.get('/', (req,res) => res.send(200,{
	date : common.getDate(),
	currDate : common.currDate(),
	time : common.getTime(),
	currentHours : common.getTime().getHours(),
	currentMinutes : common.getTime().getMinutes(),
	currentSeconds : common.getTime().getSeconds()
}))

app.get('/getFile', (req,res) =>{
var data = fs.readFile('file.html', (err,data) =>{
	if(err) res.send(404,err);
	return res.send(200,data);
})
});

app.get('/appendFile', (req,res) =>{
	var data = fs.appendFile('file.html','I am software engineer', (err,data) =>{
	if(err) res.send(404,err);
	return res.send(200,data);
})
});

app.get('/openFile', (req,res) =>{
	var data = fs.open('file.txt','w', (err,data) =>{
	if(err) res.send(404,err);
	return res.send(200,data);
})
});

app.get('/writeFile', (req,res) =>{
	var data = fs.writeFile('file.txt', 'Hello content!', (err,data) =>{
	if(err) res.send(404,err);
	return res.send(200,data);
})
});
app.get('/deleteFile', (req,res) =>{
	console.log(fs.existsSync('file.txt'))
	if(!fs.existsSync('file.txt')) return res.send(500,"File does not exist");

	var data = fs.unlink('file.txt', (err,data) =>{
	if(err) res.send(404,err);
	console.log("Deleted successfully");
	return res.send(200,data);
})

});

app.get('/url',(req,res) =>{
var address = 'http://localhost:8080/url?Name=Prabagaran&Id=01';
var q = url.parse(address, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.Name); //returns 'february'
return res.send(200,"Data printed");
});

app.listen(3000, () => console.log("Application listening port 3000"));