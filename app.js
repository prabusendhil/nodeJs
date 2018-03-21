var express = require("express");
var common = require("./common");
var fs = require("fs");
var app = express();
var url = require('url');
var nodemailer = require("nodemailer");
var formidable = require('formidable');
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

app.get('/uploadFile',(req,res) =>{
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write('</form>');
  return res.end();
});
app.post('/fileupload',(req,res) =>{
var form = formidable.IncomingForm();
form.parse(req, (err,fields,file) =>{
	res.write("File upload");
	res.end();
})
})

app.get('/sendMail',(req,res) =>{
var transport = nodemailer.createTransport({
	service: "gmail",
	host: 'smtp.gmail.com',
	auth:{
		user : "prabusendhil@gmail.com",
		pass:"Chennai1991"
	}

});

var mailData = {
	from: "prabusendhil@gmail.com",
	to: "gomathikalaivani.tech@gmail.com",
	subject: "Dont reply. It is system generated mail",
	text : "All is well"
}
//*****************
//for send mail to someone need to enable "Allow less secure apps: ON"
//*****************
transport.sendMail(mailData,(error,info) => {
	if(error) {
		console.log("error is :" +error);
	}else{
		console.log("Email sent: "+info.response);
		res.send("Mail sent. Please read your inbox")
	}
});

})

app.listen(3000, () => console.log("Application listening port 3000"));