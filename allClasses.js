// wanna make a class for the player using OOP to better manage everything across files(dont want everything in 1 since it becomes easily messy)
//Create class

//add all the variables
let Canvas = document.getElementById("GameCanvas")
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
        if(this.vy >= ground){
            this.vy = this.jumpForce
        }
    }
    
}
