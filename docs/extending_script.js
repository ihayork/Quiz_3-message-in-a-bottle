window.onload = () => { //calls when window is loaded
  render(); //function
};

const models = [ //array consisting of models
  {
    url: './assets/myModel/scene.gltf', //model file
    scale: '0.5 0.5 0.5', //scale for the model
    rotation: '0 225 0' //rotation for the model
  },
];

let modelIndex = 0; //variable
const setModel = (model, entity) => { //calls function and stores in a variable
  if (model.position) { //if the model's position exists
    entity.setAttribute('position', model.position); //set the attribute to the position
  }

  entity.setAttribute('gltf-model', model.url); //set attribute for model file
};

function render() { //function
  const scene = document.querySelector('a-scene'); //store scene object in a variable

  navigator.geolocation.getCurrentPosition(function (position) { //function to get current position
    const latitude = position.coords.latitude; //set latitude from current location
    const longitude = position.coords.longitude; //set longitude from current location

    const model = document.createElement('a-entity'); //creates new entity, stores in variable
    model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`); // sets attribute for geological position

    setModel(models[modelIndex], model); //

    model.setAttribute('animation-mixer', ''); //set animation attribute

    scene.appendChild(model); //insert the model into the document
  });
}

/*
  Using this script, we can change a model's scale and rotation in lines 8 and 9 of this file by changing the string values.
  This will set attributes for a model in the html file with the scale and rotation listed in the array.

  We can add more models to the scene by adding more model variables in the array models in line 5.
  By adding a for loop in the render() function, we can set a model once for every model in the array.
  Using the same format as the first model declaration, we can add more with new urls, rotation values, and scale values.
  We can also add more models via the html page directly, which is what i did.
*/
