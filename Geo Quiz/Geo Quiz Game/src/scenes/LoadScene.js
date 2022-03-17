import { CST } from "../CST.js";
export class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.LOAD
        })
    }
    init()
    {

    }

    preload()
    {
        this.load.image("logo", "./assets/image/logo.png");
        this.load.image("p1_button", "./assets/image/p1_button.png");
        this.load.image("p2_button", "./assets/image/p2_button.png");
        this.load.image("title_bg", "./assets/image/title_bg2.png");
    
        this.load.image("p1_button_S", "./assets/image/p1_button_S.png");
        this.load.image("p2_button_S", "./assets/image/p2_button_S.png");

        this.load.image("green_player","./assets/image/spin.gif");
        ({
            frameWidth: 32,
            frameHeight: 32
        });    
        this.load.audio("title_music", "./assets/audio/game_audio.mp3");
    
        let loadingBar = this.add.graphics
        ({
            fillStyle: 
            {
                color: 0xffffff
            }
        })

    this.load.on("progress", (percent)=>{
        loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
        console.log(percent);
    })

    }
    
    create()
    {
        this.scene.start(CST.SCENES.MENU, "hello from the load scene");
    }
}