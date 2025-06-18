// wanna make a class for the player using OOP to better manage everything across files(dont want everything in 1 since it becomes easily messy)
//Create class

//add all the variables
const Canvas = document.getElementById("GameCanvas")
export class Player{
    constructor(){
        this.vx =  0;
        this.vy = 0;
//gravity is just the character slowly coming back to the ground if it is in the air
        this.gravity = 0.5;
// would be good to create a ground variable to know when I reach it
        this.ground = Canvas.height - 100
        this.xLimit = Canvas.width - 100
        this.NegativeXLimit = 100 - Canvas.width
        this.y = 0;
        this.x = 0
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

        // Screen boundarie, in theory
        if (this.x < 0) this.x = 0;
        if (this.x > this.xLimit) this.x = this.xLimit; 
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
    constructor(ctx){
        // first draw the ground. How? Need to understand canvas height and width,
        this.ctx = ctx
        this.canvasHeight = Canvas.height
        this.canvasWidth = Canvas.width
        //then position of tile in my image
        //then I need to load the entire image
        //after I need to load just the part I need
        // check if everything loaded correctly, if yes:
        //Check how many tiles are needed with Canvas width divided by tile width
        // same thing with height but here I should control it so that it reaches only till ground level(so Canvas - 100) and then stops
        // Actually draw the ground with a nested for loop
        console.log("this.ctx set to:", this.ctx); 
    }
        DrawGround(){
        this.tile = new Image();
        this.tile.src ="images/groundTile.png";
        this.tile.onload = () =>  {
            console.log("Image loaded, this.ctx is:", this.ctx);
            this.ctx.drawImage(this.tile,100,100,100,100);
        }
    }
    //then the sky
    DrawSky(){
        console.log;

    }
    //Make it actually dynamic
    //TOFIGURE upload every image I designed and slowly configure all the levels
    
        //Need to make the background reactive, need to make it move so that I can have a proper level just like in mario bros
        //When object moves, then so does the background
        // First I need to upload the brick and draw it multiple times over with a loop to create the ground
        
    }

