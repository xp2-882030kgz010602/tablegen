var fs=require("fs");
var config=require("./config.js").config;
var tablesdir=config.tablesdir;
var s0=config.s0;
var s1=config.s1;
var spaces=config.spaces;
var l=Math.pow(spaces+2,spaces);
var smalltable=[];
console.log("Filling table with spaces");
for(var i=0;i<l;i++){
  smalltable.push(" ");
}
var getbestmove=require("./getmove.js").getbestmove;
var str2int=require("./getmove.js").str2int;
var spam=require("./maps.js").spam;
var str2board=function(str){
  var board=[];
  for(var i=0;i<str.length;i++){
    board.push(spam[str[i]]);
  }
  return board;
};
var fillpos=function(row){
  var move=getbestmove(row);
  smalltable[str2int(row[0])]=move;
}
for(var i=s1;i<=s0;i+=2){
  console.log("Filling s="+i);
  var tables=fs.readFileSync("./"+tablesdir+"/"+i+".txt","utf-8").split("\n");
  if(tables[tables.length-1]===""){
    tables.pop();
  }
  tables=tables.map(x=>x.split(" "));
  tables.map(x=>fillpos(x));
}
fs.writeFileSync("./"+tablesdir+"/small.txt",smalltable.join(""));