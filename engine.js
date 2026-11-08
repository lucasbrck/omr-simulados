(function(root){
'use strict';
const letters='ABCDE';
const layout={width:1000,height:1414,corners:[[80,260],[920,260],[920,1300],[80,1300]]};
function position(question,option){return [210+Math.floor(question/10)*440+option*55,420+(question%10)*76];}
function transform(from,to){
 const matrix=[],values=[];
 for(let index=0;index<4;index++){const [x,y]=from[index],[u,v]=to[index];matrix.push([x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]);values.push(u,v);}
 for(let column=0;column<8;column++){let pivot=column;for(let row=column+1;row<8;row++)if(Math.abs(matrix[row][column])>Math.abs(matrix[pivot][column]))pivot=row;
 [matrix[column],matrix[pivot]]=[matrix[pivot],matrix[column]];[values[column],values[pivot]]=[values[pivot],values[column]];
 const divisor=matrix[column][column];if(Math.abs(divisor)<1e-10)throw Error('Marcadores inválidos. Selecione novamente.');
 for(let entry=column;entry<8;entry++)matrix[column][entry]/=divisor;values[column]/=divisor;
 for(let row=0;row<8;row++)if(row!==column){const factor=matrix[row][column];for(let entry=column;entry<8;entry++)matrix[row][entry]-=factor*matrix[column][entry];values[row]-=factor*values[column];}}
 return (x,y)=>{const divisor=values[6]*x+values[7]*y+1;return [(values[0]*x+values[1]*y+values[2])/divisor,(values[3]*x+values[4]*y+values[5])/divisor];};
}
function gray(image){const output=new Uint8Array(image.width*image.height);for(let index=0;index<output.length;index++)output[index]=Math.round(image.data[index*4]*.299+image.data[index*4+1]*.587+image.data[index*4+2]*.114);return output;}
function markers(image){
 const {width,height}=image,data=gray(image),seen=new Uint8Array(data.length),queue=new Int32Array(data.length),found=[];
 for(let start=0;start<data.length;start++){if(seen[start]||data[start]>85)continue;let head=0,tail=1;queue[0]=start;seen[start]=1;let minX=width,maxX=0,minY=height,maxY=0,count=0;
 while(head<tail){const current=queue[head++],x=current%width,y=Math.floor(current/width);count++;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
 for(const next of [x>0?current-1:-1,x<width-1?current+1:-1,y>0?current-width:-1,y<height-1?current+width:-1])if(next>=0&&!seen[next]&&data[next]<85){seen[next]=1;queue[tail++]=next;}}
 const boxWidth=maxX-minX+1,boxHeight=maxY-minY+1,ratio=boxWidth/boxHeight;
 if(count>data.length*.00015&&count<data.length*.015&&ratio>.55&&ratio<1.8&&count/(boxWidth*boxHeight)>.65)found.push([(minX+maxX)/2,(minY+maxY)/2]);}
 const targets=[[0,0],[width,0],[width,height],[0,height]],chosen=targets.map(([x,y])=>found.filter(point=>(x===0?point[0]<width*.4:point[0]>width*.6)&&(y===0?point[1]<height*.4:point[1]>height*.6)).sort((first,second)=>Math.hypot(first[0]-x,first[1]-y)-Math.hypot(second[0]-x,second[1]-y))[0]);
 return chosen.every(Boolean)?chosen:null;
}
function read(image,corners){
 const map=transform(layout.corners,corners),data=gray(image),sample=(x,y)=>{const [mappedX,mappedY]=map(x,y),pixelX=Math.round(mappedX),pixelY=Math.round(mappedY);if(pixelX<0||pixelY<0||pixelX>=image.width||pixelY>=image.height)throw Error('Respostas fora da foto. Confira os marcadores.');return data[pixelY*image.width+pixelX];};
 return Array.from({length:20},(_,question)=>{
 const strengths=Array.from({length:5},(_,option)=>{const [centerX,centerY]=position(question,option);let inside=0,total=0,background=0,backgroundTotal=0;
 for(let offsetY=-20;offsetY<=20;offsetY+=2)for(let offsetX=-20;offsetX<=20;offsetX+=2){const radius=Math.hypot(offsetX,offsetY);if(radius<9){inside+=sample(centerX+offsetX,centerY+offsetY);total++;}else if(radius>17&&radius<21){background+=sample(centerX+offsetX,centerY+offsetY);backgroundTotal++;}}
 return Math.max(0,(background/backgroundTotal-inside/total)/Math.max(40,background/backgroundTotal));});
 const ranked=strengths.map((value,index)=>({value,index})).sort((first,second)=>second.value-first.value),best=ranked[0],second=ranked[1];let reason='Leitura provável',uncertain=false,answer=letters[best.index];
 if(best.value<.18){reason='Em branco ou marca muito fraca';answer='';uncertain=true;}else if(second.value>.27){reason='Possível marcação dupla';answer='';uncertain=true;}else if(best.value<.48||best.value-second.value<.25){reason='Marca fraca ou ambígua';uncertain=true;}
 return {answer,reason,uncertain,strengths};});
}
root.OMR={layout,position,transform,markers,read,letters};
if(typeof module!=='undefined')module.exports=root.OMR;
})(typeof window==='undefined'?globalThis:window);
