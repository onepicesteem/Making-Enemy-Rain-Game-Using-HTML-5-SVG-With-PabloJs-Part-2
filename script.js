$(function(){

  var svg = Pablo('#ground').svg({ //create svg with height and width
          width: 485,
          height: 775
      });
var enemy;
var enemySize=15;//I set rectangle's size 15px

var flag;//To draw a rectangle
var enemyColor='red';
var enemyArray=new Array();

//enemy=enemyBuilder(10,10,'red');//pressing rect in screen

var enemyCount=5;
var separation;
var first;

var protectorBody;
var protectorGun;
var protectorX=240;
var protectorY=720;


var bullet;
var bulletFlag=0;

//create line
lineBuilder(0,720,485,720);
lineBuilder(0,760,485,760);

protectorBuilder(protectorX,protectorY);

$(document).keydown(function(event){//the moment the keyboard is pressed in jquery
     //37 left - 39  right

     var code =  event.which;//get the code of the key pressed

     if(code==37){//left key pressed
       protectorBody.remove();
       protectorGun.remove();
       if(protectorX>0)
       protectorX=protectorX-5;


       protectorBuilder(protectorX,protectorY);

     }

     if(code==39){//right key pressed
       protectorBody.remove();
       protectorGun.remove();
       if(protectorX<450)
       protectorX=protectorX+5;


       protectorBuilder(protectorX,protectorY);

     }

     if(code==32){//space key pressed
         if(bulletFlag==0){
           bulletX=protectorGun.attr('x');
           bulletY=protectorGun.attr('y');
           bulletBuilder(bulletX,bulletY);
           bulletFlag=1;
       }
     }


   });

  var enemyInterval=setInterval(function(){
    enemyCount=5;
    separation=Math.floor(Math.random() * 30)+15;//space between rectangles
    first=Math.floor(Math.random() * 30)+15;//first y coordinate

    for (var i = first; i <465 ; i=i+separation) {

      if(enemyCount>0){
            flag=Math.floor(Math.random() * 4);

            if(flag==1){
                enemy=enemyBuilder(i,0,enemyColor);
                enemyArray.push(enemy);
                enemyCount=enemyCount-1;
            }
          }

    }
    for (var i = 0; i < enemyArray.length; i++) {

      var x=enemyArray[i].attr('x');
      var y=enemyArray[i].attr('y');

      enemyArray[i].remove();

      y=parseInt(y)+15;
      enemy=enemyBuilder(x,y,enemyColor);

      enemyArray[i]=enemy;//set new value
    }

    /*
    ----single enemy movement----
    enemy.remove();
    var y=enemy.attr('y');//accessing the y property of the rectangle
    var x=enemy.attr('x');//accessing the x property of the rectangle

    y=parseInt(y)+15;

    enemy=enemyBuilder(x,y,'red');*/

  }, 1000);

  var bulletInterval=setInterval(function(){
   if(bulletFlag==1){
     bullet.remove();
     bulletY=bulletY-15;
     bulletBuilder(bulletX,bulletY);

       if(bulletY<-10)//bullets, outside the playground
           bulletFlag=0;

     }

   },10);

function enemyBuilder(x,y,color){
    enemy=svg.rect({
          x:x, y:y,
          width:enemySize, height:enemySize,
          fill:  color,
          stroke:'#006',
          'stroke-width': 5,
          'stroke-linejoin': 'round'
    });

  return enemy;
}

function protectorBuilder(x,y){
      protectorBody=svg.rect({
        x:x, y:y,
        width:40, height:40,
        fill:  '#FFDC73',
        stroke:'#004010',
        'stroke-width': 5,
        'stroke-linejoin': 'round'
    });

      protectorGun=svg.rect({
          x:x+18, y:y-20,
          width:6, height:40,
          fill:  '#black'
      });


}

function lineBuilder(x1,y1,x2,y2){
    svg.line({
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      stroke: 'black',
      'stroke-width': 3
  });
}

function bulletBuilder(x,y){
      bullet=svg.rect({
        x:x, y:y,
        width:6, height:10,
        fill:  'red'
    });
}

});
