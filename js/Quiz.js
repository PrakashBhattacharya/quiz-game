class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    textSize(30);
    text("Result of quiz", 120, 100);
    //call getContestantInfo( ) here
      Contestant.getPlayerInfo();
    
    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
     fill("Blue");
     textSize(20);
     text("*NOTE:Contestants who answered correct are highlited in green color",130,230);
    }
      
    //write code to add a note here
    
    //write code to highlight contest who answered correctly
   for(var plr in allContestants){
     var correctAns="2";
     if(correctAns === allContestants[plr].answer)
     fill("Green")
     else
     fill("red");
     textSize(20);
     text(allContestants[plr].name + ": " + allContestants[plr].answer, 250,350);
   } 
  }

}
