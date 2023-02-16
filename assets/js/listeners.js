
var file = 'http://ncnwanze.faculty.noctrl.edu/battleshipcoord.php'



//event handler that allows the game to run 
document.addEventListener('readystatechange', event =>{
	if (event.target.readyState === 'complete'){
		gamePlay.playGame()
	}
})

//event handler for when a box is clicked
document.querySelector('#game_board').addEventListener('click', event =>{
	var box = event.target.id   
	//parse the box id into a collumn and row 

	var col = box[0]
	var row = box[2]
	battleship.makeMove(col, row)

})

//event listener for when the reset button is clicked 
document.getElementById('reset_button').addEventListener('click', event =>{
	gamePlay.reset()

})

$("#XML").on('click', event =>{
	//create XHR object 
	let xhr = new XMLHttpRequest() 
	//get the coordinate from the server 
	xhr.open('GET', file )
	//send the request to the server
	xhr.send() 
	var rounds = 0
	//handle anyschronous responses from server 
	xhr.onreadystatechange = function () {
		rounds++
		//handler server errors if they are present
		if(xhr.status !== 200 && rounds == 1){
			//add message to message board 
			failureMessage()

		}else{
			//check the state and respond accordingly 
			if(xhr.readyState === 4 && xhr.status === 200){
				//call getRemoteMove
				var object = JSON.parse(`${xhr.responseText}`)
				battleship.getRemoteMove(object)
			}

		}
	}
})

$("#jQuery").on('click', event =>{
	$.get(file, data =>{
		battleship.getRemoteMove(data)
	}).fail(err => {
		failureMessage()
	})
})


$("#fetch_API").on('click', event =>{
	fetch(file)
	.then(response =>{
		return response.json()
	})
	.then(data =>{
		battleship.getRemoteMove(data)
	})
	.catch(err =>{
		failureMessage()
	})
})

