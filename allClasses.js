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
        this.x = 4000 // remember to change after testing
        this.cameraX = 0
        // variable jumpforce to determine how big of a jump
        this.jumpForce = -10
        this.width = 150
        this.height = 150
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
    //addding new function to check if player is colliding with objects like bricks and others
    // this is extremely important to auctually make some kind of platformer
    //and also to make sure the final flag actually means end of level
    //did not have this.width and height defined....
    isCollidingWith(otherObject) {
        return (
            this.x < otherObject.x + otherObject.sizeX &&  
            this.x + this.width > otherObject.x &&
            this.y < otherObject.y + otherObject.sizeY &&
            this.y + this.height > otherObject.y
        );
    
    }
    // this function will be used to check if the player is colliding with any object in the game
    // it will be used in update to check for collisions with bricks, final flag
    checkCollisions(objects) {
    for (let obj of objects) {
        if (this.isCollidingWith(obj)) {
            return obj;
        }
    }
        return null;
    }
}

export class background{
    constructor(ctx, Canvas, player,ImageLoader){
        // first draw the ground. How? Need to understand canvas height and width,
        this.player = player
        this.ctx = ctx
        this.canvasHeight = Canvas.height
        this.canvasWidth = Canvas.width
        this.tileLoaded = false
        this.imageLoader = ImageLoader
        //then position of tile in my image
        //then I need to load the entire image
        //after I need to load just the part I need
        // check if everything loaded correctly, if yes:
        //Check how many tiles are needed with Canvas width divided by tile width
        // same thing with height but here I should control it so that it reaches only till ground level(so Canvas - 100) and then stops
        // Actually draw the ground with a nested for loop
        // Preload ground tile
        // moved all the loading in game.js for better organization
        
        this.groundTileKey = 'GroundTile';
        this.brickTileKey = 'BrickTile';
        this.houseKey = 'house';
        this.hospitalKey = 'hospital';
        this.finalFlagKey = 'finalFlag';
}
    DrawImage(imageKey, x, y, sizeX, sizeY){
        const image =  this.imageLoader.getImage(imageKey)
        if(image){
            this.ctx.drawImage(image,x - this.player.cameraX,y,sizeX, sizeY); // was using wrong function, now works
        }
        else{
            console.error(`Couldnt draw image at key ${imageKey}`)
        }
    }   
        DrawGround(cameraX){
            //load image and return if it doesnt load correctly
            const tile = this.imageLoader.getImage('GroundTile');
            if (!tile) {
                console.error("CRITICAL: Ground tile missing");
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
                    // Only draw tiles from groundLevel downwards cuz game too laggy rn, thinking it might be because of too many drawimage calls from drawground
                    // Calculate how many rows of tiles are needed to fill from groundLevel to the bottom of the canvas
                    const numRowsBelowGroundLevel = Math.ceil((this.canvasHeight - groundLevel) / tileHeight);
                    for(let i = 0; i < numRowsBelowGroundLevel; i++){ // changed to i to avoid conflict with y outside, just in case
                        const posX = x * tileWidth - cameraX;
                        const posY = groundLevel + (i * tileHeight); // Start drawing from groundLevel
                        this.ctx.drawImage(tile, posX, posY, tileWidth, tileHeight);
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
        //was calling filltext twice, fixed it now
        const lines = text.split("\n");
        const lineHeight = 30
        for( let i = 0; i<lines.length; i++) {  // tried with for loop because otherwise it duplicated everything after first \n
            const line = lines[i].trim(); // Clean each line to maybe fix duplication or just for aesthetics ig
            if (line){
            this.ctx.fillText(
                lines[i], 
                x - this.player.cameraX, 
                y + (i * lineHeight)
            );
        }
        };
    }
    // made a function to draw images so that i can just pass things through here everytime without having to write everything everytime
    // just discovered it draws images like HUD so cant really use it for background. will keep this for hud elements that i will add ater on and create new class
    // in background for background images ig
    DrawImage(imagePath, x, y, sizeX, sizeY){
        const image = new Image()
        image.src=imagePath
        if(image.complete){
            this.ctx.drawImage(image,x,y,sizeX, sizeY);
        }
    }   
 
    
}
// will start working on an image loader, so that I can just make the user wait a couple of s initially
// and just show a wheel loading/ % timer or other ways to let user know they should just wait
export class ImageLoader{
    constructor(){
        this.images = {};
        this.loadedCount = 0;
        this.totalCount = 0;
    }
    LoadImage(key, path){
        //start by incrementing count so that it keeps check
        this.totalCount++
        //Looked oin google and promises seems cool because it lets me tell the pc to wait for something
        // which is useful since you dont know when images will load
        return new Promise((resolve, reject) =>{
            const img = new Image()
            //let code run when things load ofc
            img.onload = () =>{
                //store image with key/name provided when using function
                this.images[key] = img
                //to keep check of images loaded
                this.loadedCount++
                // resolve the promise cuz we delivered
                resolve(img)
            }
            img.onerror = () =>{
                console.error(`failed to load image at ${path}`)
                reject() // writing this reminded me of a recent rejection, now im depressed, damn.
            }
            img.src = path
        })

    }

    getImage(key){
        return this.images[key]
    }

    isAllLoaded(){
        return this.loadedCount == this.totalCount
    }
}

