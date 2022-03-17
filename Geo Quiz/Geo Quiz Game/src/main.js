import {LoadScene} from "./scenes/LoadScene.js";
import {MenuScene} from "./scenes/MenuScene.js";
import {PlayP1Scene} from "./scenes/PlayP1Scene.js"; 
import {PlayP2Scene} from "./scenes/PlayP2Scene.js";

let game = new Phaser.Game({
    width: 800,
    height: 600,
    scene:[
        LoadScene, MenuScene, PlayP1Scene, PlayP2Scene
    ],
    render:{
        pixelArt: true
    }
});