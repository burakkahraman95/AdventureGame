// No need to edit this file at all! However, it is useful for reading for
// reference..

function setupScene(scene) {
    console.log('Setting up scene:');
    console.log('title:', scene.title);
    console.log('imageSource:', scene.imageSource);

    // Ensure scene gets setup with arrays
    scene.people = [ ];
    scene.doors = [ ];
    scene.connectedScenes = [ ];

    // Method to add a person to this scene
    scene.addPerson = function (newPerson) {
        scene.people.push(newPerson);
    };

    // Method to add a door to this scene
    scene.addDoor = function (text, newScene) {
        scene.doors.push(text); // Add the door text to the array
        scene.connectedScenes.push(newScene); // Also add the second scene
    };

    // Method to display scene in given selector 
    scene.showScene = function (sel) {
        let element = document.querySelector(sel);

        // Setup initial style
        element.innerHTML = '<h1>Scene: ' + scene.title + '</h1>';

        // Add in our backdrop
        let img = document.createElement('img');
        img.src = scene.imageSource;
        element.append(img);
    };

    // Method to loop through the people displaying them in the scene
    scene.showAllPeople = function (sel) {
        // Loop through each of the people in our list
        for (let person of scene.people) {
            person.showPerson(sel); // and render them
        }
    };

    // Method to loop through the doors displaying them in the scene
    scene.showDoors = function (sel) {
        let element = document.querySelector(sel);

        // Create an aside element (does nothing special, beyond being styled in our CSS)
        let aside = document.createElement('aside');
        element.append(aside);

        // Loop through each of our doors (this time using a classic for loop)
        for (let i = 0; i < scene.doors.length; i++) {
            // Get the text and the scene "connection"
            let doorText = scene.doors[i];
            let doorScene = scene.connectedScenes[i];
            // Create button to add to the "aside" element
            let button = document.createElement('button');
            button.innerHTML = '<img src="./static/images/door.png" />';
            button.innerHTML += '<br /><strong>' + doorText + '</strong>';
            button.onclick = function () { // When clicked, "goto" this scene
                doorScene.showScene(sel); // "Move" to scene
                doorScene.showDoors(sel);
                doorScene.showAllPeople(sel);
            };
            aside.append(button);
        }
    };
}


// Setup a "Person" object
function setupPerson(person) {
    console.log('Setting up person:');
    console.log('name:', person.name);
    console.log('imageSource:', person.imageSource);
    console.log('dialog1:', person.dialog1);
    console.log('dialog2:', person.dialog2);

    // Give a little warning to make it easier to use
    if (!('afterClicking' in person)) { // !() inverts, and "in" checks for properties in objects
        console.log('afterClicking method:', 'Uh oh, this person needs a method! Add a method called "afterClicking"');
    } else {
        console.log('afterClicking method:', person.afterClicking);
    }

    // Attach the "showDialog" method (appends the person's dialog to given selector)
    person.showDialog = function (sel) {
        let element = document.querySelector(sel);
        let div = document.createElement('div');
        let text = person[person.currentDialog];

        // Assemble a p tag inside a div
        div.innerHTML = '<p><strong>' + person.name + '</strong> says &mdash;' + text + '</p>';
        element.append(div);
    };

    // Attach the "showPerson" method (shows person inside of given selector)
    person.showPerson = function (sel) {
        let element = document.querySelector(sel);
        let button = document.createElement('button');
        button.onclick = function () {
            person.showDialog(sel);
            person.afterTalking();
        };
        button.style.width = "128px";
        button.style.height = "128px";
        button.style.background = 'url(' + person.imageSource + ')';
        element.append(button);
    };
}
