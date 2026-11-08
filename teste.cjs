const assert=require('node:assert/strict');
const OMR=require('./engine.js');
const width=1000,height=1414,data=new Uint8ClampedArray(width*height*4).fill(255);
function pixel(x,y,value){const offset=(y*width+x)*4;data[offset]=value;data[offset+1]=value;data[offset+2]=value;}
for(const [centerX,centerY] of OMR.layout.corners)for(let offsetY=-18;offsetY<18;offsetY++)for(let offsetX=-18;offsetX<18;offsetX++)pixel(centerX+offsetX,centerY+offsetY,0);
for(let question=0;question<20;question++)for(let option=0;option<5;option++){const [centerX,centerY]=OMR.position(question,option);const filled=(question!==3&&question!==6&&option===question%5)||(question===6&&(option===1||option===2));for(let offsetY=-15;offsetY<=15;offsetY++)for(let offsetX=-15;offsetX<=15;offsetX++){const radius=Math.hypot(offsetX,offsetY);if((radius>13&&radius<15)||(filled&&radius<=14))pixel(centerX+offsetX,centerY+offsetY,question===8&&radius<13?150:0);}}
const image={width,height,data},corners=OMR.markers(image);assert.ok(corners);const result=OMR.read(image,corners);
for(let question=0;question<20;question++)if(question!==3&&question!==6)assert.equal(result[question].answer,OMR.letters[question%5]);
assert.equal(result[3].answer,'');assert.equal(result[3].uncertain,true);assert.match(result[6].reason,/dupla/);assert.equal(result[8].uncertain,true);
const destination=[[130,180],[880,220],[950,1290],[90,1200]],map=OMR.transform(OMR.layout.corners,destination);
OMR.layout.corners.forEach(([x,y],index)=>{const actual=map(x,y);assert.ok(Math.abs(actual[0]-destination[index][0])<.001);assert.ok(Math.abs(actual[1]-destination[index][1])<.001);});
const inverse=OMR.transform(destination,OMR.layout.corners),warped=new Uint8ClampedArray(data.length).fill(255);
for(let y=0;y<height;y++)for(let x=0;x<width;x++){const [originalX,originalY]=inverse(x,y),pixelX=Math.round(originalX),pixelY=Math.round(originalY);if(pixelX>=0&&pixelY>=0&&pixelX<width&&pixelY<height){const source=(pixelY*width+pixelX)*4,target=(y*width+x)*4;warped[target]=data[source];warped[target+1]=data[source+1];warped[target+2]=data[source+2];}}
const perspective=OMR.read({width,height,data:warped},destination);assert.deepEqual(perspective.map(item=>item.answer),result.map(item=>item.answer));
assert.throws(()=>OMR.transform([[0,0],[0,0],[0,0],[0,0]],destination));
console.log('OK: 20 questões, branco, dupla marca, marca fraca, detecção de marcadores e leitura sob perspectiva.');
