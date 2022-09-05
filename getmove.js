var fs=require("fs");
var config=require("./config.js").config;
var tablesdir=config.tablesdir;
var maps=require("./maps.js").maps;
var b=require("./maps.js").b;
var getbestmove=function(row){
  var prob=row[1];
  var i=3;
  while(row[i]!==prob){
    i+=2;
    if(i>=row.length){
      return " ";
    }
  }
  //console.log(row);
  return row[i-1];
};
var getmove=function(board){
  var s=0;
  board.map(x=>(s+=x));
  var str=board.map(x=>maps[x]).join("");
  //console.log(str2int(str));
  var table=fs.readFileSync("./"+tablesdir+"/"+s+".txt","utf-8").split("\n").map(x=>x.split(" "));
  var row;
  for(var i=0;i<table.length;i++){
    row=table[i];
    if(row[0]===str){
      break;
    }
  }
  return getbestmove(row);
};
var logmap={};
for(var i=0;i<b.length;i++){
  logmap[b[i]]=i;
}
var str2int=function(str){
  var int=0;
  var c=str.length;
  var base=c+2;
  for(var i=0;i<c;i++){
    int*=base;
    int+=logmap[str[i]];
  }
  return int;
};
exports.getmove=getmove;
exports.getbestmove=getbestmove;
exports.str2int=str2int;