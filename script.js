// Write your JavaScript code here!

window.addEventListener("load", function() {
    let form = document.querySelector("form").reset(); 
    form.addEventListener("submit", function(event){
        let pilotData = document.querySelector("input[name=pilotName]").value;
        let copilotData = document.querySelector("input[name=copilotName]").value;
        let fuelLevelData = document.querySelector("input[name=fuelLevel]").value; 
        let cargoLevelData = document.querySelector("input[name=cargoMass]").value;
        let list = document.getElementById("faultyItems"); 

        formSubmission(document, list, pilotData, copilotData, fuelLevelData, cargoLevelData); 
        event.preventDefault(); 
    }); 

    let listedPlanets;      // container
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch(); 
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);

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