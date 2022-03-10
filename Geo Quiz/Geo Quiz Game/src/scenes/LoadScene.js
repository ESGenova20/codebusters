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
        this.load.image("logo", "./dist/assets/image/logo.png");
        this.load.image("p1_button", "./dist/assets/image/p1_button.png");
        this.load.image("p2_button", "./dist/assets/image/p2_button.png");
        this.load.image("title_bg", "./dist/assets/image/title_bg.png");
    
        this.load.spritesheet("green_player","./dist/assets/image/green_player.png");
        ({
            frameHeight: 32,
            frameWidth: 32
        });    

        this.load.audio("title_music", "./dist/assets/audio/game_audio.mp3");
    
        let loadingBar = this.add.graphics
        ({
            fillStyle: 
            {
                color: 0xffffff
            }
        })

        for (let i = 0; i < 100; i++)
        {
            this.load.spritesheet("green_player" + i,"./dist/assets/image/green_player.png");
            ({
                frameHeight: 32,
                frameWidth: 32
            });  
        }

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