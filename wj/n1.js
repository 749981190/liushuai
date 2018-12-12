const express=require("express");
const http=express();
const Db=require("./db.js")
const db=new Db("xinyuan")
const bodyparser = require("body-parser");
http.use(bodyparser.urlencoded({extended:false}))
http.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*")
	next()
})

//添加
http.post("/add",(req,res)=>{
	let obj=req.body;
	db.insertOne("ywList",obj,(err,data)=>{
		if(err) throw err;
		res.send("ok")
	})
})

//渲染

http.get("/get",(req,res)=>{
	let obj=req.query;
	console.log(obj);
	db.find("ywList",{},(err,data)=>{
		console.log(data);
		if(err) throw err;
		let arr=[];
		let arrIndex=[];
		if (data.length>8) {
			if (arr.length<8) {
				for (var i = 0; i < 8; i++) {
					let index=suiji(data.length,0);
					if (arrIndex.indexOf(index)==-1) {
						arrIndex.push(index);
						arr.push(data[index])
					}
				}
			} else{
				return
			}
		} else{
			arr=data
		}
		res.send(arr)
	})
})

http.post("/del",(req,res)=>{
	let obj=req.body;
	db.deleteById("ywList",obj.id,(err,data)=>{
		if(err) throw err;
		res.send(data)
	})
})


http.post("/ok",(req,res)=>{
	let obj=req.body;
	console.log("obj1:",obj);
	db.findById("ywList",obj._id,(err,data)=>{
		if(err) throw err;
		console.log("data2:",data);
		data.color=1;
		console.log("data3:",data)
		db.updateById("ywList",obj._id,{color:data.color},(err,data)=>{
			if(err) throw err;
			res.send("ok")
		})
	})
})


function suiji(max,min){
	return parseInt(Math.random()*(max-min)+min)
}

http.listen(8080,function(){
	console.log("ok http://localhost:8080")
})
