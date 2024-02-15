 /*Selecionar objetos*/
 const cellElements = document.querySelectorAll("[data-cell]");
 const board = document.querySelector("[data-board]");
 const messageTextElement = document.querySelector("[data-message-text]");
 const message = document.querySelector("[data-message]");
 const restartButton = document.querySelector("[data-restart-button]");
 
 const start = document.querySelector("[data-start]");
 const startButton = document.querySelector("[data-start-button]");
 
 let isCircleTurn;
 
  
   
 /*Combinações de vitória*/
const winningCombinations = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6],	
];
 var n=0;
 /*Iniciar jogo*/
 const startGame = () =>{
	 
	 if(n==0){
		 start.classList.add("start");
		 board.classList.add("board-noshow");	
		 n=n+1;
	 }
	 else{
		 start.classList.add("start-disabled");	
		 board.classList.remove("board-noshow");	
		 isCircleTurn=false;	
	 /*Permitir escolher a posição uma unica vez*/
	 for(const cell of cellElements){
		cell.classList.remove("o");
		cell.classList.remove("x");	
		cell.removeEventListener("click",handleClick);
		cell.addEventListener("click", handleClick, {once: true});
	}
	
	/*Definir primeiro jogado com X*/
	
	setBoardHoverClass();
	message.classList.remove("show-message");
	
	 }
	 
 }
 
 /*Encerrar jogo*/
 const endGame = (isDraw) =>{
	
	/*Verificar empate*/
	if(isDraw){
		messageTextElement.innerText = "Empate!";
	}
	/*Ganhador*/
	else{
		messageTextElement.innerText = isCircleTurn ? "Bola Venceu !" : "X Venceu!";
	}	
	
	/*Mostrar mensagem e botão de reiniciar*/
	message.classList.add("show-message");
	
 }
 
 
 
 
 
 /*Checar ganhador*/
 const checkForWin = (currentPlayer) =>{
	 return winningCombinations.some((combination)=>{
		 return combination.every((index)=>{
			 return cellElements[index].classList.contains(currentPlayer);
		 });
	 });
 };
 
 /*Checar empate (verificar se todas as celulas estão preenchidas)*/
 
 const checkForDraw = () =>{
	 return [...cellElements].every(cell => {
		return cell.classList.contains("x") || cell.classList.contains("o");
	 });
 }
 
 /*Adicionar*/
 const placeMark = (cell, classToAdd) =>{
	 cell.classList.add(classToAdd);
 };
 
 /*Checar e mudar jogador*/
 const setBoardHoverClass = () =>{
	 board.classList.remove("o")
	 board.classList.remove("x")
	 	
	 if(isCircleTurn){
		board.classList.add("o")
	 }
	 else{
		board.classList.add("x")
	 }
 }
 
 /*Mudar jogador*/
 const swapTurns = () =>{
	 isCircleTurn = !isCircleTurn;
	 
	 setBoardHoverClass();
 };
 
 
 const handleClick =(e) =>{
	 
	 /*Colocar o X ou O*/
	 const cell = e.target;
	 const classToAdd = isCircleTurn ? "o": "x";
	 
	 /*Marcar jogada no tabuleiro*/
	 placeMark(cell, classToAdd);
	 
	 /*Verificar vitória*/
	 const isWin = checkForWin(classToAdd);
	 	 
	 const isDraw = checkForDraw();
	 
	 if(isWin){
		 endGame(false);
	 }
	 /*Verificar empate*/
	 else if(isDraw){
		 endGame(true);
	 }
	 /*Mudar jogador*/
	 else{
		swapTurns();
	 }
	 
 }; 
 
 startGame();
 
 /*Reiniciar o jogo*/
 restartButton.addEventListener("click",startGame);
 
  