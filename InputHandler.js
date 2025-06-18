import { Player } from "./allClasses";  //substitue every vx,vy with Player. ...
addEventListener("keydown", function(k){
    if (k.code == "ArrowRight"){
        Player.vx = 5;
    }
    if(k.code == "Space"){
        
        Player.jump()
    }
    if(k.code == "ArrowLeft"){
        Player.vx = -5;
}})
addEventListener("keyup" , function(k){
    if(k.code == "ArrowRight"){
        Player.vx= 0
    }
    if(k.code == "ArrowLeft"){
        Player.vx = 0;
    }
})



