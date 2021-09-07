// Write your helper functions here!
require('isomorphic-fetch');

// display API data for missionTarget div
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

// method for launchForm div to return for user edge case input
function validateInput(testInput) {
    if (testInput === ""){
        return "Empty"
    } else if (isNaN(testInput)){
        return 'Not a Number'; 
    } else {
        return 'Is a Number'
    } 
}

// method for LaunchStatusCheck div to validate form data inputs and display launch status message
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // reset launchStatusCheck div innerHTML for each form submission
    list.style.visibility = "hidden"; 
    document.getElementById("pilotStatus").innerHTML = `Pilot Ready`; 
    document.getElementById("copilotStatus").innerHTML = `Co-pilot Ready`; 
    document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`; 
    document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`; 
    document.getElementById("launchStatus").innerHTML = `Awaiting Information Before Launch`; 
    document.getElementById("launchStatus").style.color = "#000000"; 

    // data validation
    let pilotInputType = validateInput(pilot); 
    let copilotInputType = validateInput(copilot); 
    let fuelLevelInputType = validateInput(fuelLevel); 
    let cargoLevelInputType = validateInput(cargoLevel); 

    // default boolean set for valid form field data
    let isValidInputType = true; 

    // verify all form field data has proper data type entered
    if ((pilotInputType === "Empty") || (copilotInputType === "Empty") || (fuelLevelInputType === "Empty") || (cargoLevelInputType === "Empty")) {
        alert("All fields are required!");
        isValidInputType = false;
    } 

    else if ((pilotInputType !== "Not a Number") || (copilotInputType !== "Not a Number") || 
    (fuelLevelInputType !== "Is a Number") || (cargoLevelInputType !== "Is a Number")) {
        alert("Make sure to enter valid information for each field!");
        isValidInputType = false;
    }

    // if form field data input type is valid, then check if fuelLevel & cargoLevel passes test
    if (isValidInputType) {
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`; 
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;

        if (fuelLevel < 10000) {
            document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`; 
            document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready for Launch`; 
            document.getElementById("launchStatus").style.color = "#ff0000"; 
            isValidInputType = false;
        }
        
        if (cargoLevel > 10000) {
            document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy for launch`; 
            document.getElementById("launchStatus").innerHTML = `Shuttle Not Ready for Launch`; 
            document.getElementById("shuttleStatus").style.color = "#ff0000"; 
            isValidInputType = false;
        }

        // form data type passed, cargoLevel & fuelLevel passed test, display proper message
        if (isValidInputType) {
            document.getElementById("launchStatus").style.color = "#008000"; 
            document.getElementById("launchStatus").innerHTML = `Shuttle is Ready for Launch`; 
        } 
        // launchStatusCheck div make visible all launch status messages
        list.style.visibility = "visible"; 
    }
}

async function myFetch() {
    let webURL = "https://handlers.education.launchcode.org/static/planets.json"; 
    planetsReturned = await fetch(webURL).then( function(response) {
        return response.json(); 
        });
    return planetsReturned;
}

// missionTarget div display randomly fetched API data of planets 
function pickPlanet(planets) {
    return planets[Math.floor(Math.random()*planets.length)]; 
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
