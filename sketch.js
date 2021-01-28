var ball;
var database,positions;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballposition = database.ref('Ball/Position');
    ballposition.on("value",readposition,showerror);
}

function draw(){
    background("white");
     
    if(positions !== undefined) {
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
        drawSprites();
    }

    
}

function changePosition(x,y){
   database.ref('Ball/Position').set({
       'x':positions.x + x,
       'y':positions.y + y,
   }) 
}


function readposition(data) {
    positions = data.val();
    ball.x = positions.x;
    ball.y = positions.y;
    
}

function showerror() {
    console.log("error in writing to the database")
}