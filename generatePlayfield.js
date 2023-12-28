// import {
//     PLAYFIELD_COLUMNS,
//     PLAYFIELD_ROWS,
// } from './utils.js';

// let playfield;
// // functions generate playfields

// export function generatePlayfield() {
//     document.querySelector('.tetris').innerHTML = '';
//     for(let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++){
//         const div = document.createElement('div');
//         document.querySelector('.tetris').append(div);

//     }

//     playfield = new Array(PLAYFIELD_ROWS)
//                     .fill()
//                     .map(()=> new Array (PLAYFIELD_COLUMNS).fill(0))
//     // console.log(playfield);
// }

// // function getRandomFigureColor() {
// //   return `#${Math.floor(Math.random() * 16777215)
// //     .toString(16)
// //     .padStart(6, 0)}`;
// // }