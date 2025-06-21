// Setup game canvas in js
import { Player, UI, background , ImageLoader} from "./allClasses.js"
// keep track of levels to know 
let gameLevel = 1
var Canvas = document.getElementById("GameCanvas")
    //Create simple rectangle to test with
var ctx = Canvas.getContext("2d")
const imageLoader = new ImageLoader()
const player = new Player(Canvas)
export {player}
const characterKey = "character"
let Background, ui
const loadPromises = [
    imageLoader.LoadImage(characterKey, "images/mepixBig.png"),
    // load ground first since its the base
    imageLoader.LoadImage('GroundTile', "./images/groundTile.png"),  
    // Preload all other images
    imageLoader.LoadImage("BrickTile", "./images/brickTile.png"),
    
    imageLoader.LoadImage('house', "./images/house.png"),
    
    imageLoader.LoadImage('hospital', "./images/hospital1.png"),

    imageLoader.LoadImage('FinalFlag', "./images/FinalFlag3.png")
]
//seems the images and text correctly since it loads but now the character doesn't move, GREAT. Will now try to debug this shit
const levelData = [
    {
        name: "My Story - Part 1",
        playerStartX: 100,
        playerStartY: Canvas.height - 210, // Assuming ground level
        objects: [
            // Images for 1st level
            { key: "hospital", x: 3000, y: 200, sizeX: 800, sizeY: 800 },
            { key: "BrickTile", x: 500, y: 600, sizeX: 30, sizeY: 30 },
            { key: "FinalFlag",x: 8500 ,y:460,sizeX: 400 ,sizeY:400},
            {key:"house", x:4500 ,y:290,sizeX:400 ,sizeY:400}
            
        ],
        // now gotta group the text for 1st level
        textBlocks: [
            { text: "Daniel's Life", x:300, y:200,color:"black", size:68},
            {text:"I’m currently 17.\nI study in a Linguistic School in Treviso \nI have many hobbies and interests\nand I take pride in wanting to become a Polymath.", x:2000, y:200},
            { text:"Montebelluna is a rural town, so my opportunities \nfor growth were and still are limited to people living in big cities", x:4200, y:200 },
            {text:"I have always considered myself a person that is lucky in the unlucky. And why is that?\nIt’s because I had to face many challenges in my life but i still managed to overcome them.\nThe earliest one was the loss of my mother Lara, at the age of 1 and a half years old.\nI ve also dealt with a food disorder and other things that i don’t feel comfortable disclosing.\nI believe all these experiences made me the person I currently am and tempered me to the challenges of life.",
                            x: 5500, y:200},
            {text:"And this was the end of this part of my life.",x: 8000, y:100},
            {text:"CONGRATULATIONS!!", x:8000, y:200,color:"black",size: 68},
            {text:"(P.s There might be easter eggs hidden ;) ",x:8000, y:250}
        ],
        levelEndFlag: { x: 8500, y: 460, sizeX: 400, sizeY: 400 } // Redundant but explicit
    },
    {
        name: "Adolescence",
        playerStartX: 100,
        playerStartY: Canvas.height - 210,
        objects: [
           

        ],
        textBlocks: [
            { text: "Welcome to Part 2 Daniel's story!", x: 100, y: 200 },
            
        ],
        levelEndFlag: { x: 2000, y: 460, sizeX: 400, sizeY: 400 }
    }
]
const currentLevel = levelData[gameLevel - 1];
let animationFrameId
Promise.all(loadPromises)
    .then(() => {
        console.log("All images loaded successfully")
        Background = new background(ctx,Canvas, player,imageLoader)
        ui = new UI(ctx, Canvas, player)
        player.x = currentLevel.playerStartX;
        player.y = currentLevel.playerStartY;
        update()

    })
    .catch(error => {
        console.error("Loading failed:", error);
        // Show error to player
    });
function update(){
     const finalFlagObject = currentLevel.levelEndFlag
    //need to substitute rectangle with my character
    ctx.clearRect(0,0,Canvas.width, Canvas.height)
    player.update()
    currentLevel.objects.forEach(obj => {
        Background.DrawImage(obj.key, obj.x, obj.y, obj.sizeX, obj.sizeY);
    });
    currentLevel.textBlocks.forEach(textBlock => {
        ui.DrawWorldText(textBlock.text, textBlock.x, textBlock.y, textBlock.color, textBlock.size);
    });
    const character = imageLoader.getImage(characterKey);
        //actually draw image on canvas
    if(character){
        ctx.drawImage(character, player.x - player.cameraX,player.y,150,150);
    }
       
    Background.DrawGround(player.cameraX)
    // check if image loaded or not
    if(player.isCollidingWith(finalFlagObject)){
        gameLevel++
        if (gameLevel <= levelData.length) {
        // Load the next level's data into currentLevel
            currentLevel = levelData[gameLevel - 1];  
            // Reset player and camera for the new level 
            player.x = currentLevel.playerStartX;
            player.y = currentLevel.playerStartY;
            player.cameraX = 0; 
        }
    }   
}


 
//game now works, will focus on creating level system rn



     // Reminder for self: cannot get favicon, dont even know what is rn