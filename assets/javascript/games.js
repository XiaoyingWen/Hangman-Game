    var shallowSeaResidents = ["coral", "dolphin", "turtle",
        "dugong", "fish", "stingray", "shark",
        "whale", "seahorse", "snake", "seastar", "krill"
        ];

    var shallowSeaResidentsImgs = {
        "coral": "Coral_Reef.jpg", //default
        "dolphin": "bottlenose-dolphin.jpg",
        "turtle": "Green_Sea_Turtle.jpg",
        "dugong": "dugong.jpg", 
        "fish": "Clown_fish.jpg", 
        "stingray": "stingray.jpg",
        "shark": "greatshark.jpg",
        "whale": "HumpbackWhale.jpg", 
        "seahorse": "pygmy-seahorse.jpg", 
        "snake": "seasnake.jpeg",
        "seastar": "SeaStar.jpg",
        "krill": "krill.jpg"
        };

    var gameIncident = {
        isGameOver: true,
        areYouWin: false,
        wordSpaceHolder: "",
        wordToGuess: "",
        numOfGuessAllowed: 0,
        lettersTypied: "",
        numberOfLetterMatched: 0,
        imgsrc: "",
        init: function(){
          console.log("Enter init......................");
          this.isGameOver=false;
          var randomOptionIndex = Math.floor(Math.random() * shallowSeaResidents.length);
          //console.log("randomOptionIndex:" + randomOptionIndex);
          this.wordToGuess = shallowSeaResidents[randomOptionIndex];
          this.imgsrc = shallowSeaResidentsImgs["coral"];
          this.wordSpaceHolder="_";
          for(var i = 0; i < this.wordToGuess.length - 1; i++){
            this.wordSpaceHolder += " _";
          }
          this.areYouWin = false;
          this.numOfGuessAllowed = this.wordToGuess.length * 2;
          this.lettersTypied = "";
          this.numberOfLetterMatched = 0;
          console.log("Exit init......................");
      /*console.log("isGameOver:" + gameIncident.isGameOver);
      console.log("ameStatus:" + gameIncident.gameStatus);
      console.log("wordToGuess:" + gameIncident.wordToGuess);
      console.log("wordSpaceHolder:" + gameIncident.wordSpaceHolder);
      console.log("numOfGuessRemaining:" + gameIncident.numOfGuessAllowed);
      console.log("lettersTypied:" + gameIncident.lettersTypied);
      console.log("numberOfLetterMatched:" + gameIncident.numberOfLetterMatched);
      console.log("................inside.............................");*/
        } ,

        checkMatch: function(letter){
          console.log("Enter checkMatch......................");

          this.numOfGuessAllowed--;
          letter = letter.toLowerCase();
          //console.log("typed: " + letter);
          //console.log("lettersTypied: " + this.lettersTypied);
          console.log("this.wordToGuess:" + this.wordToGuess);
          console.log("this.wordSpaceHolder:" + this.wordSpaceHolder);
          var wordSpaceHolderCopy="";
          for(var i = 0; i < this.wordToGuess.length; i++){
            //console.log("i:"+i);
             if(letter == this.wordToGuess[i]) {
               //this.wordSpaceHolder[i * 2] = letter;
               this.numberOfLetterMatched++;
               wordSpaceHolderCopy+=letter+" ";
               console.log("match:" + letter);
             }
             else{
              wordSpaceHolderCopy+=this.wordSpaceHolder[i*2]+" ";
              console.log("not match:" + letter);
             }
          }
          console.log("wordSpaceHolderCopy:" + wordSpaceHolderCopy);
          this.wordSpaceHolder=wordSpaceHolderCopy.trim();
          this.lettersTypied += letter.toUpperCase() + " ";
          if(this.numberOfLetterMatched == this.wordToGuess.length){
            this.isGameOver = true;
            this.areYouWin = true;
            this.imgsrc = shallowSeaResidentsImgs[this.wordToGuess];
          } else {
            if(this.numOfGuessAllowed <= 0) {
              this.isGameOver = true;
              this.areYouWin = false;
            }
          }
          console.log("Exit checkMatch......................");
        }
    };

    function handleKeyUp(event){
            console.log("entered:" + event.key);
    }

    function toDoThis(event){
      console.log("Enter toDoThis.....................................................");
      if(gameIncident.isGameOver){
        gameIncident.init();
        document.getElementById("gameStatus").innerHTML = "Game started!";
      }
      else{
        var keyTypied = event.key;
        //console.log("key entered: "+keyTypied);
        gameIncident.checkMatch(keyTypied);
        if(gameIncident.isGameOver){
          var msg = "Press any key to get started again!"
          if(gameIncident.areYouWin){
              msg = "You Win! " + msg;
          } else {
              msg = "You lost. " + msg;
          }
           document.getElementById("gameStatus").innerHTML = msg;
        }
      }

      console.log("isGameOver:" + gameIncident.isGameOver);
      console.log("ameStatus:" + gameIncident.areYouWin);
      console.log("wordToGuess:" + gameIncident.wordToGuess);
      console.log("wordSpaceHolder:" + gameIncident.wordSpaceHolder);
      console.log("numOfGuessRemaining:" + gameIncident.numOfGuessAllowed);
      console.log("lettersTypied:" + gameIncident.lettersTypied);
      console.log("numberOfLetterMatched:" + gameIncident.numberOfLetterMatched);

      document.getElementById("currectWord").innerHTML = gameIncident.wordSpaceHolder;
      document.getElementById("numOfGuessRemaining").innerHTML = gameIncident.numOfGuessAllowed;
      document.getElementById("lettersGuessed").innerHTML = gameIncident.lettersTypied;
      document.getElementById("gameImg").src = "assets/images/"+gameIncident.imgsrc;

      console.log("Exit toDoThis......................................................");
    }

    document.onkeyup = toDoThis;