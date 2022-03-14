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
        this.add.image(0,0, "title_bg").setOrigin(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo");
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "p1_button");
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "p2_button");
    }
}