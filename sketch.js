var plane, planeImage, ground, cloud, cloudGroup, cloudImage, skyImage, endLine;
var gameState = 0;
var score = 0;

function preload(){

    planeImage = loadImage("planeImage.png");
    cloudImage = loadImage("cloudImage.png");
    skyImage = loadImage("skyImage.png");

}

function setup(){

    var canvas = createCanvas(1500,400);

    plane = createSprite(750,200,50,50);
    plane.addImage(planeImage);
    plane.scale = 0.5;

    cloudGroup = createGroup();

    endLine = createSprite(4250,200,20,400);
    endLine.shapeColor = "red";

}

function draw(){

    background(0);

    image(skyImage, 0, 0, 1000, 400);
    image(skyImage, 1000, 0, 1000, 400);
    image(skyImage, 2000, 0, 1000, 400);
    image(skyImage, 3000, 0, 1000, 400);
    image(skyImage, 4000, 0, 1000, 400);

    camera.position.x = plane.x;

    if(gameState === 0){

        textSize(50);
        fill("black");
        text("Press right arrow to begin", 550, 50);

        if(keyDown(RIGHT_ARROW)){

            plane.velocityX = 5;
            
            gameState = 1;

        }
    }
    if(gameState === 1){

        score+=1;

        if(keyDown(UP_ARROW)){

            plane.y = plane.y - 5;

        }

        if(keyDown(DOWN_ARROW)){

            plane.y = plane.y + 5;

        }

        createClouds();

        if(plane.isTouching(cloudGroup) || plane.isTouching(endLine)){

            gameState = 2;

        }

        if (plane.x === 1500){

            skyImage.x = plane.x;

        }

    }

    //console.log(plane.x);

    drawSprites();

    textSize(20);
    fill("black");
    text("Score = " + score, plane.x + 600, 20);

    if(gameState === 2){

        plane.velocityX = 0;

        textSize(50);
        text("Game Over", plane.x, 200);
        cloudGroup.destroyEach();

    }

}

function createClouds(){

    if (frameCount%50 === 0){
    
        cloud = createSprite(random(plane.x + 250, plane.x + 750),random(0,400),50,50);
        cloud.lifetime = 200;
        cloud.addImage(cloudImage);
        cloud.scale = 0.3;
        cloudGroup.add(cloud)
    
    }
    

}