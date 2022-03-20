import { CST } from "../CST.js";
let questionCount = 0; //initialize question count and check if questions are finished
let endCheck = false;
export class PlayP1Scene extends Phaser.Scene{ 
    constructor(){
        super({ key: CST.SCENES.PLAYP1,
        });
    }
    preload(){

    this.load.spritesheet("playerOne","./assets/image/sprite/greenP-L.png",  //Load player
    {
        frameWidth: 96,
        frameHeight: 96
    });    
}
    
    create(){
        this.isCorrect = []; //Make array which checks if answer is correct
        this.add.image(0,0, "playsceneBG").setOrigin(0); //Load background and buttons
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

        this.Q1 = this.add.image(400, 200, "Q1"); //Load Questions
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

        this.Q2.setVisible(false); //Hide all questions except question 1
        this.Q3.setVisible(false);
        this.Q4.setVisible(false);
        this.Q5.setVisible(false);
        this.Q6.setVisible(false);
        this.Q7.setVisible(false);
        this.Q8.setVisible(false);
        this.Q9.setVisible(false);
        this.Q10.setVisible(false);
        
        this.A_button.setVisible(false); //Hide unused buttons
        this.B_button.setVisible(false);
        this.A_button_S.setVisible(false);
        this.B_button_S.setVisible(false);
        
        this.playerOne = this.add.sprite(96, 96, "playerOne", "./assets/image/sprite/greenP-L.png"); //Spawn player
        this.input.keyboard.on('keydown', this.anyKey, this);//declare movement when key is down

        this.NextButton.setInteractive(); //Make NextButton interactive

        this.NextButton.on("pointerover", ()=>{ //When hovering over and when no longer hovering over
            this.NextButton_S.setVisible(true);
        })
        this.NextButton.on("pointerout", ()=>{
            this.NextButton_S.setVisible(false);
        })
        this.NextButton.on("pointerup", ()=>{ //When clicked
           questionCount++; //Go to next question
        })

    
    }
    anyKey (event)
    {
       
        let code = event.keyCode; //initialize player movement
        if (code == Phaser.Input.Keyboard.KeyCodes.A) //When WASD buttons are pressed
        {
            this.playerOne.flipX = false; //reverses flipped sprite
            this.playerOne.x -= (this.playerOne.x < 24 ? 0: 4); //changes player coordinates to simulate movement
        }
        else if (code == Phaser.Input.Keyboard.KeyCodes.D)
        {
            this.playerOne.flipX = true; //flips sprite
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

        let playerOne_X_coords = this.playerOne.x; //make player coordinates into variables
        let playerOne_Y_coords = this.playerOne.y;
      
        this.input.keyboard.on('keyup-Z', function (event) { //checks player coordinates and which question it is
            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount < 1)
            {
               this.scene.isCorrect[0] = true; //If the correct button is pressed it marks the question as correct
            };

            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 1)
            {
                this.scene.isCorrect[1] = true; //Marks question correct
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 2)
            { 
                this.scene.isCorrect[2] = true; //Marks question correct
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 3)
            { 
                this.scene.isCorrect[3] = true; //Marks question correct
            };

            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 4)
            { 
                this.scene.isCorrect[4] = true; //Marks question correct
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 5)
            { 
                this.scene.isCorrect[5] = true; //Marks question correct
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 6)
            { 
                this.scene.isCorrect[6] = true; //Marks question correct
            };

            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 7)
            { 
                this.scene.isCorrect[7] = true; //Marks question correct
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 8)
            { 
                this.scene.isCorrect[8] = true; //Marks question correct
            };

             if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && questionCount == 9)
            { 
                this.scene.isCorrect[9] = true; //Marks question correct
                endCheck = true; //confirms this is the last question
            };
        });
     
        if (questionCount == 9)
        { 
            endCheck = true; //confirms this is the last question
        };

        if(endCheck == true) //if the questions have finished and a button is pressed, show which questions are wrong
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
            if (this.isCorrect[0] == true){ //If the question is correct
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
                this.make.text({ //If the question is wrong
                    x: 400,
                    y: 100,
                         text: "1. Wrong!",
                    style: {
                        font: '30px monospace',
                        fill: '#ffffff'
                    }
                });  
            }

            if (this.isCorrect[1] == true){ //Repeats the process above for the rest of the questions
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
        if (questionCount == 1) //If Question 1 has passed
        {
            this.Q1.setVisible(false); //Hide question 1
            this.YES_button_S.setVisible(false); //Hide unsuitable buttons
            this.NO_button_S.setVisible(false);

            this.Q2.setVisible(true); //Show suitable buttons and question
            this.A_button_S.setVisible(true);
            this.B_button_S.setVisible(true);

        }
        else if (questionCount == 2)//If Question 2 has passed
        {
            this.Q2.setVisible(false); //Hides question 2 to show question 3
            this.Q3.setVisible(true); //Leaves the same buttons since they are suitable
        }
        else if (questionCount == 3) //Repeats the process above for the rest of the questions
        {
            this.Q3.setVisible(false);//The repeated process differs depending on the questions
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