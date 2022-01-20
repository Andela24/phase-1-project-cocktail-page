//Global Varialbles
// const baseUrl = 'http://localhost:3000';
let martinis = [];




//Node Getters , used over over again
const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link')
const createMartiniListLink = () => document.getElementById('create-martini-link')
const listOfFavorites = () => document.getElementById('create-favorites-link')
const drinkName = () => document.getElementById('strDrink');


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
//Home Page
const loadHome = event => {
    if(event) {
    event.preventDefault();
    }
    resetMainDiv(); //when the loadHome triggers first thing we want to reset mainDiv
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const picture = document.createElement('img')

    h1.className = 'center-align';
    p.className = 'center-align';

    // picture.setAttribute('id','picture-size')
    picture.setAttribute('src', 'cocktail.jpeg')

        picture.style.height = '320px'
        picture.style.width = '520px'
        // picture.style.tex = "center-align"
        picture.style.alt = "alt"
        // picture.className = 'center-align'
   
    //adding text to our classes
    h1.innerText = 'Welcome To The Cocktail Cabinet'
    p.innerText = `There's a type of drink to fit your mood and palate. Check out all the drink types you can make and start mixing.`
    
    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
    mainDiv().appendChild(picture);
    
}

//Search Martinis
const loadCreateMartinis = event => {
    event.preventDefault();
    resetMainDiv(); //kind a taking us to another page
    const h1 = createH1('Search Martinis')
    const form = document.createElement('form');
    const row = createRow();
    const div1 = createTextField('strDrink', 'Enter Martini Name', 's6')
    const container = document.createElement('container')

    const search = document.createElement('button');
    

    container.setAttribute('id', 'container');
    search.setAttribute('type', 'search');
    search.setAttribute('id','search-form');
    search.className = 'btn teal darken-2';


    search.innerText = 'Search';

    row.appendChild(div1);
    form.appendChild(row);
    form.appendChild(search);

    //attach submit listener to the form
    form.addEventListener('submit', searchForm);

    

    mainDiv().appendChild(h1);
    mainDiv().appendChild(form);
    mainDiv().appendChild(container);
}

//Load List of Martinis on Page
const loadListFavorites = event => {
    if(event){
        event.preventDefault();
    }
        resetMainDiv();

    const h1 = document.createElement('h1');
    const div = document.createElement('div');
    // const favorite1 = document.createElement('a');
    // const favorite2 = document.createElement('a');
    // const favorite3 = document.createElement('a')


    h1.innerText = "Like Your Favorite";
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

        div.appendChild(a);
    })

    // div.appendChild(favorite1)
    // div.appendChild(favorite2)
    // div.appendChild(favorite3)


    mainDiv().appendChild(h1);
    mainDiv().appendChild(div);

}
//Submit - search button
const searchForm = event => {
    event.preventDefault();
    const container = document.querySelector('#container')
    let input = document.getElementById('strDrink').value.toLowerCase() //getting value of the input
    let searchResult = martinis.filter(drink => drink.strDrink.toLowerCase().includes(input)) //HTML element
    // debugger;
   
    container.innerHTML = '' //clean out container
    
    searchResult.forEach(martini => {
        const p = document.createElement('p');
        const picture = document.createElement('img');
        const h = document.createElement('h4');

        picture.setAttribute('src', martini.strDrinkThumb) //setting atribut to get pics printed on the page
        
        h.innerText = 'Instructions: How To Make It?'
        p.innerText = martini.strInstructions //getting instructions for martini
    //    debugger;

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
        // debugger;
        martinis = data;
    })
}


//Node Creators, dry principles
const createRow = () => {
    const div = document.createElement('div');
    div.className = "row";
    return div;
}
//creating globa h1
const createH1 = text => {
    const h1 = document.createElement('h1');
    h1.innerText = text;
    return h1;
}
//Form style
const createFormCol = colSize => {
    const div = document.createElement('div');
    div.className = "input-field col" + colSize;
    return div;
}

//creating text field for martini name
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
document.addEventListener('DOMContentLoaded', function() {
    //what do we want to do when the page loads
    loadMartinis();
    loadHome();
    attachHomePageLinkEvent();
    attachCreateMartiniListLink();
    attachFavoritesListLink();
} )