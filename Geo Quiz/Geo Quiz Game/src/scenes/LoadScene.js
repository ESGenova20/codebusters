import { CST } from "../CST.js"; //iconnect to CST
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init()
    {

    }

    preload() //Make assets preload
    {
        this.load.image("logo", "./assets/image/logo.png"); //preload logo, buttons,backgrounds
        this.load.image("p1_button", "./assets/image/p1_button.png");
        this.load.image("p2_button", "./assets/image/p2_button.png");
        this.load.image("title_bg", "./assets/image/title_bg2.png");
        this.load.image("playsceneBG", "./assets/image/playsceneBG.png")

        this.load.image("A_button", "./assets/image/A_button.png");//preload option buttons
        this.load.image("B_button", "./assets/image/B_button.png");
        this.load.image("YES_button", "./assets/image/YES_button.png");
        this.load.image("NO_button", "./assets/image/NO_button.png");

        this.load.image("A_button_S", "./assets/image/A_button_S.png");
        this.load.image("B_button_S", "./assets/image/B_button_S.png");
        this.load.image("YES_button_S", "./assets/image/YES_button_S.png");
        this.load.image("NO_button_S", "./assets/image/NO_button_S.png");

        this.load.image("p1_button_S", "./assets/image/p1_button_S.png");
        this.load.image("p2_button_S", "./assets/image/p2_button_S.png");

        this.load.image("NextButton", "./assets/image/NextButton.png");
        this.load.image("NextButton_S", "./assets/image/NextButton_S.png");

        this.load.image("Q1", "./assets/image/questions/Q1.png"); //preload questions
        this.load.image("Q2", "./assets/image/questions/Q2.png");
        this.load.image("Q3", "./assets/image/questions/Q3.png");
        this.load.image("Q4", "./assets/image/questions/Q4.png");
        this.load.image("Q5", "./assets/image/questions/Q5.png");
        this.load.image("Q6", "./assets/image/questions/Q6.png");
        this.load.image("Q7", "./assets/image/questions/Q7.png");
        this.load.image("Q8", "./assets/image/questions/Q8.png");
        this.load.image("Q9", "./assets/image/questions/Q9.png");
        this.load.image("Q10", "./assets/image/questions/Q10.png");

        ({
            frameWidth: 32,
            frameHeight: 32
        });    
        
        this.load.audio("title_music", "./assets/audio/game_audio.mp3"); //preload audio
    
        let loadingBar = this.add.graphics //Add loading bar
        ({
            fillStyle: //Color loading bar
            {
                color: 0xADFF2F
            }
        })

    this.load.on("progress", (percent)=>{ //Make it load depending on percent
        loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
    })

    var width = this.cameras.main.width; //make width and height variables
    var height = this.cameras.main.height;
    var loadingText = this.make.text({ //Add loading text
        x: width / 2, //Position text
        y: height / 2 - 50,
            text: '✈ Loading...',
        style: {    //Pick font and color for text
            font: '20px monospace',
            fill: '#ADFF2F'
        }
});
loadingText.setOrigin(0.5, 0.5); //Furthermore position text

    }
    
    create()
    {
        this.scene.start(CST.SCENES.MENU); //Start menu scene after loading finishes
    }
}