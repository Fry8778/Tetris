import{
    PLAYFIELD_COLUMNS,
    PLAYFIELD_ROWS,
    TETROMINO_NAMES,
    TETROMINOES,
    gameOverBlock,
    btnRestart,
} from './utils.js';
// import {onKeyDown}  from './keydownEvents.js';
import {moveTetrominoDown}  from './keydownEvents.js';



export let playfield,
            tetromino,
            timeoutId,
            requestId,
            cells,
            score = 0,
            isPaused = false,
            isGameOver = false;
init();


export function init(){
    gameOverBlock.style.display = 'none';
    isGameOver = false;
    generatePlayfield();
    generateTetromino();
    startLoop();
    cells = document.querySelectorAll('.tetris div');
    score = 0;
    countScore(null);

}



// functions generate playfields and tetromino

function generatePlayfield() {
    document.querySelector('.tetris').innerHTML = '';
    for(let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++){
        const div = document.createElement('div');
        document.querySelector('.tetris').append(div);

    }

    playfield = new Array(PLAYFIELD_ROWS)
                    .fill()
                    .map(()=> new Array (PLAYFIELD_COLUMNS).fill(0))
    // console.log(playfield);
}

export function generateTetromino(){
   
    const nameTetro = getRandomElement(TETROMINO_NAMES); 
    const matrixTetro = TETROMINOES[nameTetro];
    
    // const rowTetro = 3;
    const rowTetro = -2;
    const columnTetro = Math.floor(PLAYFIELD_COLUMNS / 2 - matrixTetro.length / 2);
    

    tetromino = {
        name: nameTetro,
        matrix: matrixTetro,
        row: rowTetro,
        column: columnTetro,     
    }
}

// draw

function drawPlayField(){

    for(let row = 0; row < PLAYFIELD_ROWS; row++){
       for( let column = 0; column < PLAYFIELD_COLUMNS; column++){
            // if(playfield[row][column] == 0) { continue };
            const name = playfield[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }
}

function drawTetromino (){
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for(let row = 0; row < tetrominoMatrixSize; row++){
        for(let column = 0; column < tetrominoMatrixSize; column++){
            // cells[cellIndex].innerHTML = array[row][column];            
            if(tetromino.row + row < 0) { continue }                     
            if(tetromino.matrix[row][column] == 0) { continue }   
            const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);    
            cells[cellIndex].classList.add(name); 
        }
    }
}

export function draw(){
    cells.forEach(function(cell){cell.removeAttribute('class')  
});    
    drawPlayField();
    drawTetromino();
    // console.table(playfield)
}

function countScore(destroyRows){
    switch(destroyRows){
        case 1: 
            score += 10;
            break;
        case 2: 
            score += 30;
            break;
        case 3: 
            score += 50;
            break;
        case 4: 
            score += 100;
            break;
        default: 
            score += 0;

    }
    document.querySelector('.score').textContent = 'Score:' + score;
}

function GameOver(){
    stopLoop();

    gameOverBlock.style.display = 'flex';
}


// let array = [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9],

// ]

export function getRandomElement(array){
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function convertPositionToIndex(row, column){
    return row * PLAYFIELD_COLUMNS + column;
}

function isOutsideTopBoard(row){
    return tetromino.row + row < 0;
}
export function placeTetromino(){
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){         
            if(!tetromino.matrix[row][column]) continue;            
            if(isOutsideTopBoard(row)){
                isGameOver = true;
                return;
            }
            playfield[tetromino.row + row][tetromino.column + column] = tetromino.name;
        }
    }  
    const fillRows = findFilledRows();
    // console.log(fillRows);
    removeFillRows(fillRows);
    generateTetromino();
}

function removeFillRows(filledRows){
    // {filledRows.forEach(row => {
    //     dropRowAbove(row);
    // })

    for(let i = 0; i < filledRows.length; i++){
        const row = filledRows[i];
        dropRowAbove(row);
    }
    countScore(filledRows.length);
}

function dropRowAbove(rowDelete){
    for(let row = rowDelete; row > 0; row--){
        playfield[row] = playfield[row - 1];
    }
    playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
}

function findFilledRows(){
    const filledRows = [];
    for(let row = 0; row < PLAYFIELD_ROWS; row++){
        let filledColumns = 0;
        for(let column = 0; column < PLAYFIELD_COLUMNS; column++){
            if(playfield[row][column] != 0){
                filledColumns++;
            }
        }
        if(PLAYFIELD_COLUMNS == filledColumns){
            filledRows.push(row);
        }
    }
    return filledRows;
}


function moveDown(){
    moveTetrominoDown();
    draw();
    stopLoop();
    startLoop();
    if(isGameOver){
        GameOver();
    }
}

export function startLoop(){
    timeoutId = setTimeout(
        () => (requestId = requestAnimationFrame(moveDown)),
        700
    );
}

export function stopLoop(){
    cancelAnimationFrame(requestId);
    timeoutId = clearTimeout(timeoutId);

}

export function rotateTetromino(){
    const oldMatrix = tetromino.matrix;
    const rotatedMatrix = rotateMatrix(tetromino.matrix);
    // array = rotateMatrix(array);
    tetromino.matrix = rotatedMatrix;
    if(isValid()){
        tetromino.matrix = oldMatrix;        
    }
}

function rotateMatrix(matrixTetromino){
    const N = matrixTetromino.length;
    const rotateMatrix = [];
    for(let i = 0; i < N; i++){
        rotateMatrix[i] = [];
        for (let j = 0; j < N; j++){
            rotateMatrix[i][j] = matrixTetromino[N - j - 1][i]; 
       }
    }
    return rotateMatrix;
};


export function isValid(){
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){
            if(!tetromino.matrix[row][column]){ continue }
            if(isOutsideOfGameBoard(row, column)){return true}
            if(hasCollisions(row, column)){return true}               
        }
    }
    return false;       
}

function isOutsideOfGameBoard(row, column){   
                return tetromino.column + column < 0 ||
                tetromino.column + column >= PLAYFIELD_COLUMNS ||
                tetromino.row + row >= playfield.length
}

function hasCollisions(row, column){  
            return playfield[tetromino.row + row]?.[tetromino.column + column]          
       }       
