window.onload = () => { //runs function when the window is loaded
     let places = staticLoadPlaces(); //stores function staticLoadPlaces() in a variable called places
     renderPlaces(places); //calls function renderPlaces() with another function as the parameter
};

function staticLoadPlaces() { //declare function
    return [ //returns data when the function is called
        {
            name: 'MyModel', //declare data called name
            location: { //declare data called location, with two stored variables
                lat: 43.717992, //latitude
                lng: -79.371815, //longitude
            }
        },
    ];
}

function renderPlaces(places) { //declare function with parameter
    let scene = document.querySelector('a-scene'); //get scene object from the html document, store it in a variable for easy access

    places.forEach((place) => { //calls this function once for every instance of data stored in the variable
        let latitude = place.location.lat; //store the latitude from places in a variable
        let longitude = place.location.lng; //do the same for longitude

        let model = document.createElement('a-entity'); //creates new AR entity to show up in the AR space
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`); //sets attribute for geological based position of object
        model.setAttribute('gltf-model', './assets/MyModel/scene.gltf'); //sets attribute for the model to be used
        model.setAttribute('rotation', '0 180 0'); //sets attribute for rotation of model
        model.setAttribute('animation-mixer', ''); //sets attribute for animation
        model.setAttribute('scale', '0.5 0.5 0.5'); //sets attribute for scale of model

        model.addEventListener('loaded', () => { //calls function when the model is loaded
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')) //calls event to say the entity is loaded
        });

        scene.appendChild(model); //inserts model into the document
    });
}

let shine = document.getElementById("shine");

shine.onclick = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();

    const name = ev.target.getAttribute('name');
    const el = ev.detail.intersection && ev.detail.intersection.object.el;

    if (el && el === ev.target) {
        // after click, we are adding a label with the name of the place
        const label = document.createElement('span');
        const container = document.createElement('div');
        container.setAttribute('id', 'place-label');
        label.innerText = name;
        container.appendChild(label);
        document.body.appendChild(container);

        setTimeout(() => {
            // that will disappear after less than 2 seconds
            container.parentElement.removeChild(container);
        }, 1500);
     }
 };