const html = document.querySelector('html');
const drawingBoard = document.getElementById('drawingBoard');
const clear = document.getElementById('clear')
const eraser = document.getElementById('eraser');
const bgColorSelector = document.getElementById('bgColor');
const brushColor = document.getElementById('brushColor');
const bgColorButton = document.getElementById('bgColorButton');
const brushColorButton = document.getElementById('brushColorButton');

let sketchSize = document.getElementById('sketchSize');
let sketchGrid;
let color = brushColor.value;
let bgColor = bgColorSelector.value;

sketchSize.value = 16; createGrid();
sketchSize.addEventListener('change', () => { createGrid() })
clear.addEventListener('click', clearBoard);
eraser.addEventListener('click', selectEraser);
bgColorButton.addEventListener('click', selectBgColor);
brushColorButton.addEventListener('click', selectColor);
html.addEventListener('mouseup', toggleColor);
brushColor.addEventListener('change', selectColor);
bgColorSelector.addEventListener('change', selectBgColor);


function createGrid() {
  document.querySelectorAll('.grid').forEach(e => e.remove());
  for (let i = (sketchSize.value * sketchSize.value); i > 0; i--) {
    sketchGrid = document.createElement('div');
    sketchGrid.classList.add('grid');
    sketchGrid.style.backgroundColor = bgColorSelector.value;
    sketchGrid.addEventListener('mousedown', paint);
    drawingBoard.appendChild(sketchGrid);
  }
  drawingBoard.style.gridTemplateColumns = `repeat(${sketchSize.value}, 1fr)`;
  drawingBoard.style.gridTemplateRows = `repeat(${sketchSize.value}, 1fr)`;
}

function selectColor() {
  color = brushColor.value;
}

function selectBgColor() {
  bgColor = bgColorSelector.value
  let array = Array.from(drawingBoard.children)
  array.forEach((e) => {
    if (e.className == 'grid painted') {

    } else {
      Object.assign(e.style, {
        backgroundColor: bgColor,
        opacity: 1
      });
    }
  })
}

function paint(e) {
  let array = Array.from(drawingBoard.children)
  array.forEach((e) => { e.addEventListener('mouseenter', paint); })
  Object.assign(e.target.style, {
    backgroundColor: color,
    opacity: 1
  });
  if (color != bgColor) {
    e.target.classList.add('painted');
    e.stopPropagation();
  } else {
    e.stopPropagation()
    e.target.classList.remove('painted');
  }
}


function toggleColor(e) {
  let array = Array.from(drawingBoard.children)
  array.forEach((e) => { e.removeEventListener('mouseenter', paint); })
}

function clearBoard() {
  let array = Array.from(drawingBoard.children)
  array.forEach((e) => {
     e.style.backgroundColor = bgColor;
     e.classList.remove('painted'); 
  })

}

function selectEraser(e) {
  if (color != bgColor) {
    color = bgColor;
  } else {
    selectColor();
  }
}