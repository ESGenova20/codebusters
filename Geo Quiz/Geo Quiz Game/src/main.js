import {LoadScene} from "./scenes/LoadScene.js";
import {MenuScene} from "./scenes/MenuScene.js";

let game = new Phaser.Game({
    width: 800,
    height: 600,
    scene:[
        LoadScene, MenuScene   
    ],
    render:{
        pixelArt: true
    }
});