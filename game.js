// Setup game canvas in js
import { Player, UI, background , ImageLoader} from "./allClasses.js"


var Canvas = document.getElementById("GameCanvas")
    //Create simple rectangle to test with
var ctx = Canvas.getContext("2d")
const imageLoader = new ImageLoader()
const player = new Player(Canvas)
export {player}
const characterKey = "character"
const character = imageLoader.LoadImage(characterKey, "images/mepixBig.png" )

const Background = new background(ctx,Canvas, player,imageLoader)
const ui = new UI(ctx, Canvas, player)


function update(){
    //need to substitute rectangle with my character
    ctx.clearRect(0,0,Canvas.width, Canvas.height)
    player.update()
    const character = imageLoader.getImage(characterKey);
        //actually draw image on canvas
    if(character){
        ctx.drawImage(character, player.x - player.cameraX,player.y,150,150);
    }
       
    Background.DrawGround(player.cameraX)
    // check if image loaded or not
    ui.DrawWorldText("Daniel's Life", 300, 200,"black", 68)
    //currently the text is written 2 times, one following the new lines and another in one big straight line
    ui.DrawWorldText("I’m currently 17.\nI study in a Linguistic School in Treviso \nI have many hobbies and interests\nand I take pride in wanting to become a Polymath.", 2000, 200)
    requestAnimationFrame(update)
    ui.DrawWorldText("I was born on the 27th of September in 2007\n in Montebelluna, a small town \nin the North-Eastern part of Italy.", 3000, 200)
    Background.DrawImage("brickTile", 2000, 600, 30,30)
    ui.DrawWorldText("Montebelluna is a rural town, so my opportunities \nfor growth were and still are limited to people living in big cities", 4200, 200)
    ui.DrawWorldText("I have always considered myself a person that is lucky in the unlucky. And why is that?\nIt’s because I had to face many challenges in my life but i still managed to overcome them.\nThe earliest one was the loss of my mother Lara, at the age of 1 and a half years old.\nI ve also dealt with a food disorder and other things that i don’t feel comfortable disclosing.\nI believe all these experiences made me the person I currently am and tempered me to the challenges of life.",
                             5500, 200,)
    ui.DrawWorldText("And this was the end of this part of my life.", 8000, 100)
    ui.DrawWorldText("CONGRATULATIONS!!", 8000, 200,"black",68)
    ui.DrawWorldText("(P.s There might be easter eggs hidden ;) )", 8000, 250)
    Background.DrawImage("FinalFlag", 8500 ,460,400 ,400)
    Background.DrawImage("house", 4500 ,290,400 ,400)
    Background.DrawImage("hospital", 3000 ,170,800 ,800)
    for(let x = 0; x< 5*30; x += 30){
        for(let y = 0; y < 3*30; y+= 30){
            Background.DrawImage("BrickTile", 8000+x, 600+30, 30,30)   
        }
    }
}
update()
 










        // Reminder for self: cannot get favicon, dont even know what is that atm
