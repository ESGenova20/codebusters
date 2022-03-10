import { CST } from "../CST.js";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(data){
        console.log(data);
        console.log("I GOT IT");
    }
    preload(){

    }
    create(){

    }
}