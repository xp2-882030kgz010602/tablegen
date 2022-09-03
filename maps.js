var f=[0,2,4,8,16,32,64,128,256,512,1024,2048];
var b="0123456789ab";
var maps={};
var spam={};
for(var i=0;i<f.length;i++){
  var x=f[i];
  var y=b[i];
  maps[x]=y;
  spam[y]=x;
}
exports.maps=maps;
exports.spam=spam;