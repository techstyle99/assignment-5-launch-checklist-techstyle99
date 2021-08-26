// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget"); 
    missionTarget.innerHTML = 
   // Here is the HTML formatting for our mission target div.
   
        `<h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">`

}

function validateInput(testInput) {
    if (testInput === ""){
        return "Empty"
    } else if (isNaN(testInput)){
        return 'Not a Number'; 
    } else {
        return 'Is a Number'
    } 
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    document.getElementById("pilotStatus").innerHTML = `Pilot is ready for launch`; 
    document.getElementById("copilotStatus").innerHTML = `Co-pilot is ready for launch`; 
    document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`; 
    document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`; 
    document.getElementById("launchStatus").innerHTML = `Awaiting Information Before Launch`; 
    document.getElementById("launchStatus").style.color = "black"; 


    let pilotInputType = validateInput(pilot); 
    let copilotInputType = validateInput(copilot); 
    let fuelLevelInputType = validateInput(fuelLevel); 
    let cargoLevelInputType = validateInput(cargoLevel); 

    let isValidInputType = true; 
    if (pilotInputType === "Empty" && pilotInputType === 'Is a Number'|| 
        copilotInputType === "Empty" && copilotInputType === 'Is a Number' || 
        fuelLevelInputType === "Empty" && fuelLevelInputType === 'Not a Number' || 
        cargoLevelInputType === "Empty" && cargoLevelInputType === 'Not a Number'){
        alert ('All fields are required!'); 
        isValidInputType = false; 
    } else if (isValidInputType) {
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`; 
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`; 
    } else if (fuelLevel < 10000) {
        document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`; 
        document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready for Launch`; 
        document.getElementById("launchStatus").style.color = "#ff0000"; 
        isValidInputType = false; 
    } else if (cargoLevel > 10000) {
        document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy for launch`; 
        document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready for Launch`; 
        document.getElementById("shuttleStatus").style.color = "#ff0000"; 
        isValidInputType = false; 
    } else if (isValidInputType) {
        document.getElementById("launchStatus").style.color = "#008000"; 
        document.getElementById("launchStatus").innerHTML = `Shuttle is Ready for Launch`; 
    } 
}

async function myFetch() {
    let webURL = "https://handlers.education.launchcode.org/static/planets.json"; 
    planetsReturned = await fetch(webURL).then( function(response) {
        return response.json(); 
        });
    return planetsReturned;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random()*planets.length)]; 
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
