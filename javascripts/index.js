//Global Varialbles
const baseUrl = 'http://localhost:3000';
let martinis = [];




//Node Getters , used over over again
const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link')
const createMartiniListLink = () => document.getElementById('create-martini-link')
const listOfFavorites = () => document.getElementById('create-favorites-link')


//Event Listeners
const attachHomePageLinkEvent = () => {
homeLink().addEventListener('click', loadHome);
}

const attachCreateMartiniListLink = () => {
    createMartiniListLink().addEventListener('click', loadCreateMartinis);
}

const attachFavoritesListLink = () => {
    listOfFavorites().addEventListener('click', loadListFavorites);
}




//Event Handlers
const loadHome = event => {
    if(event) {
    event.preventDefault();
    }
    resetMainDiv(); //when the loadHome triggers first thing we want to reset mainDiv
    const h1 = document.createElement('h1')
    const p = document.createElement('p')

    h1.className = 'center-align';
    p.className = 'center-align';

    //adding text to our classes
    h1.innerText = 'Welcome To The Cocktail Cabinet'
    p.innerText = `There's a type of drink to fit your mood and palate. Check out all the drink types you can make and start mixing.`
    
    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
}

//Search Martinis
const loadCreateMartinis = event => {
    event.preventDefault();
    resetMainDiv(); //kind a taking us to another page
    const h1 = document.createElement('h1');
    h1.innerText = 'Search Martinis';

    mainDiv().appendChild(h1);
}

//Load Favorites on Page
const loadListFavorites = event => {
    event.preventDefault();
    resetMainDiv();

    const h1 = document.createElement('h1');
    const div = document.createElement('div');
    // const favorite1 = document.createElement('a');
    // const favorite2 = document.createElement('a');
    // const favorite3 = document.createElement('a')


    h1.innerText = "Favorites";
    // favorite1.innerText = 'Cosmopolitan Martini';
    // favorite2.innerText = 'Espresso Martini';
    // favorite3.innerText = 'French Martini';

   
    div.className = 'collection';
    // favorite1.className = 'collection-item';
    // favorite2.className = 'collection-item';
    // favorite3.className = 'collection-item';

    martinis.forEach(martini => {
        const a = document.createElement('a');
        a.className = 'collection-item';
        a.innerText = martini.strDrink

        div.appendChild(a)
    })

    // div.appendChild(favorite1)
    // div.appendChild(favorite2)
    // div.appendChild(favorite3)


    mainDiv().appendChild(h1);
    mainDiv().appendChild(div);

}

/**REQUESTS **/
const loadMartinis = () => {
    fetch('http://localhost:3000/drinks')
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        martinis = data;
    })
}





//MISCELLANEOUS
const resetMainDiv = () => {
    mainDiv().innerHTML = '';
}

// On StartUp
document.addEventListener('DOMContentLoaded', function() {
    //what do we want to do when the page loads
    loadMartinis();
    // loadHome();
    attachHomePageLinkEvent();
    attachCreateMartiniListLink();
    attachFavoritesListLink();
} )