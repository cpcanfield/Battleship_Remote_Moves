var boardXsize = 10, boardYsize = 10;
var vessels = [["Cruiser", 2], ["Submarine", 3], ["Destroyer", 4], ["Battleship", 5]];


var ship = {
    ship_name: 'shippy',
    ship_length: 0,
    ship_orientation: 'x',
    hits: 0,

    get_name: function (){
        return this.ship_name
    },

    get_length: function (){
        return this.ship_length
    },

    get_orientation: function() {
        return this.ship_orientation
    }, 

    get_hits: function(){
        return this.hits
    }, 



    set_ship_name: function(Name) {
        this.ship_name = Name
    },

    set_ship_orientation: function(orien){
        this.ship_orientation = orien
    }, 
 
    set_ship__length: function(num){
        this.ship_length = num
    },

    set_ship_hits: function(){
        this.hits = this.get_length()
    },

    update_hits: function(num){
        this.hits = num
    }
  

}; 

var battleship = {
    game_board: [], 
    ships: [],
    message_count: 0,
    sunk_ships: 0,
    clicked_spot: [],


        //initializes an object of battle ship by creating a game board based 
        //off the measurements given
        initialize: function(){
            var Myboard = []
            //traverse through the first array based off of the width given 
            for(i = 1; i<=boardXsize; i++){
                //empty array to hold an array that will comprise a row
                var row = []; 
                //traverse through array based off the height given
                for(j=1; j<=boardYsize; j++){
                    row.push('')
                }//push the row onto the game board
               Myboard.push(row)
            }
            this.game_board = Myboard

            },
        
        reset_methods(){
            this.ships.length = 0 
            this.sunk_ships = 0 
            this.clicked_spot.length = 0 
        },

        //gets the list of ships 
        get_ships: function(){
            return this.ships
            
        },

        get_message_count: function(){
            return this.message_count
        },

        update_message_count: function(){
            this.message_count++ 
        },


     //checks if a spot is empty given it's coordinates, returns true if it is
     is_spot_empty_: function(col, row){
        //index to the proper spot in the game_board and get its value 
        let position_needed = this.game_board[col][row]
        if(position_needed === ''){
            return true

        }else{            
            return false 
        }
        },

    
//generates a random coordinate 
generate_cord: function(){
    var random_col = Math.floor(Math.random() * boardXsize);
    var random_row = Math.floor(Math.random() * boardYsize);
    var myCord=[]
    myCord[0] = random_col
    myCord[1] = random_row
    return myCord

},

//generates a random orientation 
generate_orientation: function(){
    //generates a 1 or 0 randomly 
    var ran_num = Math.floor(Math.random() * 2)
    //if its a 0 the orientation is horizontal
    if(ran_num === 0){
        return 'x'
    }//if its 1 the orientation is vertical
    else{
        return 'y'
    }
},



    //converts given cordinates from string to a number value based on the colloumn given
    convert_collumn:function (cord){
        //parse the first as a string 
        var collumn_needed = cord[0]
        //convert letter to upper case 
        var col = collumn_needed.toUpperCase()
        var index = 0 
        //convert the letter to ASCII value 
        ascii_col = col.charCodeAt(0)

        collumn_value = ascii_col - 65
        return collumn_value 
 
        },

    //converts given cordinates from string to number value based on the row inputed 
    convert_row:function(cord){
        var row = cord.substr(1)
        int_row = parseInt(row)
        int_row--
        return int_row
    },


    //checks if a ship can be placed horizontally based off the given first cordinate and the ships size 
    can_be_horizontal: function(cord, size){
        var col = cord[0]
        var row = cord[1]
        //check to make sure it is not the right most collumn
        if(col === boardXsize - 1){
            return false
        }
        //check to make sure there is enough space between starting collumn and ending collumn on the board
        if(size + col >= boardXsize){
            return false
        }
        //for each cordinated needed based off the size of the ship: 
        for(var tracker = 0; tracker < size; tracker ++){
            var this_col = col + tracker

            //check if that cord is open 
            if(this.is_spot_empty_(this_col, row)){
                //if it is empty, go to the next collumn 
                this_col+=1
            }else{
            //if the current spot is not empty end the function 
            return false
            }
        }
        return true
    },


    //checks if a ship can be placed vertically based off the given first cordinate and the ships size 
    can_be_vertical: function(cord, size){
        //get the needed collumn and row 
        var col = cord[0]
        var row = cord[1]
        //check to make sure it is not the right most collumn
        if(row === boardYsize - 1){
            return false
        }//check to make sure there is enough space between starting collumn and ending collumn on the board
        if(row + size >= boardYsize){
            return false
        }
        //for each cordinated needed based off the size of the ship: 
        for(var tracker = 0; tracker < size; tracker ++){
            var this_row = row + tracker
            //check if that cord is open 
            if(this.is_spot_empty_(col, this_row)){
                //if it is empty, go to the next collumn 
                this_row+=1
            }else{
            //if the current spot is not empty end the function 
            return false
            }
        }
        return true
    },
    
    //determines if a ship can be placed based off of a coordinate,
    // orientation and given size of a ship and returns true if able to
    canIPlaceShip(cords, orientation, size){
        //if the orientation is horizontal
        if(orientation === 'x'){
            //check if the ship can be placed that way 
            if(this.can_be_horizontal(cords, size)){
                return true
            }else{
                return false
            }
        }else{//if the ship must be placed vertically, call the check vertical function 
            if(this.can_be_vertical(cords, size)){
                return true
            }else{
                return false
            }
        }
        
        },

        
        //randomly selects a position to place a ship on the board with the first letter of the ship's name
        putShip: function(ship){
            //generate a random coordinate
            var ran_cord = this.generate_cord()
            //get the first letter of the name of the ship 
            var shipName = ship.get_name()
            var letter = shipName.charAt(0)
            //check if canIPlaceShip is true 
            if(this.canIPlaceShip(ran_cord, ship.get_orientation(), ship.get_length())){
                //if the ship is horizontal:
                if(ship.get_orientation() === 'x' ){
                    //get the colloumn and row of the begining coordinate
                    var this_col = ran_cord[0]
                    var this_row = ran_cord[1]
                    //begin indexing through the spots needing to be marked
                    for(var tracker = 0; tracker < ship.get_length(); tracker++){
                        //increment to the proper collumn
                        this_col += 1
                        //set the proper position of the game board to the first letter of the ship's name
                        this.game_board[this_col][this_row] = letter
                        //store the ship in the array of ship objects
                        this.ships.push(ship)
                }
            }else{//if the ship's given orientation is vertical
                    //get the colloumn and row of the begining coordinate
                    var this_col = ran_cord[0]
                    var this_row = ran_cord[1]
                    //begin indexing through the spots needing to be marked
                    for(var tracker = 0; tracker < ship.get_length(); tracker++){
                        //increment to the proper collumn
                        this_row += 1
                        //set the proper position of the game board to the first letter of the ship's name
                        this.game_board[this_col][this_row] = letter
                        //store the ship in the array of ship objects
                        this.ships.push(ship)
            }
            }
        }else{//if the ship can't be placed with the genrated coordinate, call the function again 
            this.putShip(ship)

        }
    },

    //creates 4 ship objecs with random orientation and places them on the board 
    createShips: function (){
        //index through each index of the vessels array
        for(var tracker = 0; tracker < vessels.length; tracker++){
            //at each index create a new object of a ship 
            var thisShip = Object.create(ship)
            //and the attributes that go along with a ship 
            thisShip.set_ship_name(vessels[tracker][0])
            thisShip.set_ship__length(vessels[tracker][1])
            thisShip.set_ship_hits()
            //generate an orientation
            var orientation = this.generate_orientation()
            //set the ship's orientation to the one generated
            thisShip.set_ship_orientation(orientation)
            //place the ship on the board 
            this.putShip(thisShip)
        }
    },


    //takes a coordinate parameter that is the user's move gives the
    // proper message and marks the box appropriately 
    makeMove: function(col, row){
        var cord = col + ',' + row
        //iterate through the list of spots that have been clicked on
        for(var tracker = 0; tracker < this.clicked_spot.length; tracker++){
            //check if the coordinate clicked on has alread been clicked on
            if(this.clicked_spot[tracker] == cord){
            //if they match, dislpay on the board 
            var message = "Oops! you already hit this spot"
            addMessage(message)
            this.update_message_count()
            //end the function 
            return
            }
        }
        //if the cordinate is  empty
        if(this.is_spot_empty_(col, row)){
            var message = 'Oh no you missed!'
            addMessage(message)
            mark = 'missed'
            markBox(cord, mark)
            this.clicked_spot.push(cord)
            this.update_message_count()
        }//if the cordinate is not empty 
        else{//go to the cordinate given 
            var letter = this.game_board[col][row]
            //index through the list of ships 
            for(var tracker = 0; tracker < this.ships.length; tracker++){
                 //get the ship wanted 
                var this_ship = this.ships[tracker]
                //get the name of that ship 
                var name = this_ship.get_name()
                var ship_letter = name.charAt(0)
                //if the same first letter as the one looking for 
                if(letter == ship_letter){
                    //check how many hits that ship has 
                    var hits = this_ship.get_hits() 
                    //decrement hits
                    hits -- 
                    //update the ship object 
                    this_ship.update_hits(hits)
                    tracker = this.ships.length
                    if(hits == 0){
                        var ship_name = this_ship.get_name()
                        message = 'You sunk ' + ship_name + '!'
                        addMessage(message)
                        markBox(cord, ship_name)
                        this.clicked_spot.push(cord)
                        this.sunk_ships ++
                        this.update_message_count()
                        //check to see if all ships have been sunk 
                        if(this.sunk_ships == vessels.length){
                            //clear the 
                            //call the game over function 
                            gamePlay.isGameOver()
                        }
                    }else{
                        var ship_name = this_ship.get_name()
                        var message = 'You hit the ' + this_ship.get_name() +'!'
                        this.clicked_spot.push(cord)
                        addMessage(message)
                        markBox(cord, ship_name)
                        this.update_message_count()
                    }
                }
            }
            
         }
        
    },
    

    //called by listner functions when a remote button is clicked
    //parses the JSON object into the right format of the parameters of makeMove
    //and calls it
    getRemoteMove: function(object){
        var xCord = object.content.coordinates[0]
        var yCord = object.content.coordinates[1]
        cordMessage(xCord, yCord)
        //convert the xcord to currect value 
        ascii_col = xCord.charCodeAt(0)
        col = ascii_col - 65
        //convert ycord to correct value 
        var row = yCord - 1 

        //call make move 
        this.makeMove(row, col)


    }
};