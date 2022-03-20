import { CST } from "../CST.js";
export class MenuScene extends Phaser.Scene{ //export class
    constructor(){ //connect to CST
        super({
            key: CST.SCENES.MENU
        })
    }
    init(){

    }
    preload(){

    }
    create(){
        this.add.image(0,0, "title_bg").setOrigin(0); //Add background
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "logo");//Add logo
        let pOneButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "p1_button"); //Add buttons
        let pTwoButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "p2_button");
   
        let hoverpOne =  this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "p1_button_S"); //Add hovering color to buttons
        let hoverpTwo =  this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, "p2_button_S");
        
        hoverpOne.setVisible(false); //Hide the highlighted text
        hoverpTwo.setVisible(false);

        this.sound.pauseOnBlur = false; //Make sound hearable when away from tab
        this.sound.play("title_music", { //Play audio
            loop: true //Make audio loop
        })

        pOneButton.setInteractive(); //Make button interactive

        pOneButton.on("pointerover", ()=>{ //when hovering over
            
            hoverpOne.setVisible(true);
        })
        pOneButton.on("pointerout", ()=>{ //When no longer hovering over
            hoverpOne.setVisible(false);
        })
        pOneButton.on("pointerup", ()=>{ //When clicked
            this.scene.start(CST.SCENES.PLAYP1); //Go to next scene
        })

        pTwoButton.setInteractive(); //Repeated steps from pOneButton

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