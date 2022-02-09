//Global Varialbles
let martinis = [];

//Node Getters 
const mainDiv = () =>  document.getElementById('main'); 
const homeLink = () => document.getElementById('home-link')
const createMartiniListLink = () => document.getElementById('create-martini-link')
const listOfFavorites = () => document.getElementById('create-favorites-link')
const drinkName = () => document.getElementById('strDrink');


//Event Listeners
const attachHomePageLinkEvent = () => {
homeLink().addEventListener('click', loadHome);
}

const attachCreateMartiniListLink = () => {
    createMartiniListLink().addEventListener('click', loadSearchMartinis);
}

const attachFavoritesListLink = () => {
    listOfFavorites().addEventListener('click', loadListOfMartinis);
}

//Event Handlers

//Home Page
const loadHome = event => {
    resetMainDiv(); 
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const picture = document.createElement('img');

    h1.className = 'center-align';
    p.className = 'center-align';

    picture.setAttribute('id','picture-size');
    picture.setAttribute('src', 'cocktail.jpeg');

    
    h1.innerText = 'Welcome To The Cocktail Cabinet'
    p.innerText = `There's a type of drink to fit your mood and palate. Check out all the drink types you can make and start mixing.`
    
    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
    mainDiv().appendChild(picture);
    
}
//Load List of Martinis on Page
const loadListOfMartinis = event => { 
    resetMainDiv();

    const h1 = document.createElement('h1');
    const div = document.createElement('div');
    
    h1.innerText = "Here is a list to get you started:";
    
    div.className = 'collection';

    martinis.forEach(martini => {
        const a = document.createElement('a');
        a.className = 'collection-item';
        a.innerText = martini.strDrink;
        
       div.appendChild(a);
  
    })
    mainDiv().appendChild(h1);
    mainDiv().appendChild(div);
}

//Search Martinis
const loadSearchMartinis = event => {
    resetMainDiv(); 
    const h1 = document.createElement('h1')
    const form = document.createElement('form');
    const row = createRow();
    const div1 = createTextField('strDrink', 'Enter Martini Name','s4');
    const container = document.createElement('container');


    const search = document.createElement('button');
    
    h1.innerText = 'Find Your Martini'

    container.setAttribute('id', 'container');
    search.setAttribute('type', 'search');
    search.setAttribute('id','search-form');
    search.className = 'btn teal darken-2';


    search.innerText = 'Search';

    row.appendChild(div1);
    form.appendChild(row);
    form.appendChild(search);

   
    form.addEventListener('submit', searchForm);

    mainDiv().appendChild(h1);
    mainDiv().appendChild(form);
    mainDiv().appendChild(container);
}

//Submit - search button
const searchForm = event => {
    event.preventDefault()
    const container = document.querySelector('#container');
    let input = document.getElementById('strDrink').value.toLowerCase(); 
    let searchResult = martinis.filter(drink => drink.strDrink.toLowerCase().includes(input)); 
    
   
    container.innerHTML = '' 
    
    searchResult.forEach(martini => {
        const p = document.createElement('p');
        const picture = document.createElement('img');
        const h = document.createElement('h4');

        picture.setAttribute('src', martini.strDrinkThumb); 
        
        h.innerText = 'Instructions:';
        p.innerText = martini.strInstructions; 
    

        container.appendChild(h);
        container.appendChild(p);
        container.appendChild(picture);

        })
}


/**REQUESTS **/
const loadMartinis = () => {
    fetch('http://localhost:3000/drinks')
    .then(resp => resp.json())
    .then(data => {
        martinis = data;
    })
}


//Node Creators, dry principles
const createRow = () => {
    const div = document.createElement('div');
    div.className = "row";
    return div;
}

//Form style
const createFormCol = colSize => {
    const div = document.createElement('div');
    div.className = "input-field col" + colSize;
    return div;
}

//Creating text field 
const createTextField = (id, labelText,colSize) => {
    const div = createFormCol(colSize);
    const label = document.createElement('label');
    const input = document.createElement('input');

    input.setAttribute('type', 'text');
    input.setAttribute('id', id);

    label.setAttribute('for', id);
    label.innerText = labelText;

    div.appendChild(input);
    div.appendChild(label);

    return div;
}

//MISCELLANEOUS
const resetMainDiv = () => {
    mainDiv().innerHTML = '';
}

// On StartUp
document.addEventListener('DOMContentLoaded', () => {
    loadHome();
    loadMartinis();
    attachHomePageLinkEvent();
    attachCreateMartiniListLink();
    attachFavoritesListLink();
} )