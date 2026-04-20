function setupGame() {

    // Castle scene (complete)
    let castleScene = {};
    castleScene.imageSource = './static/images/backdrops/Castle.png';
    castleScene.title = 'A Huge Stone Castle';
    setupScene(castleScene);

    // Beach Town scene
    let beachTownScene = {};
    beachTownScene.imageSource = './static/images/backdrops/BeachTown.png';
    beachTownScene.title = 'A Village by the Beach';
    setupScene(beachTownScene);

    // House scene
    let houseScene = {};
    houseScene.imageSource = './static/images/backdrops/House.png';
    houseScene.title = 'A Cosy Cottage in the Village';
    setupScene(houseScene);

    // Forest scene
    let forestScene = {};
    forestScene.imageSource = './static/images/backdrops/Forest.png';
    forestScene.title = 'A Dark and Gloomy Forest';
    setupScene(forestScene);

    // Characters
    let farmer = {
        name: 'The Farmer',
        imageSource: './static/images/people/Farmer.png',
        dialog1: 'Learn JavaScript? Only if you ask me enough...',
        dialog2: 'Okay, okay! I am studying JavaScript now...',
        currentDialog: 'dialog1',
    };

    let queen = {
        name: 'The Queen',
        imageSource: './static/images/people/Queen.png',
        dialog1: 'Ask The Knight. If The Knight learns, I too shall learn.',
        dialog2: 'The Knight is starting? I guess is JS for me! (YOU WIN!)',
        currentDialog: 'dialog1',
    };

    let knight = {
        name: 'The Knight',
        imageSource: './static/images/people/Knight.png',
        dialog1: 'I only will learn JavaScript if you get The Farmer to first!',
        dialog2: 'The Farmer is learning? Time to play catch up!',
        currentDialog: 'dialog1',
    };

    // Farmer: must be asked 3 times
    let askCount = 0;
    farmer.afterTalking = function () {
        askCount++;
        if (askCount > 1) {
            farmer.currentDialog = 'dialog2';
        }
    };

    // Knight: must be asked 2 times, but only works AFTER farmer agrees
    let knightAskCount = 0;
    knight.afterTalking = function () {
        if (farmer.currentDialog === 'dialog2') {
            knightAskCount++;
            if (knightAskCount >= 1) {
                knight.currentDialog = 'dialog2';
            }
        }
    };

    // Queen: must be asked 2 times, but only works AFTER knight agrees
    let queenAskCount = 0;
    queen.afterTalking = function () {
        if (knight.currentDialog === 'dialog2') {
            queenAskCount++;
            if (queenAskCount >= 1) {
                queen.currentDialog = 'dialog2';
            }
        }
    };

    // Setup all people
    setupPerson(farmer);
    setupPerson(knight);
    setupPerson(queen);

    // Place people in scenes
    houseScene.addPerson(farmer);
    forestScene.addPerson(knight);
    castleScene.addPerson(queen);

    // Door connections
    // Castle <-> Town
    castleScene.addDoor('Exit the castle to nearby beach town', beachTownScene);
    beachTownScene.addDoor('Enter castle', castleScene);

    // Town <-> House
    beachTownScene.addDoor('Enter house', houseScene);
    houseScene.addDoor('Exit house', beachTownScene);

    // Town <-> Forest
    beachTownScene.addDoor('Wander off into the forest', forestScene);
    forestScene.addDoor('Walk back to the beach town', beachTownScene);

    // Forest -> Castle (back door)
    forestScene.addDoor('Enter the castle back door', castleScene);

    return castleScene;
}

function startGame() {
    let castleScene = setupGame();
    castleScene.showScene('#game');
    castleScene.showDoors('#game');
    castleScene.showAllPeople('#game');
}

startGame();
