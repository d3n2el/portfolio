// wanna make a class for the player using OOP to better manage everything across files(dont want everything in 1 since it becomes easily messy)
//Create class

//add all the variables
export class Player{
    constructor(Canvas){
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
// Now I need to actually write the text on the background. Idk if I should use Css,, html or js. Why?
//Because i need to make it so that the text follows the players camera  so that it goes along and actually yk, creates a level by itself.
// I also need to load different images, from the simple bricks to the more complex pngs I designed.
// I also would like to use the italiana font since im italian and it looks great
// While doing all of that, I need it to integrate it all with my js code, but If i do that, i don't think I can utilize the correct fonts
 // right now I will just create random text  using lorem and try to make it dinamically appear with player arrival
export class UI {
    //doesn't load anything, broke the entire thing, will commit out of desesperation
    constructor(ctx, Canvas){
        this.Canvas = Canvas
        this.ctx = ctx
    }
    DrawWorldText(text, x,y, color = "black", size = 20){
        this.ctx.font = '${size}px Italiana'
        this.ctx.fillStyle = color;
        ctx.fillText(text, x - player.cameraX, y);
    }
}      
    

