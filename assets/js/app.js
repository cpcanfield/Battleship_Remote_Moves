


var gamePlay = {
    battleship: Object.create(battleship),
    class_name:["Cruiser", "Submarine", "Destroyer", "Battleship","missed"],


    //gets then returns the username
    getUsername: function(){
        var url =  window.location.search
        needed_username = new URLSearchParams(url) 
        var username = needed_username.get("username") 
        setUsername(username)

    },

//uses battleship memeber to setup and start a game
    playGame: function(){
        //display the username
        this.getUsername()
        //initialize the game 
        battleship.initialize()
        //create the ships 
        this.battleship.createShips()

    },


    //if all ships are marked adds a game over message to the message div
    isGameOver: function(){

        var message = 'Game Over!'
        addMessage(message)
        
    },


    //resets the game board, message div and starts a new game
    reset: function(){
        //reset the game board 
        this.clear_board()
        //clear the message div 
        clearMessages()
        clearUserName()
        //clear all the battleship's methods 
        battleship.reset_methods()
        //play the game
        this.playGame()

    },




    //clears the board 
    clear_board: function(){    
        //index through the array of class names 
        for(var tracker = 0; tracker < this.class_name.length; tracker++){
            //call remove class for the current index of class_name
            removeClass(this.class_name[tracker])
        }
    },
};


