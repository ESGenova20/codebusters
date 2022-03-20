import { CST } from "../CST.js"; 
export class PlayP2Scene extends Phaser.Scene{
    constructor(){
        super({ key: CST.SCENES.PLAYP2,
        });
    }
    preload(){
    this.load.spritesheet("playerOne","./assets/image/sprite/greenP-L.png", //Load player 1 sprite
    {
        frameWidth: 96,
        frameHeight: 96
    });    

    this.load.spritesheet("playerTwo","./assets/image/sprite/blueP-L.png", //Load player 2 sprite
    {
        frameWidth: 96,
        frameHeight: 96
    });  
    }
    
    create(){
        this.questionCount = 0; //Create a question counter
        this.endCheck = false;//Create a check if the questions are answered

        this.player1CanScore=true; //Declare variables which allow the player to score once per question
        this.player2CanScore=true;

        this.p1Score = 0; //Declare player score variables
        this.p2Score = 0;

        this.add.image(0,0, "playsceneBG").setOrigin(0); //Add backround
        this.YES_button = this.add.image(210, 410, "YES_button"); //Add buttons
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

        this.Q1 = this.add.image(400, 200, "Q1"); //Add questions
        this.Q2 = this.add.image(400, 200, "Q2");
        this.Q3 = this.add.image(400, 200, "Q3");
        this.Q4 = this.add.image(400, 200, "Q4");
        this.Q5 = this.add.image(400, 200, "Q5");
        this.Q6 = this.add.image(400, 200, "Q6");
        this.Q7 = this.add.image(400, 200, "Q7");
        this.Q8 = this.add.image(400, 200, "Q8");
        this.Q9 = this.add.image(400, 200, "Q9");
        this.Q10 = this.add.image(400, 200, "Q10");

        this.YES_button.setVisible(false); //Hide assets which aren't in use
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
        
        this.playerOne = this.add.sprite(96, 96, "playerOne", "./assets/image/sprite/greenP-L.png"); //Spawn player spritess
        this.playerTwo = this.add.sprite(500, 96, "playerTwo", "./assets/image/sprite/blueP-L.png");
        this.input.keyboard.on('keydown', this.anyKey, this); //Make player movement 

        this.NextButton.setInteractive(); //Make NextButton functional

        this.NextButton.on("pointerover", ()=>{ //When hovering over
            this.NextButton_S.setVisible(true);
        })
        this.NextButton.on("pointerout", ()=>{ //When no longer hovering over
            this.NextButton_S.setVisible(false);
        })
        this.NextButton.on("pointerup", ()=>{ //When clicked
           this.questionCount++;
        })
    }
    anyKey (event)
    {
        let code = event.keyCode; //Make players movement buttons
        if (code == Phaser.Input.Keyboard.KeyCodes.A) //Make player 1 move like in 1P mode
        {
            this.playerOne.flipX = false;
            this.playerOne.x -= (this.playerOne.x < 24 ? 0: 4);
        }
        else if (code == Phaser.Input.Keyboard.KeyCodes.D) 
        {console.log(this)
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

        if (code == Phaser.Input.Keyboard.KeyCodes.LEFT) //Make P2 move similar to P1 with arrow keys
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
     
        let playerOne_X_coords = this.playerOne.x; //Make P1 and P2 coordinate variables
        let playerOne_Y_coords = this.playerOne.y;
        
        let playerTwo_X_coords = this.playerTwo.x;
        let playerTwo_Y_coords = this.playerTwo.y;

        this.input.keyboard.on('keyup-Z', function (event) { //Make confirm buttons which work depending on player coordinates, if the player has answered and question count
            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && this.scene.player1CanScore==true && this.scene.questionCount < 1)
            {
               this.scene.p1Score++; //Adds a point to player one
               this.scene.player1CanScore = false; //Prevents further point gain from this question
            };

            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && this.scene.player1CanScore==true && this.scene.questionCount == 1) 
            {
                this.scene.p1Score++;
                this.scene.player1CanScore=false;
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && this.scene.player1CanScore==true && this.scene.questionCount == 2)
            { 
                this.scene.p1Score++;
                this.scene.player1CanScore=false;
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && this.scene.player1CanScore==true && this.scene.questionCount == 3)
            { 
                this.scene.p1Score++;
                this.scene.player1CanScore=false;
            };

            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && this.scene.player1CanScore==true && this.scene.questionCount == 4)
            { 
                this.scene.p1Score++;
                this.scene.player1CanScore=false;
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && this.scene.player1CanScore==true && this.scene.questionCount == 5)
            { 
                this.scene.p1Score++;
                this.scene.player1CanScore=false;
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && this.scene.player1CanScore==true && this.scene.questionCount == 6)
            { 
                this.scene.p1Score++;
                this.scene.player1CanScore=false;
            };

            if ((((playerOne_X_coords > 130) && (playerOne_X_coords < 280)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && this.scene.player1CanScore==true && this.scene.questionCount == 7)
            { 
                this.scene.p1Score++;
                this.scene.player1CanScore=false;
            };

            if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && this.scene.player1CanScore==true && this.scene.questionCount == 8)
            { 
                this.scene.p1Score++;
                this.scene.player1CanScore=false;
            };

             if ((((playerOne_X_coords > 520) && (playerOne_X_coords < 620)) && ((playerOne_Y_coords > 350) && (playerOne_Y_coords < 460))) && this.scene.player1CanScore==true && this.scene.questionCount == 9)
            { 
                this.scene.p1Score++;
                this.scene.player1CanScore=false;
            };
        });

        this.input.keyboard.on('keyup-ENTER', function (event) { //Repeats P1's confirm button mechanics, but this time with the enter button instead of Z
                if ((((playerTwo_X_coords > 130) && (playerTwo_X_coords < 280)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && this.scene.player2CanScore==true && this.scene.questionCount < 1)
                {
                    this.scene.p2Score++; //Adds a point
                    this.scene.player2CanScore=false; //Prevents further point gain from question
                };
    
                if ((((playerTwo_X_coords > 130) && (playerTwo_X_coords < 280)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && this.scene.player2CanScore==true && this.scene.questionCount == 1)
                {
                    this.scene.p2Score++;
                    this.scene.player2CanScore=false;
                };
    
                if ((((playerTwo_X_coords > 520) && (playerTwo_X_coords < 620)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && this.scene.player2CanScore==true && this.scene.questionCount == 2)
                { 
                    this.scene.p2Score++;
                    this.scene.player2CanScore=false;

                };
    
                if ((((playerTwo_X_coords > 520) && (playerTwo_X_coords < 620)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && this.scene.player2CanScore==true && this.scene.questionCount == 3)
                { 
                    this.scene.p2Score++;
                    this.scene.player2CanScore=false;
                };
    
                if ((((playerTwo_X_coords > 130) && (playerTwo_X_coords < 280)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && this.scene.player2CanScore==true && this.scene.questionCount == 4)
                { 
                    this.scene.p2Score++;
                    this.scene.player2CanScore=false;
                };
    
                if ((((playerTwo_X_coords > 520) && (playerTwo_X_coords < 620)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && this.scene.player2CanScore==true && this.scene.questionCount == 5)
                { 
                    this.scene.p2Score++;
                    this.scene.player2CanScore=false;
                };
    
                if ((((playerTwo_X_coords > 520) && (playerTwo_X_coords < 620)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && this.scene.player2CanScore==true && this.scene.questionCount == 6)
                { 
                    this.scene.p2Score++;
                    this.scene.player2CanScore=false;
                };
    
                if ((((playerTwo_X_coords > 130) && (playerTwo_X_coords < 280)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && this.scene.player2CanScore==true && this.scene.questionCount == 7)
                { 
                    this.scene.p2Score++;
                    this.scene.player2CanScore=false;
                };
    
                if ((((playerTwo_X_coords > 520) && (playerTwo_X_coords < 620)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && this.scene.player2CanScore==true && this.scene.questionCount == 8)
                { 
                    this.scene.p2Score++;
                    this.scene.player2CanScore=false;
                };
    
                 if ((((playerTwo_X_coords > 520) && (playerTwo_X_coords < 620)) && ((playerTwo_Y_coords > 350) && (playerTwo_Y_coords < 460))) && this.scene.player2CanScore==true && this.scene.questionCount == 9)
                { 
                    this.scene.p2Score++;
                    this.scene.player2CanScore=false;
                };

                if (this.scene.questionCount == 9)
                { 
                    this.endCheck = true; //Marks that the question have finished when the question counter reaches 9 since it's +1 from question 1
                };
        });
        if(this.endCheck == true) //If the questions have finished, declare point variables and compare them
        {
            let p1pts = this.p1Score;
            let p2pts = this.p2Score;
           console.log(p1pts, p2pts);
           if (p1pts > p2pts)
           {
            this.make.text({
                x: 400,
                y: 300,
                     text: "P1 wins!", //Print that player 1 wins
                style: {
                    font: '40px monospace',
                    fill: '#ffffff'
                }
            });  
           }
           else if (p1pts < p2pts)
           {
            this.make.text({
                x: 400,
                y: 300,
                     text: "P2 wins!", //Print that player 2 wins
                style: {
                    font: '40px monospace',
                    fill: '#ffffff'
                }
            });   
           }
           else{
            this.make.text({
                x: 250,
                y: 250,
                     text: "It's a draw!", //If the points are equal, it's a draw
                style: {
                    font: '40px monospace',
                    fill: '#ffffff'
                }
            });  
           }
        }
        
    }

    update(){

        if (this.questionCount == 1) //Similar to P1 mode, shows and hides questions depending on question count
        {
            this.player1CanScore=true; //When question is changed, make sure that the player can score again
            this.player2CanScore=true;

            this.Q1.setVisible(false); //Hidee unnecessary assets and show the necessary ones
            this.YES_button_S.setVisible(false);
            this.NO_button_S.setVisible(false);

            this.Q2.setVisible(true);
            this.A_button_S.setVisible(true);
            this.B_button_S.setVisible(true);

        }
        else if (this.questionCount == 2)
        {
            this.player1CanScore=true;
            this.player2CanScore=true;

            this.Q2.setVisible(false);
            this.Q3.setVisible(true);
        }
        else if (this.questionCount == 3)
        {
            this.player1CanScore=true;
            this.player2CanScore=true;

            this.Q3.setVisible(false);
            this.A_button_S.setVisible(false);
            this.B_button_S.setVisible(false);

            this.Q4.setVisible(true);
            this.YES_button_S.setVisible(true);
            this.NO_button_S.setVisible(true);
        }
        else if (this.questionCount == 4)
        {
            this.player1CanScore=true;
            this.player2CanScore=true;

            this.Q4.setVisible(false);
            this.YES_button_S.setVisible(false);
            this.NO_button_S.setVisible(false);  

            this.Q5.setVisible(true);
            this.A_button_S.setVisible(true);
            this.B_button_S.setVisible(true);
        }
        else if (this.questionCount == 5)
        {
            this.player1CanScore=true;
            this.player2CanScore=true;

            this.Q5.setVisible(false);
            this.A_button_S.setVisible(false);
            this.B_button_S.setVisible(false);

            this.Q6.setVisible(true);
            this.YES_button_S.setVisible(true);
            this.NO_button_S.setVisible(true); 
        }
        else if (this.questionCount == 6)
        {
            this.player1CanScore=true;
            this.player2CanScore=true;
            
            this.Q6.setVisible(false);
            this.Q7.setVisible(true);
        }
        else if (this.questionCount == 7)
        {
            this.player1CanScore=true;
            this.player2CanScore=true;

            this.Q7.setVisible(false);
            this.YES_button_S.setVisible(false);
            this.NO_button_S.setVisible(false);  

            this.Q8.setVisible(true);
            this.A_button_S.setVisible(true);
            this.B_button_S.setVisible(true); 
        }
        else if (this.questionCount == 8)
        {
            this.player1CanScore=true;
            this.player2CanScore=true;

            this.Q8.setVisible(false);
            this.A_button_S.setVisible(false);
            this.B_button_S.setVisible(false);

            this.Q9.setVisible(true);
            this.YES_button_S.setVisible(true);
            this.NO_button_S.setVisible(true); 
        }
        else if (this.questionCount == 9)
        {
            this.player1CanScore=true;
            this.player2CanScore=true;

            this.endCheck = true;
            this.Q9.setVisible(false);
            this.YES_button_S.setVisible(false);
            this.NO_button_S.setVisible(false); 

            this.Q10.setVisible(true);
            this.A_button_S.setVisible(true);
            this.B_button_S.setVisible(true); 
        }
        else if (this.questionCount > 9)
        {
            this.player1CanScore=true;
            this.player2CanScore=true;

            this.Q10.setVisible(false);
            this.A_button_S.setVisible(false);
            this.B_button_S.setVisible(false); 
            

        }

       }
}