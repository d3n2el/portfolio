// Setup game canvas in js
var Canvas = document.getElementById("GameCanvas")
    //Create simple rectangle to test with
var ctx = Canvas.getContext("2d")
let x = 0;
let y = 0;
let vx =  0;
let vy = 0;
//I need to add gravity
//gravity is just the character slowly coming back to the ground if it is in the air
const gravity = 0.5;
// would be good to create a ground variable to know when I reach it
// - 100 since character is 100 pixels
const ground = Canvas.height - 100
const xLimit = Canvas.width - 100
const NegativeXLimit = 100 - Canvas.width
const character = new Image()
character.src='images/mepix.png'

character.onload = function(){
    console.log("Character has loaded correctly")
}
function update(){
    //need to substitute rectangle with my character
    ctx.clearRect(0,0,Canvas.width, Canvas.height)
    vy += gravity
    x += vx
    y += vy;
    //make the ground variable do something useful with ground collision, to avoid the character going into the void yk
    if(y>ground){
        vy = 0  // to avoid any further movement
        y =ground //so that it goes to ground and not further down
    }
    //will now add the same thing but with x axis, to avoid character going off screen(which happens often)
    if(x > xLimit){
        vx=0
        x = xLimit
    }
    if(x < NegativeXLimit){
        vx=0
        x = NegativeXLimit 
    }
    // check if image loaded or not
    if(character.complete){
        //actually draw image on canvas
        ctx.drawImage(character, x,y,100,100);
    }
    else{
        var rectangle = ctx.fillRect(x,y,100,100)
    }
    requestAnimationFrame(update)
}
update()





    // Make it movabl with user input(decided at the end to use other file for that) x
        // Change velocity of a character x 
        // Use x and y coordinates to help with movement x 
        // Once it starts to move, make sure to remove the rectangle x
        //from its starting place so that it doesn't just become a straight line x
        // setup canvas limits so that it doesn't disappear into nothing
        //
        // Reminder for self: cannot get favicon, dont even know what is that atm
