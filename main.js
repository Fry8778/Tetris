const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINOES = {
    'O' : [
        [1, 1]
        [1, 1]
    ],
    'L': [
        [0, 0, 1]
        [1, 1, 1]
        [0, 0, 0]
    ]
};

let playfield;
let playtetromino;


function generatePlayfield() {
    for(let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++){
        const div = document.createElement('div');
        document.querySelector('.tetris').append('div');

    }

    playfield = new Array(PLAYFIELD_ROWS).fill()
                    .map(()=> new Array (PLAYFIELD_COLUMNS).fill(0))


    console.log(playfield);
}

function generateteTetromino(){
    const nameTetro = '0';
    const matrixTetro = TETROMINOES[name];

    const columnTetro = 5;
    const rowTetro = 3;

    tetromino = {
        name:nameTetro;
        martix:matrixTetro;
        row:rowTetro;
        column:columnTetro;

    }
    


generatePlayfield();
generateteTetromino();

function generateteTetromino(){
    
}

function drawTetromino (){
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.martix.length;

    for(let row = 0; row  < tetrominoMatrixSize; row++){
        for(let column = 0; column < tetrominoMatrixSize; column++)
        

        const cellImIndex = convertPositionToIndex(tetromino.
            row + row, tetromino.column + column);    
            cells[cellImIndex].classList.add(name); 
    }


}
drawTetromino();

function draw (){
    cells.forEach(function(cell){cell.removeAttribute})
    drawTetromino();
}

document.addEventListener('keydown', onKeyDown)

function onKeyDown(event) {
    // console.log(event);
    switch(event.key){
        case 'ArrowDrow':
            // console.log ('ArrowLeft');
            moveTetrpminoDawn();
                break;
    }


}

function moveTetrpminoDawn(){
    tetromino.row += 1 ;
     drawTetromino

}


function isOutsideOfGameBoard(){
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){
            if(
                tetromino.column + column < 0 ||
                tetromino.column + column >= PLAYFIELD_COLUMNS
                tetromino.row + row >= playfield.length
                ){
                return true;

            }
        }
    }
}       
    return false;
}

function placeTetromino(){
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){
            if(!tetromino.martix[row][column]) continue;

        }


    }  
generateteTetromino();
}