import { player } from "./game.js";  
// movement stopped working so now I will try to debug this code
// from the browser, it is telling me that jump is not a function
//fixed movement bug, had to call the istance of the player and not the player CLASS, jump still doesn't work
// found the bug, didn't correctly call this.ground. still doesnt work though
addEventListener("keydown", function(k){
    if (k.code == "ArrowRight" || k.code == "KeyA"){
        player.vx = 25;
    }
    if(k.code == "Space"){
        
        player.jump()
    }
    if(k.code == "ArrowLeft" || k.code == 'KeyA'){
        player.vx = -25;
}})
addEventListener("keyup" , function(k){
    if(k.code == "ArrowRight" || k.code == 'KeyD'){
        player.vx= 0
    }
    if(k.code == "ArrowLeft" || k.code == 'KeyA'){
        player.vx = 0;
    }
})



