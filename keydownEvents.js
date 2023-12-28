import {
    init,
    stopLoop,
    startLoop,
    isValid,
    placeTetromino,
    rotateTetromino,
    draw,
    tetromino,    
    // isPaused,
} from './main.js';
import { btnRestart } from './utils.js';


// Keydown events

let isPaused = false;
document.addEventListener('keydown', onKeyDown)
btnRestart.addEventListener('click', function(){
    init();
});

// Створює паузу у грі
function togglePauseGame(){
    isPaused = !isPaused;

    if (isPaused){
        stopLoop();
    }else{
        startLoop();
    }
    // if
}

export function onKeyDown(event){
    // console.log(event);
    if (event.key == 'p'){ 
        togglePauseGame();
     }
    //  event.key =='p'
    if(isPaused){
        return
    }

    switch(event.key){
        case ' ':
            dropTedrotrominoDown();
            break;
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

export function dropTedrotrominoDown(){
    while(!isValid()){
        tetromino.row++;

    }
    tetromino.row--;
}

export function moveTetrominoDown() {
    tetromino.row += 1;
    if (isValid()) {
        tetromino.row -= 1;
        placeTetromino();
        return;
    }
    draw();
}
export function moveTetrominoLeft(){
    tetromino.column -= 1;
     if(isValid()){
        tetromino.column += 1;       
     }
}
export function moveTetrominoRight(){
    tetromino.column += 1;
     if(isValid()){
        tetromino.column -= 1;        
     }
}
