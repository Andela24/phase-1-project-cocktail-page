//Global Varialbles

//event listeners

//event handlers
const homeLoads = () => {
    const h1 = document.createElement('h1')
    const p = document.createElement('p')

    h1.className = 'center-align';
    p.className = 'center-align';

    //adding text to our classes
    h1.innerText = 'Welcome To The Cocktail Cabinet'
    h1.innerText = `There's a type of drink to fit your mood and palate. Check out all the drink types you can make and start mixing.`
    
}



//startup
document.addEventListener('DOMContentLoaded', function() {
    //what do we want to do when the page loads
    homeLoads()
} )