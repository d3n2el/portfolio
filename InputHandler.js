
addEventListener("keydown", function(k){
    if (k.code == "ArrowRight"){
        vx = 5;
    }
    if(k.code == "Space"){
        vy = -5;
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



//Need to implement gravity to make the rectangle get back down
    // gravity: if  object is at an y > 0, decrease the y till it reaches 0?
//if(y >0){
    //use a for loop to lower y one at a time
    //for(let i =0;i < y ; i++){
        //y--
        //noticed that the rectangle still stays the same way, need to rectClear the thing one step at a time

    //}

//}
//everything works except for space, debugging. I'm desperate, it works at the start and then it just creates a straight line
//half fixed, the problem is that it also blocks all other movement if not for space when it starts, do not understand that
// it works with the space but i dont understand why not with the arrows, need to solve(noticed just now)