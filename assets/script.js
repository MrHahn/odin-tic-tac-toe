function Players(){
    const players = [
        {
            name: "Player One",
            token: 1 
        },
        {
            name: "Player Two",
            token: 2
        }
    ]

    let activePlayer = players[0];
    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    return {getActivePlayer, switchPlayer}
}

function Game(){
    let gameOver = false;
    const players = Players();
    const board = [];

    const boardSetup = () => {
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push(null);
            }
        }
    }
    const getBoard = () => board;

    const resetGameStatus = () => {
        if(gameOver === true){
            gameOver = false;
        }
    };

    const placeMark = (row, col, player = players.getActivePlayer()) => {
        if(gameOver == false){
            if(row < 3 && col < 3){
                if(board[row][col] == null){
                    board[row][col] = player.token;
                    console.table(board);
                    checkWin(board);
                    players.switchPlayer();
                }else{
                    alert('place is already taken');
                }
            }else{
                alert('invalid number, please try again');
            }
        }else{
            alert('the game is over, start a new game');
        }
    }

    const checkWin = (board, player = players.getActivePlayer()) => {
        for(let i = 0; i < 3; i++){
            if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]){
                console.log(`${player.name} wins`);
                announceWinner(player.name);
                return;
            }else if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i]){
                console.log(`${player.name} wins`);
                announceWinner(player.name);
                return;
            }else if (board[1][1] && board[1][1] === board[0][0] && board[0][0] === board[2][2]){
                console.log(`${player.name} wins`);
                announceWinner(player.name);
                return;
            }else if (board[1][1] && board[1][1] === board[0][2] && board[0][2] === board[2][0]){
                console.log(`${player.name} wins`);
                announceWinner(player.name);
                return;
            }
        }
    }

    const announceWinner = (name) => {
        const message = document.querySelector('.message');
        message.textContent = `${name} wins the game`;
        gameOver = true;
    }

    return {getBoard, placeMark, boardSetup, resetGameStatus };
}

function GameHandler(){
    const game = Game();
    const players = Players();
    const gameBoard = game.getBoard();
    const gameTable = document.querySelector('.game-table');
    const resetBtn = document.querySelector('.reset');
    game.boardSetup();

    for(let [rowIndex, row] of gameBoard.entries()){
        for(let [colIndex, cell] of row.entries()){
            let cellButton = document.createElement('button');
            cellButton.setAttribute('data-cell', `${rowIndex}, ${colIndex}`);
            cellButton.textContent = cell;
            gameTable.appendChild(cellButton);

            cellButton.addEventListener('click', placeVisualMark);
        }
    }

    function placeVisualMark(){
        let cellCoord = this.dataset.cell;
        let cellCoordArr = cellCoord.split(',');
        let x = parseInt(cellCoordArr[0]);
        let y = parseInt(cellCoordArr[1]);
        game.placeMark(x, y);
        updateBoard(this);
    }

    let resetBoard = () => {
        const cellButtons = document.querySelectorAll('button[data-cell]');
        cellButtons.forEach(item => {item.textContent = ''});
    }

    const updateBoard = (item) => {
        let cellCoord = item.dataset.cell;
        let cellCoordArr = cellCoord.split(',');
        let x = parseInt(cellCoordArr[0]);
        let y = parseInt(cellCoordArr[1]);

        for(let [rowIndex, row] of gameBoard.entries()){
            for(let [colIndex, cell] of row.entries()){
                if (rowIndex === x && colIndex === y){
                    if (cell === 1){ item.textContent = "X"};
                    if (cell === 2){ item.textContent = "O"};
                }
            }
        }
    }

    function resetGame (){
        let message = document.querySelector('.message');
        game.boardSetup();
        resetBoard();
        game.resetGameStatus();
        message.textContent = '';
    }

    resetBtn.addEventListener('click', resetGame);
    
}

GameHandler();