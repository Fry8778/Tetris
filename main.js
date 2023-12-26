const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = [ 'O','L','J','S','Z','T','I'];

const TETROMINOES = {
    'O' : [
        [1, 1],
        [1, 1]
    ],
    'L': [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    'J': [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ],
    'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    'Z': [
        [1, 1, 0],        
        [0, 1, 1],
        [0, 0, 0],
    ],
    'T': [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ],
    'I': [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]      
    ],


};

let playfield;
let tetromino
let timeoutId;
let requestId;
let score = 0;

function getRandomElement(array){
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function convertPositionToIndex(row, column){
    return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayfield() {
    for(let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++){
        const div = document.createElement('div');
        document.querySelector('.tetris').append(div);

    }

    playfield = new Array(PLAYFIELD_ROWS)
                    .fill()
                    .map(()=> new Array (PLAYFIELD_COLUMNS).fill(0))
    // console.log(playfield);
}

// function getRandomFigureColor() {
//   return `#${Math.floor(Math.random() * 16777215)
//     .toString(16)
//     .padStart(6, 0)}`;
// }

function generateTetromino(){
    // const nameTetro = 'I';
    const nameTetro = getRandomElement(TETROMINO_NAMES); 
    const matrixTetro = TETROMINOES[nameTetro];
    
    // const rowTetro = 3;
    const rowTetro = -2;
    const columnTetro = Math.floor(PLAYFIELD_COLUMNS / 2 - matrixTetro.length / 2);
    // const columnTetro = 4;

    // const colorTetro = getRandomFigureColor();

    tetromino = {
        name: nameTetro,
        matrix: matrixTetro,
        row: rowTetro,
        column: columnTetro,

        // color: colorTetro,

    }
}

generatePlayfield();
generateTetromino();
const cells = document.querySelectorAll('.tetris div');
// console.log (cells);

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

            // cells[cellIndex].style.backgroundColor = tetromino.color;
        }
    }
}
// let array = [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9],

// ]
// drawTetromino();
startLoop();

function draw(){
    cells.forEach(function(cell){cell.removeAttribute('class')
    // cell.style.backgroundColor = "rgba(97, 75, 75, 0.2)";
});    
    drawPlayField();
    drawTetromino();
    console.table(playfield)
}

function placeTetromino(){
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){         
            if(!tetromino.matrix[row][column]) continue;            

            playfield[tetromino.row + row][tetromino.column + column] = tetromino.name;
        }
    }  
    const fillRows = findFilledRows();
    console.log(fillRows);
    removeFillRows(fillRows);
    generateTetromino();
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
}

function startLoop(){
    timeoutId = setTimeout(
        () => (requestId = requestAnimationFrame(moveDown)),
        700
    );
}

function stopLoop(){
    cancelAnimationFrame(requestId);
    timeoutId = clearTimeout(timeoutId);

}



function rotateTetromino(){
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

document.addEventListener('keydown', onKeyDown)

function onKeyDown(event){
    // console.log(event);
    switch(event.key){
        case 'ArrowUp':
            rotateTetromino();
            break;
        case 'ArrowDown':
            moveTetrominoDown();
            break;
        case 'ArrowLeft':
            moveTetrominoLeft();
            break;
        case 'ArrowRight':
            moveTetrominoRight();
            break;
    }
    draw();
}

function moveTetrominoDown() {
    tetromino.row += 1;
    if (isValid()) {
        tetromino.row -= 1;
        placeTetromino();
        return;
    }
    draw();
}
function moveTetrominoLeft(){
    tetromino.column -= 1;
     if(isValid()){
        tetromino.column += 1;       
     }
}
function moveTetrominoRight(){
    tetromino.column += 1;
     if(isValid()){
        tetromino.column -= 1;        
     }
}

function isValid(){
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
