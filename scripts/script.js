
const resizeButton = document.querySelector('#resize');
const resetButton = document.querySelector('#clear');
const colorPicker = document.querySelector('#color-picker');
const colorValueDisplay = document.querySelector('#color-value-display');
const drawingArea = document.querySelector('#drawing-area');
const pensil = document.querySelector('#pensil');
const eraser = document.querySelector('#eraser');

let currentColor = '#000000';
let isMouseDown = false;
let isEraser = false;
let isPensil = true;

// Add event listeners to mouse

document.addEventListener('mousedown', () => isMouseDown = true);
document.addEventListener('mouseup', () => isMouseDown = false);

// Color picker logic 

colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value;
    colorValueDisplay.textContent = currentColor;
})

// Resize the grid

resizeButton.addEventListener('click', () => {
    const inputValue = document.getElementById('user-size-input');
    let sizeValue = inputValue.value;

    if (sizeValue < 0 || sizeValue > 100) {
        alert('Please enter a number from 1 to 100!');
        return;
    }
    changeSize(sizeValue);
}) 


pensil.style.color = 'rgb(88, 128, 146)';

function changeSize(size) {

    drawingArea.innerHTML = '';

    drawingArea.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    drawingArea.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (i=0;i<size*size;i++) {

        let square = document.createElement('div');

        square.setAttribute('class', 'grid')
        square.style.backgroundColor = 'white';

        square.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            if (isEraser) {
                e.target.style.backgroundColor = 'white';
            } else if (isPensil) {
                e.target.style.backgroundColor = currentColor;
            }

        })

        square.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                if (isEraser) {
                    e.target.style.backgroundColor = 'white';
                } else if (isPensil) {
                    e.target.style.backgroundColor = currentColor;
                }
            }
        })

        drawingArea.insertAdjacentElement('beforeend', square);
    }
}

// Delete all drawing

resetButton.addEventListener('click', () => {
    document.querySelectorAll('.grid').forEach(square => {
        square.style.backgroundColor = 'white';
    })  
})

// Add event listener to pensil event

pensil.addEventListener('click', (e) => {
    isPensil = true;
    isEraser = false
    e.target.style.color = 'rgb(88, 128, 146)';
    eraser.style.color = 'rgb(39, 39, 39)'
})

// Add event listener to eraser event

eraser.addEventListener('click', (e) => {
    isPensil = false;
    isEraser = true;
    e.target.style.color = 'rgb(88, 128, 146)';
    pensil.style.color = 'rgb(39, 39, 39)'
})


