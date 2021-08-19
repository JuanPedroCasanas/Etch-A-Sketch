const html = document.querySelector('html');
const body = document.querySelector('body');
const drawingBoard = document.getElementById('drawingBoard');
const clear = document.getElementById('clear')
const eraser = document.getElementById('eraser');
const bgColorSelector = document.getElementById('bgColor');
const brushColor = document.getElementById('brushColor');
const bgColorButton = document.getElementById('bgColorButton');
const brushColorButton = document.getElementById('brushColorButton');
const rainbow = document.getElementById('rainbow');

let sketchSize = document.getElementById('sketchSize');
let sketchGrid;
let color = brushColor.value;
let bgColor = bgColorSelector.value;

sketchSize.value = 16; createGrid();
sketchSize.addEventListener('change', () => { createGrid() })
body.style.backgroundColor = hexToRGB(bgColor);
clear.addEventListener('click', clearBoard);
eraser.addEventListener('click', () => { selectMode('eraserButton') });
rainbow.addEventListener('click', () => { selectMode('rainbowButton') });
brushColorButton.addEventListener('click', () => { selectMode('colorButton') });
html.addEventListener('mouseup', toggleColor);
brushColor.addEventListener('change', () => { selectMode('colorButton') });
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


function selectBgColor() {
  bgColor = bgColorSelector.value
  let array = Array.from(drawingBoard.children)
  array.forEach((e) => {
    if (e.className == 'grid painted') {
    } else if (eraser.classList == 'clickedEraser') {
      Object.assign(e.style, {
        backgroundColor: bgColor,
        opacity: 1
      });
      color = bgColor;
    } else {
      Object.assign(e.style, {
        backgroundColor: bgColor,
        opacity: 1
      });
    }
  })
  body.style.backgroundColor = hexToRGB(bgColor);
}

function paint(e) {
  let array = Array.from(drawingBoard.children)
  array.forEach((e) => { e.addEventListener('mouseenter', paint); })
  Object.assign(e.target.style, {
    backgroundColor: colorSelector(),
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

function selectColor() {
  if (brushColorButton.classList == 'clickedBrushColorButton') {
    paint;
  } else {
    brushColorButton.classList.remove('clickedBrushColorButton');
    paint;
  }
}


function selectEraser() {
  if (eraser.classList == 'clickedEraser') {
    paint;
  } else {
    eraser.classList.remove('clickedEraser');
    paint;
  }
}


function selectRainbow() {
  if (rainbow.classList == 'clickedRainbow') {
    paint;
  } else {
    rainbow.classList.remove('clickedRainbow');
    paint;
  }
}

function createRainbow(){
  const r = Math.floor((Math.random() * 255) + 1);
  const g = Math.floor((Math.random() * 255) + 1);
  const b = Math.floor((Math.random() * 255) + 1);
  return `rgba(${r}, ${g}, ${b})`;
}


function hexToRGB(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${0.6})`;
}

function selectMode(selected) {
  switch (selected) {
    case 'colorButton':
      eraser.classList.remove('clickedEraser');
      rainbow.classList.remove('clickedRainbow');
      brushColorButton.classList.add('clickedBrushColorButton');
      selectColor();
      break;
    case 'eraserButton':
      brushColorButton.classList.remove('clickedBrushColorButton');
      rainbow.classList.remove('clickedRainbow');
      eraser.classList.add('clickedEraser');
      selectEraser()
      break;
    case 'rainbowButton':
      rainbow.classList.add('clickedRainbow');
      brushColorButton.classList.remove('clickedBrushColorButton');
      eraser.classList.remove('clickedEraser');
      selectRainbow()
      break;
  }
}

function colorSelector(){
  switch(true) {
    case (rainbow.classList == 'clickedRainbow'):
      color = createRainbow();
      return color;
      break;
    case (eraser.classList == 'clickedEraser'):
      color = bgColor;
      return color;
      break;
    case (brushColorButton.classList == 'clickedBrushColorButton'):
      color = brushColor.value;
      return color;
      break;
  }
}