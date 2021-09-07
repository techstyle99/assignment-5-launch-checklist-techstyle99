// Write your JavaScript code here!

// firing load event for window object
window.addEventListener("load", function() {
    let form = document.querySelector("form")
    form.reset(); 
    // hide the content of missionTarget div id with 'faultyItems' list of launch status messages 
    document.getElementById("faultyItems").style.visibility = "hidden"; 
    // create data object to store form data input
    form.addEventListener("submit", function(event){
        let pilotData = document.querySelector("input[name=pilotName]").value;
        let copilotData = document.querySelector("input[name=copilotName]").value;
        let fuelLevelData = document.querySelector("input[name=fuelLevel]").value; 
        let cargoLevelData = document.querySelector("input[name=cargoMass]").value;
        let list = document.getElementById("faultyItems"); 
        // update display messages in launchStatuscheck div 
        formSubmission(document, list, pilotData, copilotData, fuelLevelData, cargoLevelData); 
        // cancel what form submit button does
        event.preventDefault(); 
    }); 

    // json object returned from API call 
    let listedPlanets;    
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch(); 
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);

        // storing specific data of the randomly chosen planet 
        let planet = pickPlanet(listedPlanets); 
        let planetName = planet["name"]; 
        let planetDiameter = planet["diameter"]; 
        let planetStar = planet["start"]; 
        let planetDistance = planet["distance"]; 
        let planetMoons = planet["moons"]; 
        let planetImageUrl = planet["image"]; 

        addDestinationInfo(document, planetName, planetDiameter, planetStar, planetDistance, planetMoons, planetImageUrl); 
    }); 
});