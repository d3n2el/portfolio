//What do i need to do in this file?
//if yes button is clicked, redirect to game page
    //detect button click
    //store that information
    // use that information to activate the redirection
    const YesButton =document.getElementById("YesOption")
    const NoButton = document.getElementById("NoOption") 
    YesButton.addEventListener("click" , function(){
        window.location.href = "game.html"
    })    
    NoButton.addEventListener("click" , function(){
        window.location.href = "alt.html"
    })
    // else, redirect to alt page
    //then everything else should have it's own js  and css file)
    