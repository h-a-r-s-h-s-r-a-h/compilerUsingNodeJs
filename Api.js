const express=require("express")
const app=express()
const bodyP=require("body-parser")
const compiler = require("compilex")
const options = {stats:true}
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.12",express.static(__dirname+"/codemirror-5.65.12"))
app.get("/", function(req,res){
    compiler.flush(function(){
        console.log("deleted")
    })
    res.sendFile(__dirname+"/index.html")
})
app.post("/compile",function(req,res){
      
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    
    try{
        if(lang=="Cpp"){
            if(!input){ 
                var envData = { OS : "windows" , cmd : "g++" , options:{timeout:10000}};
                compiler.compileCPP(envData , code , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output: "errorrrrrrrrre"})
                    }
                });
            }
            else{ 
                var envData = { OS : "windows" , cmd : "g++" , options:{timeout:10000}}; 
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output: "errorrrrrrrrrer"})
                    }
                });
            }
        }
        else if(lang=="Java"){
            if(!input){
                var envData = { OS : "windows"};
                compiler.compileJava( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output: "Java errorrr"})
                    }
                });    
            }
            else if(input){  
                var envData = { OS : "windows"};
                compiler.compileJavaWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output: "Java errorrr"})
                    }
                });
            }
        }
        else if(lang == "Python"){
            if(!input){ 
                var envData = { OS : "windows"}; 
                compiler.compilePython( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output: "errorrrrr1"})
                    }
                });    
            }
            else if(input){ 
                var envData = { OS : "windows"};
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output: "errorrrrr"})
                    }       
                });
            }
        }
    }
    catch(e){
        console.log("errorrrrrrr")
    }

})

app.listen(8001)