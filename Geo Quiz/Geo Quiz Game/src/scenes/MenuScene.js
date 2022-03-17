import { CST } from "../CST.js";
export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(){

    }
    preload(){

    }
    create(){
        this.add.image(0,0, "title_bg").setOrigin(0);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo");
        let pOneButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "p1_button");
        let pTwoButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "p2_button");
   
        let hoverpOne =  this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "p1_button_S");
        let hoverpTwo =  this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "p2_button_S");
        
        hoverpOne.setVisible(false);
        hoverpTwo.setVisible(false);

        this.sound.pauseOnBlur = false; 
        this.sound.play("title_music", {
            loop: true
        })

        pOneButton.setInteractive();

        pOneButton.on("pointerover", ()=>{
            
            hoverpOne.setVisible(true);
        })
        pOneButton.on("pointerout", ()=>{
            hoverpOne.setVisible(false);
        })
        pOneButton.on("pointerup", ()=>{
            this.scene.start(CST.SCENES.PLAYP1);
        })

        pTwoButton.setInteractive();

        pTwoButton.on("pointerover", ()=>{
            hoverpTwo.setVisible(true);
        })
        pTwoButton.on("pointerout", ()=>{
            hoverpTwo.setVisible(false);
        })
        pTwoButton.on("pointerup", ()=>{
            this.scene.start(CST.SCENES.PLAYP2);
        })
    }
}