function ajax_v2(obj){
	return new Promise((resolve,reject)=>{
		obj.method = obj.method || "get";//默认get请求
		if (obj.hasOwnProperty("sync")) { //默认异步请求
			obj.sync = obj.sync;
		}else{
			obj.sync = true;
		}
	
		//需要一个方法将数据格式进行处理    处理为name=asd&pass=123；
		function getContent(){
			var msg = obj.data;
			var arr = [];
			for (var k in msg) {
				arr.push(k+"="+msg[k]);
			}
			return arr.join("&");
		}
		//1、获取
		var xhr = new XMLHttpRequest();
		//get|post分道扬镳
		if(obj.method.toLowerCase() == "get"){
			//判断前台是否向后台发送了数据
			if (obj.data) {
				xhr.open("GET",obj.url+"?"+getContent(),obj.sync)
				xhr.send();
			}else{
				xhr.open("GET",obj.url,obj.sync)
				xhr.send();
			}
		}else{
			xhr.open(obj.method,obj.url,obj.sync);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xhr.send(getContent());
		}
		//殊途同归
		if (obj.sync) {
			//判定为异步
			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						resolve(xhr.responseText)
					}else{
						reject(xhr.status);
					}
				}
			}
		}else{
			alert("请使用异步")
		}
	})
}

ajax_v2.get = function(url,data){
	return new Promise((resolve,reject)=>{
		function getContent(){
			var msg = data;
			var arr = [];
			for (var k in msg) {
				arr.push(k+"="+msg[k]);
			}
			return arr.join("&");
		}
		var xhr = new XMLHttpRequest();
		if (data) {
			xhr.open("GET",url+"?"+getContent(),true)
			xhr.send();
		}else{
			xhr.open("GET",url,true)
			xhr.send();
		}
					
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4) {
				if (xhr.status >=200 && xhr.status < 300 || xhr.status==304) {
					resolve(xhr.responseText)
				}else{
					reject(xhr.status);
				}
			}
		}
	})
}

ajax_v2.post = function(url,data){
	return new Promise((resolve,reject)=>{
		function getContent(){
			var msg = data;
			var arr = [];
			for (var k in msg) {
				arr.push(k+"="+msg[k]);
			}
			return arr.join("&");
		}
		var xhr = new XMLHttpRequest();
		if (data) {
			xhr.open("POST",url,true)
			xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
			xhr.send(getContent());
		}
		
		xhr.onreadystatechange = function(){
			if (xhr.readyState == 4) {
				if (xhr.status >=200 && xhr.status < 300 || xhr.status==304) {
					resolve(xhr.responseText)
				}else{
					reject(xhr.status);
				}
			}
		}
	})
}

//JSONP封装
function jsonP(obj){
	window.callback = function(res){
		obj.success(res);
	}
	let str = "";
	if(obj.data){
		let arr = [];
		for(var k in obj.data){
			arr.push(k+"="+obj.data[k]);
		}
		str = arr.join("&");
	}
	if(str){
		str+="&callback=callback";
	}else{
		str = "callback=callback";
	}
	let sc = document.createElement("script");
	sc.src = obj.url+"?"+str;
	document.body.appendChild(sc);
	sc.remove();
	window.callback = null;
}


function jsonPSelf(url,obj) {
	return new Promise((resolve,reject)=>{
		window.callback = function(res){
			obj.success(res);
		}
		let str = "";
		if(obj.data){
			let arr = [];
			for(var i in obj.data){
				arr.push(i +"="+ obj.data[i]);
			}
			str = arr.join("&");
		}
		if(str){
			str+="&callback=callback";
		}else{
			str = "callback=callback";
		}
		let sc = document.createElement("script");
		sc.src = url+"?"+str;
		document.body.appendChild(sc);
		sc.remove();
	})
}

//
//ajax_v2({
//	url:"",
//	data:"",
//	method:""
//})
//
//ajax_v2.get(url,data)
//.then(res=>{})
//ajax_v2.post(url,data)
//.then(res=>{})
//ajax_v2.jsonp(url,data)
//.then(res=>{})


function ajax (obj) {
	//设置相关默认值
	//默认get
	obj.method = obj.method || "get";
	//设置请求头
	obj.header = obj.header || {"content-type":"application/x-www-form-urlencoded"}
	
	if (obj.data) {
		let arr = []
		for(var k in obj.data){
			arr.push(k+'='+obj.data[k])
		}
	}
}