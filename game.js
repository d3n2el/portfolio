// Setup game canvas in js
import { Player, UI, background } from "./allClasses.js"


var Canvas = document.getElementById("GameCanvas")
    //Create simple rectangle to test with
var ctx = Canvas.getContext("2d")
const player = new Player(Canvas)
export {player}
const character = new Image()
character.src="images/mepixBig.png"
const Background = new background(ctx,Canvas)
const ui = new UI(ctx, Canvas, player)


function update(){
    //need to substitute rectangle with my character
    ctx.clearRect(0,0,Canvas.width, Canvas.height)
    player.update()
    if(character.complete){
        //actually draw image on canvas
        ctx.drawImage(character, player.x - player.cameraX,player.y,150,150);
    }
    Background.DrawGround(player.cameraX)
    // check if image loaded or not
    ui.DrawWorldText("Daniel's Life", 300, 200,"black", 68)
    ui.DrawWorldText("I’m currently 17.\n I study in a Linguistic School in Treviso.\n I have many hobbies and interests and I take pride in wanting to become a Polymath.", 2000, 200)
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
