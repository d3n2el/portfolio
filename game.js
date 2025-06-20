// Setup game canvas in js
import { Player, UI, background } from "./allClasses.js"


var Canvas = document.getElementById("GameCanvas")
    //Create simple rectangle to test with
var ctx = Canvas.getContext("2d")
const player = new Player(Canvas)
export {player}
const character = new Image()
character.src="images/mepixBig.png"
const Background = new background(ctx,Canvas, player)
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
    //currently the text is written 2 times, one following the new lines and another in one big straight line
    ui.DrawWorldText("I’m currently 17.\nI study in a Linguistic School in Treviso \nI have many hobbies and interests\nand I take pride in wanting to become a Polymath.", 2000, 200)
    requestAnimationFrame(update)
    ui.DrawWorldText("I was born on the 27th of September in 2007\n in Montebelluna, a small town \nin the North-Eastern part of Italy.", 3000, 200)
    ui.DrawImage("images/brickTile.png", 2000, 600, 30,30)
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
