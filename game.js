// Setup game canvas in js
var Canvas = document.getElementById("GameCanvas")
    //Create simple rectangle to test with
var ctx = Canvas.getContext("2d")
let x = 0;
let y = 0;
let vx =  0;
let vy = 0;
function update(){
    //problem was here, after testing various things and overall debugging, I understood where the problem was
    ctx.clearRect(0,0,Canvas.width, Canvas.height)
    x += vx
    y += vy;
    var rectangle = ctx.fillRect(x,y,100,100)
    requestAnimationFrame(update)
}
update()
function movement(){
    addEventListener("keydown", function(k){
        if (k.code == "ArrowRight"){
            vx = 5;
        }
        if(k.code == "Space"){
            vy = 5;
        }
        if(k.code == "ArrowLeft"){
            vx = -5;
    }})
    addEventListener("keyup" , function(k){
        if(k.code == "ArrowRight"){
            vx= 0
        }
        if(k.code == "Space"){
            vy=0
        }
        if(k.code == "ArrowLeft"){
            vx = 0;
        }
    })
}
movement()

    // Make it movabl with user input(decided at the end to use other file for that) x
        // Change velocity of a character x 
        // Use x and y coordinates to help with movement x 
        // Once it starts to move, make sure to remove the rectangle x
        //from its starting place so that it doesn't just become a straight line x
        // setup canvas limits so that it doesn't disappear into nothing
        //
        // Reminder for self: cannot get favicon, dont even know what is that atm
        

