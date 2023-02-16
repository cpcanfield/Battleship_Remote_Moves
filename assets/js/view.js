///adds a given class to an element if it does not have the class 
function addClass(element, className) {
	if (element.classList)
		element.classList.add(className)
	else if (!hasClass(element, className)) element.className += " " + className
}

//removes a given class from an element if the class has it 
function removeClass(className){
	const elements = document.getElementsByClassName(className)
	const elementsArray = Array.from(elements)
	for(var i =0; i<elementsArray.length; i+=1){
		elementsArray[i].classList.remove(className)
	}
	}


function changeText(element, msg) {
	if (element !== null)
		element.innerHTML = msg;
}


//displays the user names on the game page 
function setUsername(username){
	var general = 'general '
	document.getElementById('user_name').innerHTML += general;
	document.getElementById('user_name').innerHTML += username;
}


//checks to see if an element is in a class 
function elementInClass(element, className){
	element.classList.contains(className)
}



//adds a given text message to the message div
function addMessage(msg){
	//if more messages are on the board than can fit
	if(battleship.get_message_count() % 10 == 0){
		//clear the board
		clearMessages()
	}
	const para = document.createElement('p')
	const node = document.createTextNode(msg)
	para.appendChild(node)
	const element = document.getElementById('message_board')
	element.appendChild(para)
}

//removes all messages from the message div
function clearMessages(){
	var div = document.getElementById('message_board')
	while(div.firstChild){
		div.removeChild(div.firstChild)
	}
}
function clearUserName(){
	var div = document.getElementById('user_name')
	while(div.firstChild){
		div.removeChild(div.firstChild)
}
}
//adds a mark message to a given game board box 
function markBox(element, mark){
	//get the correct box based off the element [ie the cordinate/id of the cell]
	var box = document.getElementById(element)
	//assign the class of mark to the element 
	addClass(box, mark)
}

function failureMessage(){
	var message = 'Oh no, there was an error! try that button again'
	addMessage(message)
	battleship.update_message_count()
	battleship.update_message_count()
}

function cordMessage(col, row) {
	var message = 'checking coordinates: ' + col  + row
	addMessage(message)
	battleship.update_message_count()
}