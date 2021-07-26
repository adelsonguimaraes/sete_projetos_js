let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

const screen = document.querySelector('#tela');
const ctx = screen.getContext('2d');

document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

/*
    Passo a passo para desenhar no canvas:
    - Quando click do mouse ABAIXAR, ative o desenho
    - Quando o mouse se MOVER, se o desenho estiver ativado, desenhe.
    - Quando o mouse LEVANTAR, desative o modo desenho
*/
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

function colorClickEvent (e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent (e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent (e) {
    if (canDraw) drawn(e.pageX, e.pageY);
}

function mouseUpEvent () {
    canDraw = false;
}

function drawn (x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
}