// Setup game canvas in js
var Canvas = document.getElementById("GameCanvas")
    //Create simple rectangle to test with
var ctx = Canvas.getContext("2d")
let x = 0;
let y = 0;
let vx =  0;
let vy = 0;
function update(){
    ctx.clearRect(0,0,Canvas.height, Canvas.width)
    x += vx
    y += vy;
    var rectangle = ctx.fillRect(x,y,100,100)
    requestAnimationFrame(update)
}
update()
    // Make it movabl with user input(decided at the end to use other file for that)
        // Change velocity of a character
        // Use x and y coordinates to help with movement
        // Once it starts to move, make sure to remove the rectangle
        //from its starting place so that it doesn't just become a straight line
        // setup canvas limits so that it doesn't disappear into nothing
        // Make sure that everything works and test it 100 times
        

