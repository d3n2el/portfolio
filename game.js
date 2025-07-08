// Setup game canvas in js
import { Player, UI, background , ImageLoader} from "./allClasses.js"
// keep track of levels to know 
let gameLevel = 0
var Canvas = document.getElementById("GameCanvas")
    //Create simple rectangle to test with
var ctx = Canvas.getContext("2d")
const imageLoader = new ImageLoader()
const player = new Player(Canvas)
export {player}
const characterKey = "character"
let Background, ui
let isTransitionScreen = false;
const loadPromises = [
    imageLoader.LoadImage(characterKey, "images/mepixBig.png"),
    // load ground first since its the base
    imageLoader.LoadImage('GroundTile', "images/groundTile.png"),  
    // Preload all other images
    imageLoader.LoadImage("BrickTile", "images/brickTile.png"),

    imageLoader.LoadImage('house', "images/house.png"),

    imageLoader.LoadImage('hospital', "images/hospital1.png"),

    imageLoader.LoadImage('FinalFlag', "images/FinalFlag3.png"),

    imageLoader.LoadImage('FrenchFlag', "images/frenchflag.png"),

    imageLoader.LoadImage('ItalianFlag', "images/itaflag.png"),

    imageLoader.LoadImage('SpanishFlag', "images/spainfla.png"),

    imageLoader.LoadImage('EnglishFlag', "images/ukflag.png"),

    imageLoader.LoadImage('RussianFlag', "images/ruflag.png"),

    imageLoader.LoadImage('language', "images/language.png"),

    imageLoader.LoadImage('world', "images/world.png"),

    imageLoader.LoadImage('Psi', "images/psi.png"),

    imageLoader.LoadImage('Paella', "images/paella.png"),

    imageLoader.LoadImage('Pizza', "images/pizza.png"),

    imageLoader.LoadImage('PokePsi', "images/pokepsi.png"),

    imageLoader.LoadImage('Croissant', "images/croissant.png"),

    imageLoader.LoadImage('Eye', "images/eye.png"),

    imageLoader.LoadImage('BackInfo', "images/backinfo.png"),

    imageLoader.LoadImage('PC', "images/pc.png"),

    imageLoader.LoadImage('Leaf', "images/leaf.png")  
]

// Helper function to create transition levels and reduce repetition
function createTransitionLevel(finishedLevel, nextLevel, isFinal = false) {
    const textBlocks = [
        { text: `Level “${finishedLevel}” Finished.`, x: Canvas.width / 2, y: 200, color: "#A40202", size: 70 },
    ];

    if (isFinal) {
        textBlocks.push({ text: "Congratulations, you finished the game!", x: Canvas.width / 2, y: 400, color: "#A40202", size: 70 });
        textBlocks.push({ text: "-[EXIT]", x: Canvas.width / 2, y: 750, color: "#A40202", size: 50 });
    } else {
        textBlocks.push({ text: `Do you wish to continue to level “${nextLevel}”?`, x: Canvas.width / 2, y: 400, color: "#A40202", size: 50 });
        textBlocks.push({ text: "-Yes_", x: Canvas.width / 2, y: 600, color: "#A40202", size: 50 });
        textBlocks.push({ text: "-No[EXIT]", x: Canvas.width / 2, y: 750, color: "#A40202", size: 50 });
    }

    return {
        textBlocks: textBlocks,
        levelEndFlag: { x: 1000, y: 700, sizeX: 200, sizeY: 200 },
        isTransitionScreen: true
    };
}

const levelData = [
    {
        // still cant jump and missing and can go right through bricks
        name: "My life pt.1",
        playerStartX: 100,
        playerStartY: Canvas.height - 200, // Assuming ground level
        objects: [
            // Images for 1st level
            { key: "hospital", x: 2000, y: 330, sizeX: 800, sizeY: 800 },
            { key: "BrickTile", x: 8200, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8230, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8260, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8260, y: 800, sizeX: 30, sizeY:30 },
            { key: "BrickTile", x: 8290, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8290, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8320, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8320, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8320, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8350, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8350, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8350, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8380, y: 830, sizeX: 30, sizeY: 30 },    
            { key: "BrickTile", x: 8380, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8380, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8410, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8410, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8410, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8410, y: 740, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8410, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8440, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8440, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8440, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8440, y: 740, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8470, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8470, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8470, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8470, y: 740, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8470, y: 710, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8500, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8500, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8500, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8500, y: 740, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8500, y: 710, sizeX: 30, sizeY: 30 },         
            { key: "BrickTile", x: 8500, y: 680, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8530, y: 830, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8530, y: 800, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8530, y: 770, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8530, y: 740, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8530, y: 710, sizeX: 30, sizeY: 30 },
            { key: "BrickTile", x: 8530, y: 680, sizeX: 30, sizeY: 30 },  
            { key: "FinalFlag",x: 8500 ,y:460,sizeX: 400 ,sizeY:400},
            {key:"house", x:3900 ,y:300,sizeX:550 ,sizeY:560}
        ],
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
        levelEndFlag: { x: 8700, y: 460, sizeX: 400, sizeY: 400 } 
    },
    createTransitionLevel("Younger Years", "Adolescence"),
    {
        name: "Adolescence",
        playerStartX: 100,
        playerStartY: Canvas.height - 300,
        objects: [
            {key:"FrenchFlag", x:16750 ,y:550,sizeX:400 ,sizeY:400},
            { key: "FinalFlag",x: 20000 ,y:460,sizeX: 400 ,sizeY:400},
            {key:"SpanishFlag", x:14800, y:450, sizeX:400, sizeY:400},
            {key:"ItalianFlag", x:8600, y:250, sizeX:800, sizeY: 800},
            {key:"EnglishFlag",x:12800,y:450, sizeX:400, sizeY:400 },
            {key:"RussianFlag", x:10800, y:450, sizeX:400, sizeY:400},
            {key:"language", x:6700, y:150, sizeX: 150, sizeY: 150 },
            {key:"world", x:6700, y:400, sizeX: 150, sizeY:150},
            {key:"Psi", x:4300, y:150, sizeX: 400, sizeY: 400},
            {key:"Eye", x:5200, y:100, sizeX: 50, sizeY: 50},
            {key:"Eye", x:5400, y:150, sizeX: 50, sizeY: 50},
            {key:"Eye", x:4900, y:500, sizeX: 50, sizeY: 50},
            {key:"Eye", x:5500, y:500, sizeX: 50, sizeY: 50},
            {key:"Eye", x:5300, y:400, sizeX: 50, sizeY: 50},
            {key:"PokePsi", x:4700, y:600, sizeX: 150, sizeY: 150},
            {key:"PokePsi", x:5750, y:300, sizeX: 150, sizeY: 150},
            {key:"PokePsi", x:5300, y:600, sizeX: 150, sizeY: 150},
            {key:"Croissant", x:16600, y:450, sizeX: 100, sizeY: 100},
            {key:"Pizza", x:8500, y:600, sizeX: 100, sizeY: 100},
            {key:"Paella", x:14500, y:600, sizeX: 100, sizeY: 100},
            {key:"BackInfo", x:2700, y:0, sizeX: 1000, sizeY: 860},
            {key:"PC", x:3100, y:400, sizeX: 300, sizeY: 300},
        ],
        textBlocks: [
            { text: "Welcome to Level 2, Adolescence and hobbies", x: 100, y: 250, color:"black", size:68 },
            {text:"Like i said, I have many interests.\n One of them is Computer Science and Technology,\n as you can probably guess by the fact that i made this website!!",x: 3200, y:300, color: "white"},
            {text:"Another Passion of mine is \nPsychology as symbolised by the psi and the eyes. \nI studied it a lot in my own time and did \nYale’s Introduction To Psychology course on Coursera.",x: 5000, y:300},
            {text:"Now I’ll talk about languages, \nanother passion that I also study at school. I currently speak 5 languages:\n Italian, English, Russian, Spanish and French. \nI’ll talk more about each language later.",x: 7000 ,y:300},
            { text: "I’ll start with my native language: Italian.\nIt holds a special place in my heart since it’s the\n language of family, friends and school. I find it\n really beautiful, albeit practically useless.", x: 9000, y: 300, color:"black" },
            { text: "And my hereditary language: Russian.\nI speak it quite well but not at an advanced level.\nI learned the language from myfather when i was little, butt hen i practically lost it.\nFortunately I picked it up\nagain at school and I managed to reach a fluent level,\n especially at the oral level.", x: 11000, y: 300, color:"black"},
            { text: "English, the lingua franca of\nthe world and my 3rd language. I learnt it via comprehensible input\nfrom a really young age and I have now achieved a C2 score on a Cambridge exam.", x: 13000, y: 300, color:"black" },
            { text: "My 4th language is Spanish.\n I learned it in School starting from 14 y.o.\n I currently have a B2 Level\n(even though I’m still waiting for my DELE results).\n I love the culture and \n from both Spain and Latin America", x:15000, y: 300 },
            { text: "French is my 5th language and\nthe one I’m the most proud of.\nThat is because I learnt it solo,\nwithout the help of school,parents\nor any sort of guided course. I\nmostly used comprehensible input\nwith occasional lessons with a\nteacher to practice speaking\nand grammar.", x: 17000, y: 300},        
        ],
        levelEndFlag: { x: 20000, y: 460, sizeX: 400, sizeY: 400 }
    },
    createTransitionLevel("Adolescence", "Dreams and Aspirations"),
    {
        // movement doesnt work here. It was because of missing final flag
        name: "My life pt.3",
        playerStartX: 100,
        playerStartY: Canvas.height - 300, 
        objects:[
            {key:"Leaf", x:6300, y:300, sizeX: 150, sizeY: 150},
            {key:"FinalFlag", x:12000, y:460, sizeX: 400, sizeY: 400},
        ],
        textBlocks:[
            { text: "You reached the final level “Dreams and Aspirations”!!\n\n So, what are my Dreams and Aspirations?",
                 x: 1000, y: 250, color:"black", size:68 },

            { text: "I currently would like to join a prestigious\nbusiness school. Thinking about Escp\nmainly for their unique approach but\nalso to others in Europe, mostly in the UK.\nAnd of course the ivies would be a\ndream too but with the current political\nsituation, I would rather avoid.", x: 4000, y: 250 },
            { text: "After University,\nI would like to start my own company since\never since I was little that was my dream.\nI would also love to make something related to the environment since I care a lot about it.", x: 7000, y: 250},
            { text: "Congratulations!!\n\nYou finished my game-like portfolio,\n\nfor a more professional outlook, click no to the initial question", x: 10000, y: 250, color: "black", size:68 },
        ],
        levelEndFlag: { x: 12000, y: 460, sizeX: 400, sizeY: 400 }
    },
    createTransitionLevel("Dreams and Aspirations", "", true)
];

function showLoadingScreen(show) {
    if (show) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, Canvas.width, Canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Loading...", Canvas.width / 2, Canvas.height / 2);
    }
    // if false, the game loop will take over and clear the screen.
}

function endScreen() {
    isTransitionScreen = true; // stop  game loop

    // new helper function 
    function drawTransition() {
        // draw black background as per design
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, Canvas.width, Canvas.height);
        

        currentLevel.textBlocks.forEach(textBlock => {
            ui.DrawUIText(textBlock.text, textBlock.x, textBlock.y, textBlock.color, textBlock.size);
        });
    }

    drawTransition();

    let hoveredOption = null; // tracks hover state

    // clickable areas for the transition screen
    const yesButton = { x: Canvas.width / 2 - 50, y: 580, width: 100, height: 60 };
    const noButton = { x: Canvas.width / 2 - 100, y: 730, width: 200, height: 60 };

    // function to check if a point is inside a rectangle
    function isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y;
    }

    // handles mouse moving
    const handleMouseMove = (event) => {
        const rect = Canvas.getBoundingClientRect();
        const mousePos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        const isFinalScreen = currentLevel.textBlocks.some(t => t.text.includes('Congratulations')) //only text exclusive to last level
        let oldHoveredOption = hoveredOption;
        hoveredOption = null; // reset

        if ( !isFinalScreen && isInside(mousePos, yesButton)) {
            hoveredOption = "Yes";
        } else if (isInside(mousePos, noButton)) {
            hoveredOption = "No";
        }

        // redraw only if the hover state changed
        if (oldHoveredOption !== hoveredOption) {
            drawTransition(); 
            if (hoveredOption === "Yes") {
                ui.DrawUIText("-Yes_", yesButton.x + yesButton.width / 2, 600, "yellow", 50);
            } else if (hoveredOption === "No") {
                const exitText = isFinalScreen ? '-[EXIT]' : '-NO[EXIT]';
                ui.DrawUIText(exitText, noButton.x + noButton.width / 2, 750, "yellow", 50);
            }
        }
    };

    // handles changes in lvl
    const proceedToNextLevel = (event) => {
        const rect = Canvas.getBoundingClientRect();
        const mousePos = { x: event.clientX - rect.left, y: event.clientY - rect.top };

        if (isInside(mousePos, noButton)) {
            window.location.href = "index.html"; 
            return;
        }

        if (isInside(mousePos, yesButton)) {
            // avoid multiple inputs
            window.removeEventListener("click", proceedToNextLevel);
            window.removeEventListener("mousemove", handleMouseMove);

            const isFinalScreen = currentLevel.textBlocks.some(t => t.text.includes("Congratulations"));
            if (isFinalScreen) {
                // already handled before
                return; 
            }
            // idk how i managed to forget this honestly
            gameLevel++; // go to the next actual level
            currentLevel = levelData[gameLevel]; // load the new level

            isTransitionScreen = false; 
            player.x = currentLevel.playerStartX; 
            player.y = currentLevel.playerStartY;
            player.cameraX = 0; 
            update(); 
        }
    };


    window.addEventListener("click", proceedToNextLevel);
    window.addEventListener("mousemove", handleMouseMove);
}


var currentLevel = levelData[gameLevel];
showLoadingScreen(true)
Promise.all(loadPromises)
    .then(() => {
        console.log("All images loaded successfully")
        Background = new background(ctx,Canvas, player,imageLoader)
        ui = new UI(ctx, Canvas, player)
        player.x = currentLevel.playerStartX;
        player.y = currentLevel.playerStartY;
        showLoadingScreen(false)
        update()
    })
    .catch(error => {
        console.error("Loading failed:", error);

        showLoadingScreen(false)
    });

function update(){
    // if the game is in a transition state, stop the loop.
    if (isTransitionScreen) {
        return;
    }


    ctx.clearRect(0, 0, Canvas.width, Canvas.height);


    player.update();

 
    const brickTiles = getBrickTiles(currentLevel.objects);
    const collidingBricks = player.checkCollisions(brickTiles);
    if (collidingBricks.length > 0) {
        for (const brick of collidingBricks) {
            handleBrickCollision(brick);
        }
    }

    // level end collision
    const finalFlagObject = currentLevel.levelEndFlag;
    if (player.isCollidingWith(finalFlagObject)) {
        gameLevel++;
        if (gameLevel < levelData.length) {
            currentLevel = levelData[gameLevel];
            endScreen(currentLevel); // transition screen setup
        } 
           
        return; // stop update loop for this frame.
    }

    Background.DrawGround(player.cameraX);


    currentLevel.objects.forEach(obj => {
        Background.DrawImage(obj.key, obj.x, obj.y, obj.sizeX, obj.sizeY);
    });


    currentLevel.textBlocks.forEach(textBlock => {
        ui.DrawWorldText(textBlock.text, textBlock.x, textBlock.y, textBlock.color, textBlock.size);
    });


    const character = imageLoader.getImage(characterKey);
    if (character) {
        ctx.drawImage(
            character, 
            player.x - player.cameraX, 
            player.y, 
            player.width, 
            player.height
        );
    }

    requestAnimationFrame(update);
}

function getBrickTiles(levelObjects) {
    return levelObjects.filter(obj => obj.key === "BrickTile" || obj.key === "GroundTile");
}

// function to handle what happens when player collides with brick
function handleBrickCollision(brick){
    const playerBottom = player.y + player.height;
    const playerRight = player.x + player.width;
    const brickBottom = brick.y + brick.sizeY;
    const brickRight = brick.x + brick.sizeX;


    if (playerRight > brick.x && player.x < brickRight) {

        if (player.vy >= 0 && playerBottom <= brick.y + 10) {
            player.y = brick.y - player.height;
            player.vy = 0;
            player.onGround = true;
            return; 
        }

        if (player.vy < 0 && player.y >= brickBottom - 10) {
            player.y = brickBottom;
            player.vy = 0;
            return;
        }
    }


    if (playerBottom > brick.y && player.y < brickBottom) {

        if (player.vx > 0 && playerRight >= brick.x && player.prevX + player.width <= brick.x) {
            player.x = brick.x - player.width;
            player.vx = 0;
            return; 
        }

        if (player.vx < 0 && player.x <= brickRight && player.prevX >= brickRight) {
            player.x = brickRight;
            player.vx = 0;
            return;
        }
    }
}





