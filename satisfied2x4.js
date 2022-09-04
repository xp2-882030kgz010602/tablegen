var satisfied=function(board){
  for(var i=0;i<8;i++){
    if(board[i]===512){
      return 1;
    }
  }
  return 0;
};
exports.satisfied=satisfied;