var config=require("./config.js").config;
var movefile=config.movefile;
var movedirfile=config.movedirfile;
var move=require(movefile).move;
var pair=require(movefile).pair;
var moveleft=require(movedirfile).moveleft;
var moveright=require(movedirfile).moveright;
var moveup=require(movedirfile).moveup;
var movedown=require(movedirfile).movedown;
var maps=require("./maps.js").maps;
var spam=require("./maps.js").spam;
var addrandomtile=function(board){
  var blanks=[];
  for(var i=0;i<board.length;i++){
    board[i]?null:blanks.push(i);
  }
  var p=Math.floor(Math.random()*blanks.length);
  board[blanks[p]]=Math.random()<0.1?4:2;
};
var moveall=function(board,direction){
  if(direction==="L"){
    moveleft(board)?addrandomtile(board):null;
  }else if(direction==="R"){
    moveright(board)?addrandomtile(board):null;
  }else if(direction==="U"){
    moveup(board)?addrandomtile(board):null;
  }else if(direction==="D"){
    movedown(board)?addrandomtile(board):null;
  }
};
var board=[4,2,4,2,2,2,2,2];
var fs=require("fs");
var f=[0,2,4,8,16,32,64,128,256,512];
var g=["    ","2   ","4   ","8   ","16  ","32  ","64  ","128 ","256 ","512 ","1024"];
var b="0123456789a";
var maps={};
var spam={};
for(var i=0;i<f.length;i++){
  var F=f[i];
  maps[F]=b[i];
  spam[F]=g[i];
}
var getmove=function(board){
  var s=0;
  board.map(x=>(s+=x));
  var str=board.map(x=>maps[x]).join("");
  var table=fs.readFileSync("./"+config.tablesdir+"/"+s+".txt","utf-8").split("\n").map(x=>x.split(" "));
  var row;
  for(var i=0;i<table.length;i++){
    row=table[i];
    if(row[0]===str){
      break;
    }
  }
  var prob=row[1];
  var i=3;
  while(row[i]!==prob){
    i+=2;
    if(i>=row.length){
      process.exit();
    }
  }
  //console.log(row);
  return row[i-1];
};
var printboard=function(board){
  board=board.map(x=>spam[x]);
  var r0=board.slice(0,4).join("");
  var r1=board.slice(4,6).join("")+"    ";
  var r2="    "+board[6]+"        ";
  var r3="    "+board[7]+"        ";
  console.log(r0+"\n"+r1+"\n"+r2+"\n"+r3);
};
printboard(board);
//console.log(getmove(board));
while(true){
  var m=getmove(board);
  console.log(m);
  moveall(board,m);
  printboard(board);
}
  