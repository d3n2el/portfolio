// Setup game canvas in js
import { Player } from "./allClasses"
var Canvas = document.getElementById("GameCanvas")
    //Create simple rectangle to test with
var ctx = Canvas.getContext("2d")
const player = new Player 
const character = new Image()
character.src='images/mepix.png'

character.onload = function(){
    console.log("Character has loaded correctly")
}
function update(){
    //need to substitute rectangle with my character
    ctx.clearRect(0,0,Canvas.width, Canvas.height)
    Player.update()
    // check if image loaded or not
    if(character.complete){
        //actually draw image on canvas
        ctx.drawImage(character, player.x,player.y,100,100);
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
