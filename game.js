// Setup game canvas in js
var Canvas = document.getElementById("GameCanvas")
    //Create simple rectangle to test with
var ctx = Canvas.getContext("2d")
let x = 0;
let y = 0;
let vx =  0;
let vy = 0;
function update(){
    ctx.clearRect(0,0,0,0)
    ctx.clearRect(0,0,Canvas.height, Canvas.width)
    x += vx
    y += vy;
    var rectangle = ctx.fillRect(x,y,100,100)
    requestAnimationFrame(update)
}
update()
    // Make it movabl with user input(decided at the end to use other file for that) x
        // Change velocity of a character x 
        // Use x and y coordinates to help with movement x 
        // Once it starts to move, make sure to remove the rectangle x
        //from its starting place so that it doesn't just become a straight line x
        // setup canvas limits so that it doesn't disappear into nothing
        // Make sure that everything works and test it 100 times
        // it doesn't work and i dont understand why
        // Reminder for self: cannot get favicon, dont even know what is that atm
        

