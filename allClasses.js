// wanna make a class for the player using OOP to better manage everything across files(dont want everything in 1 since it becomes easily messy)
//Create class

//add all the variables
export class Player{
    constructor(Canvas){
        this.xLimit = Infinity
        this.vx =  0;
        this.vy = 0;
//gravity is just the character slowly coming back to the ground if it is in the air
        this.gravity = 0.5;
        this.Canvas = Canvas
// would be good to create a ground variable to know when I reach it
        this.ground = Canvas.height - 210
        //need to make this dynamic and not static to allow scrolling
        this.xLimit = Canvas.width - this.cameraX
        this.NegativeXLimit = 100 - Canvas.width
        this.y = 0;
        this.x = 0
        this.cameraX = 0
        // variable jumpforce to determine how big of a jump
        this.jumpForce = -5
    }
    update(){
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;

        // Ground collision
        if (this.y > this.ground) {
            this.y = this.ground;
            this.vy = 0;
        }

        // Screen boundarie,
        if (this.x < 0) this.x = 0;
        if (this.x > this.xLimit) this.x = this.xLimit; 
        //wanna create a camera so that it centers the character, just so that it is like old school mario and overall because it is prettier
        this.cameraX = Math.max(0, this.x - this.Canvas.width / 2)
    }
    //create jump function so that it is permitted to jump only when on ground level
    jump(){
        if(this.y >= this.ground){
            this.vy = this.jumpForce
        }
    }
    
}
export class background{
    //
    constructor(ctx, Canvas){
        // first draw the ground. How? Need to understand canvas height and width,
        this.ctx = ctx
        this.canvasHeight = Canvas.height
        this.canvasWidth = Canvas.width
        this.tileLoaded = false
        //then position of tile in my image
        //then I need to load the entire image
        //after I need to load just the part I need
        // check if everything loaded correctly, if yes:
        //Check how many tiles are needed with Canvas width divided by tile width
        // same thing with height but here I should control it so that it reaches only till ground level(so Canvas - 100) and then stops
        // Actually draw the ground with a nested for loop
        this.tile = new Image();
        this.tile.src ="./images/groundTile.png";
        this.tile.onerror = () => console.error("Failed to load ground tile!");
        this.tile.onload = () =>  {
            console.log("Image loaded correctly")
            this.tileLoaded = true
    }

}
        DrawGround(cameraX){
            //current code loads image correctly, just need to resize everything and actually create  a ground
            if (!this.tileLoaded) {
            console.log("Tile not loaded yet!");
            return;
            }
                //assign n pixel
                const tileWidth = 15
                const tileHeight = 15
                //make sure it only reaches ground level
                const groundLevel = this.canvasHeight - 100
                //calculate how many tiles you actually need
                const firstTile = Math.floor(cameraX / tileWidth);
                const tilesNeeded = Math.ceil(this.canvasWidth/ tileWidth) + 1;
                const tilesY = Math.ceil(this.canvasHeight / tileHeight)
                //loop to make sure it covers everything orizontally
                for( let x = firstTile; x < firstTile+tilesNeeded; x++){
                    //nested loop for 
                    for(let y = 0; y < tilesY; y++){
                        //actually drawing the sprite
                        const posX = x * tileWidth - cameraX
                        this.ctx.drawImage(this.tile,posX,groundLevel + (y * tileHeight),tileWidth,tileHeight);
                    }
                }
                
             }
}
export class UI {
    constructor(ctx, Canvas, player){
        this.Canvas = Canvas
        this.ctx = ctx
        this.player = player
    }
    //drawin text on the world, so that it appears and disappears with player's camera
    DrawWorldText(text, x,y, color = "black", size = 30){
        this.ctx.font = `${size}px Italiana`
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x - this.player.cameraX, y);
        //noticed everything is written as one big line, which is not what I want. That's why rn im trying to figure out how to divide things. Tried a couple of different options, none work :(
        const lines = text.split("\n");
        lines.forEach((line, i) => {  // had a problem with syntax that didnt understand, spent time debugging other things just for a syntax error smh
            this.ctx.fillText(
                line, 
                x - this.player.cameraX, 
                y + (i * lineHeight)
            );
        });
    }
    // made a function to draw images so that i can just pass things through here everytime without having to write everything everytime
    // it currently doesn't load the character correctly but it does with psi
    // it load every image except charactter, just tried. I guess i'll just keep the old method in just for the character, for now the most important thing is for it to work
    DrawImage(imagePath, x, y, sizeX, sizeY){
        const image = new Image()
        image.src=imagePath
        if(image.complete){
            this.ctx.drawImage(image,x,y,sizeX, sizeY);
        }
    }   
      
    
}
