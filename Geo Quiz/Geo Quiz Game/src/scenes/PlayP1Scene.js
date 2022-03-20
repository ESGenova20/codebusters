import { CST } from "../CST.js";
let score = 0;
let questionCount = 0;
let endCheck = false;
export class PlayP1Scene extends Phaser.Scene{
    constructor(){
        super({ key: CST.SCENES.PLAYP1,
        });
    }
    preload(){

    this.load.spritesheet("playerOne","./assets/image/sprite/greenP-L.png", 
    {
        frameWidth: 96,
        frameHeight: 96
    });    
}
    
    create(){
        this.isCorrect = [];
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
                endCheck = true;
            };

            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 9)
            { 
                endCheck = true;
            };
        });
     
        if(endCheck == true)
        {
            this.make.text({
                x: 400,
                y: 50,
                     text: 'Final score:',
                style: {
                    font: '30px monospace',
                    fill: '#ffffff'
                }
            });
            if (this.isCorrect[0] == true){
                this.make.text({
                x: 400,
                y: 100,
                     text: "1. Correct!",
                style: {
                    font: '30px monospace',
                    fill: '#8BBC0F'
                }
            });
            }
            else{
                this.make.text({
                    x: 400,
                    y: 100,
                         text: "1. Wrong!",
                    style: {
                        font: '30px monospace',
                        fill: '#ffffff'
                    }
                });  
            }

            if (this.isCorrect[1] == true){
                this.make.text({
                x: 400,
                y: 140,
                     text: "2. Correct!",
                style: {
                    font: '30px monospace',
                    fill: '#8BBC0F'
                }
            });
            }
            else{
                this.make.text({
                    x: 400,
                    y: 140,
                         text: "2. Wrong!",
                    style: {
                        font: '30px monospace',
                        fill: '#ffffff'
                    }
                });  
            }

            if (this.isCorrect[2] == true){
                this.make.text({
                x: 400,
                y: 180,
                     text: "3. Correct!",
                style: {
                    font: '30px monospace',
                    fill: '#8BBC0F'
                }
            });
            }
            else{
                this.make.text({
                    x: 400,
                    y: 180,
                         text: "3. Wrong!",
                    style: {
                        font: '30px monospace',
                        fill: '#ffffff'
                    }
                });  
            }

            if (this.isCorrect[3] == true){
                this.make.text({
                x: 400,
                y: 220,
                     text: "4. Correct!",
                style: {
                    font: '30px monospace',
                    fill: '#8BBC0F'
                }
            });
            }
            else{
                this.make.text({
                    x: 400,
                    y: 220,
                         text: "4. Wrong!",
                    style: {
                        font: '30px monospace',
                        fill: '#ffffff'
                    }
                });  
            }

            if (this.isCorrect[4] == true){
                this.make.text({
                x: 400,
                y: 260,
                     text: "5. Correct!",
                style: {
                    font: '30px monospace',
                    fill: '#8BBC0F'
                }
            });
            }
            else{
                this.make.text({
                    x: 400,
                    y: 260,
                         text: "5. Wrong!",
                    style: {
                        font: '30px monospace',
                        fill: '#ffffff'
                    }
                });  
            }

            if (this.isCorrect[5] == true){
                this.make.text({
                x: 400,
                y: 300,
                     text: "6. Correct!",
                style: {
                    font: '30px monospace',
                    fill: '#8BBC0F'
                }
            });
            }
            else{
                this.make.text({
                    x: 400,
                    y: 300,
                         text: "6. Wrong!",
                    style: {
                        font: '30px monospace',
                        fill: '#ffffff'
                    }
                });  
            }

            if (this.isCorrect[6] == true){
                this.make.text({
                x: 400,
                y: 340,
                     text: "7. Correct!",
                style: {
                    font: '30px monospace',
                    fill: '#8BBC0F'
                }
            });
            }
            else{
                this.make.text({
                    x: 400,
                    y: 340,
                         text: "7. Wrong!",
                    style: {
                        font: '30px monospace',
                        fill: '#ffffff'
                    }
                });  
            }

            if (this.isCorrect[7] == true){
                this.make.text({
                x: 400,
                y: 380,
                     text: "8. Correct!",
                style: {
                    font: '30px monospace',
                    fill: '#8BBC0F'
                }
            });
            }
            else{
                this.make.text({
                    x: 400,
                    y: 380,
                         text: "8. Wrong!",
                    style: {
                        font: '30px monospace',
                        fill: '#ffffff'
                    }
                });  

                if (this.isCorrect[8] == true){
                    this.make.text({
                    x: 400,
                    y: 420,
                         text: "9. Correct!",
                    style: {
                        font: '30px monospace',
                        fill: '#8BBC0F'
                    }
                });
                }
                else{
                    this.make.text({
                        x: 400,
                        y: 420,
                             text: "9. Wrong!",
                        style: {
                            font: '30px monospace',
                            fill: '#ffffff'
                        }
                    });  
                }

                if (this.isCorrect[9] == true){
                    this.make.text({
                    x: 400,
                    y: 460,
                         text: "10. Correct!",
                    style: {
                        font: '30px monospace',
                        fill: '#8BBC0F'
                    }
                });
                }
                else{
                    this.make.text({
                        x: 400,
                        y: 460,
                             text: "10. Wrong!",
                        style: {
                            font: '30px monospace',
                            fill: '#ffffff'
                        }
                    });  
                }

            }
        }
    }

    update(){
        if (questionCount == 1)
        {
            this.Q1.setVisible(false);
            this.YES_button_S.setVisible(false);
            this.NO_button_S.setVisible(false);

            this.Q2.setVisible(true);
            this.A_button_S.setVisible(true);
            this.B_button_S.setVisible(true);

        }
        else if (questionCount == 2)
        {
            this.Q2.setVisible(false);
            this.Q3.setVisible(true);
        }
        else if (questionCount == 3)
        {
            this.Q3.setVisible(false);
            this.A_button_S.setVisible(false);
            this.B_button_S.setVisible(false);

            this.Q4.setVisible(true);
            this.YES_button_S.setVisible(true);
            this.NO_button_S.setVisible(true);
        }
        else if (questionCount == 4)
        {
            this.Q4.setVisible(false);
            this.YES_button_S.setVisible(false);
            this.NO_button_S.setVisible(false);  

            this.Q5.setVisible(true);
            this.A_button_S.setVisible(true);
            this.B_button_S.setVisible(true);
        }
        else if (questionCount == 5)
        {
            this.Q5.setVisible(false);
            this.A_button_S.setVisible(false);
            this.B_button_S.setVisible(false);

            this.Q6.setVisible(true);
            this.YES_button_S.setVisible(true);
            this.NO_button_S.setVisible(true); 
        }
        else if (questionCount == 6)
        {
            this.Q6.setVisible(false);
            this.Q7.setVisible(true);
        }
        else if (questionCount == 7)
        {
            this.Q7.setVisible(false);
            this.YES_button_S.setVisible(false);
            this.NO_button_S.setVisible(false);  

            this.Q8.setVisible(true);
            this.A_button_S.setVisible(true);
            this.B_button_S.setVisible(true); 
        }
        else if (questionCount == 8)
        {
            this.Q8.setVisible(false);
            this.A_button_S.setVisible(false);
            this.B_button_S.setVisible(false);

            this.Q9.setVisible(true);
            this.YES_button_S.setVisible(true);
            this.NO_button_S.setVisible(true); 
        }
        else if (questionCount == 9)
        {
            endCheck = true;
            this.Q9.setVisible(false);
            this.YES_button_S.setVisible(false);
            this.NO_button_S.setVisible(false); 

            this.Q10.setVisible(true);
            this.A_button_S.setVisible(true);
            this.B_button_S.setVisible(true); 
        }
        else if (questionCount > 9)
        {
            this.Q10.setVisible(false);
            this.A_button_S.setVisible(false);
            this.B_button_S.setVisible(false); 
            

        }

       
       }
}