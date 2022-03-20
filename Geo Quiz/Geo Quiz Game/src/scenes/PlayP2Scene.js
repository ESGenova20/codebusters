import { CST } from "../CST.js";
let questionCount = 0;
let endCheck = false;
export class PlayP2Scene extends Phaser.Scene{
    constructor(){
        super({ key: CST.SCENES.PLAYP2,
        });
    }
    preload(){
    this.load.spritesheet("playerOne","./assets/image/sprite/greenP-L.png", 
    {
        frameWidth: 96,
        frameHeight: 96
    });    

    this.load.spritesheet("playerTwo","./assets/image/sprite/blueP-L.png", 
    {
        frameWidth: 96,
        frameHeight: 96
    });  
    }
    
    create(){
        this.add.image(0,0, "playsceneBG").setOrigin(0);
        this.add.image(0,0, "playsceneBG").setOrigin(0);
        this.YES_button = this.add.image(210, 410, "YES_button");
        this.NO_button = this.add.image(590, 410, "NO_button");
        this.A_button = this.add.image(210,410,"A_button");
        this.B_button = this.add.image(590,410,"B_button");

        this.YES_button_S = this.add.image(210, 410, "YES_button_S");
        this.NO_button_S = this.add.image(590, 410, "NO_button_S");
        this.A_button_S = this.add.image(210, 410, "B_button_S");
        this.B_button_S = this.add.image(590, 410, "A_button_S");

        this.NextButton = this.add.image(700, 500, "NextButton");
        this.NextButton_S = this.add.image(700, 500, "NextButton_S");
        this.NextButton_S.setVisible(false);

        this.Q1 = this.add.image(400, 200, "Q1");
        this.Q2 = this.add.image(400, 200, "Q2");
        this.Q3 = this.add.image(400, 200, "Q3");
        this.Q4 = this.add.image(400, 200, "Q4");
        this.Q5 = this.add.image(400, 200, "Q5");
        this.Q6 = this.add.image(400, 200, "Q6");
        this.Q7 = this.add.image(400, 200, "Q7");
        this.Q8 = this.add.image(400, 200, "Q8");
        this.Q9 = this.add.image(400, 200, "Q9");
        this.Q10 = this.add.image(400, 200, "Q10");

        this.YES_button.setVisible(false);
        this.NO_button.setVisible(false);

        this.Q2.setVisible(false);
        this.Q3.setVisible(false);
        this.Q4.setVisible(false);
        this.Q5.setVisible(false);
        this.Q6.setVisible(false);
        this.Q7.setVisible(false);
        this.Q8.setVisible(false);
        this.Q9.setVisible(false);
        this.Q10.setVisible(false);
        
        this.A_button.setVisible(false);
        this.B_button.setVisible(false);
        this.A_button_S.setVisible(false);
        this.B_button_S.setVisible(false);
        
        this.playerOne = this.add.sprite(96, 96, "playerOne", "./assets/image/sprite/greenP-L.png");
        this.playerTwo = this.add.sprite(500, 96, "playerTwo", "./assets/image/sprite/blueP-L.png");
        this.input.keyboard.on('keydown', this.anyKey, this);

        this.NextButton.setInteractive();

        this.NextButton.on("pointerover", ()=>{
            this.NextButton_S.setVisible(true);
        })
        this.NextButton.on("pointerout", ()=>{
            this.NextButton_S.setVisible(false);
        })
        this.NextButton.on("pointerup", ()=>{
           questionCount++;
        })
    }
    anyKey (event)
    {
        let code = event.keyCode;
        if (code == Phaser.Input.Keyboard.KeyCodes.A)
        {
            this.playerOne.flipX = false;
            this.playerOne.x -= (this.playerOne.x < 24 ? 0: 4);
        }
        else if (code == Phaser.Input.Keyboard.KeyCodes.D)
        {
            this.playerOne.flipX = true;
            this.playerOne.x += (this.playerOne.x > 700 ? 0 : 4);
        }
    
        if (code == Phaser.Input.Keyboard.KeyCodes.W)
        {
            this.playerOne.y -= (this.playerOne.y < 60 ? 0: 4);

        }
        else if (code == Phaser.Input.Keyboard.KeyCodes.S)
        {
            this.playerOne.y += (this.playerOne.y > 500 ? 0: 4);
        }

        if (code == Phaser.Input.Keyboard.KeyCodes.LEFT)
        {
            this.playerTwo.flipX = false;
            this.playerTwo.x -= (this.playerTwo.x < 24 ? 0: 4);
        }
        else if (code == Phaser.Input.Keyboard.KeyCodes.RIGHT)
        {
            this.playerTwo.flipX = true;
            this.playerTwo.x += (this.playerTwo.x > 700 ? 0 : 4);
        }

        if (code == Phaser.Input.Keyboard.KeyCodes.UP)
        {
            this.playerTwo.y -= (this.playerTwo.y < 60 ? 0: 4);

        }
        else if (code == Phaser.Input.Keyboard.KeyCodes.DOWN)
        {
            this.playerTwo.y += (this.playerTwo.y > 500 ? 0: 4);
        }
     
        let playerOne_X_coords = this.playerOne.x;
        let playerOne_Y_coords = this.playerOne.y;
      
        this.input.keyboard.on('keyup-Z', function (event) {
            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount < 1)
            {
               this.scene.isCorrect[0] = true;
            };

            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 1)
            {
                this.scene.isCorrect[1] = true;
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 2)
            { 
                this.scene.isCorrect[2] = true;
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 3)
            { 
                this.scene.isCorrect[3] = true;
            };

            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 4)
            { 
                this.scene.isCorrect[4] = true;
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 5)
            { 
                this.scene.isCorrect[5] = true;
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 6)
            { 
                this.scene.isCorrect[6] = true;
            };

            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 7)
            { 
                this.scene.isCorrect[7] = true;
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 8)
            { 
                this.scene.isCorrect[8] = true;
            };

             if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 9)
            { 
                this.scene.isCorrect[9] = true;
            };


          
            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 9)
            { 
                endCheck = true;
            };
        });

        this.input.keyboard.on('keyup-ENTER'), function (event) {
                if ((((playerTwo_X_coords > 130) && (playerTwo_X_coords < 280)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && questionCount < 1)
                {
                   this.scene.isCorrect[0] = true;
                };
    
                if ((((playerTwo_X_coords > 130) && (playerTwo_X_coords < 280)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && questionCount == 1)
                {
                    this.scene.isCorrect[1] = true;
                };
    
                if ((((playerTwo_X_coords > 520) && (playerTwo_X_coords < 620)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && questionCount == 2)
                { 
                    this.scene.isCorrect[2] = true;
                };
    
                if ((((playerTwo_X_coords > 520) && (playerTwo_X_coords < 620)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && questionCount == 3)
                { 
                    this.scene.isCorrect[3] = true;
                };
    
                if ((((playerTwo_X_coords > 130) && (playerTwo_X_coords < 280)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && questionCount == 4)
                { 
                    this.scene.isCorrect[4] = true;
                };
    
                if ((((playerTwo_X_coords > 520) && (playerTwo_X_coords < 620)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && questionCount == 5)
                { 
                    this.scene.isCorrect[5] = true;
                };
    
                if ((((playerTwo_X_coords > 520) && (playerTwo_X_coords < 620)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && questionCount == 6)
                { 
                    this.scene.isCorrect[6] = true;
                };
    
                if ((((playerTwo_X_coords > 130) && (playerTwo_X_coords < 280)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && questionCount == 7)
                { 
                    this.scene.isCorrect[7] = true;
                };
    
                if ((((playerTwo_X_coords > 520) && (playerTwo_X_coords < 620)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && questionCount == 8)
                { 
                    this.scene.isCorrect[8] = true;
                };
    
                 if ((((playerTwo_X_coords > 520) && (playerTwo_X_coords < 620)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && questionCount == 9)
                { 
                    this.scene.isCorrect[9] = true;
                };
        }
    }

    update(){
       }
}