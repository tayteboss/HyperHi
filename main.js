const cursor = document.querySelector(".cursor")
const canvasIn = document.querySelector("canvas.in")
const canvasOut = document.querySelector("canvas.out")

let isMouseDown = false


// when clicked down, make curser bigger
function growCurser() {
    cursor.classList.add("is-down")
}

// move the curser based on coordinates
function moveCurser(x, y) {
    cursor.style.left = x + "px"
    cursor.style.top = y + "px"
}

// set up canvas
function setupCanvas(canvas) {
    const bodyTag = document.querySelector("body")

    const w = window.innerWidth
    const h = window.innerHeight
    // const h = bodyTag.offsetHeight
    const dpi = window.devicePixelRatio

    canvas.width = w * dpi
    canvas.height = h * dpi
    canvas.style.width = w + "px"
    canvas.style.height = h + "px"

    // which context? 2D or 3D
    const context = canvas.getContext("2d")
    context.scale(dpi, dpi)

    if(canvas.classList.contains("in")) {
        context.fillStyle = "#000000"
        context.strokeStyle = "#ffffff"
    } else {
        context.fillStyle = "#ffffff"
        context.strokeStyle = "#000000"
    }

    context.lineWidth = 80
    context.lineCap = "round"
    context.lineJoin = "round"

    context.shadowBlur = 40
    context.shadowColor = context.strokeStyle

    context.rect(0, 0, w, h)
    context.fill()
}  

// start to draw based on canvas & x, y
function startDraw(canvas, x, y) {
    const context = canvas.getContext("2d")
    // const colors = ["red", "yellow", "blue", "green"]
    // const randomNum = Math.floor(Math.random() * colors.length)

    // context.strokeStyle = colors[randomNum]

    context.moveTo(x, y)
    context.beginPath()
}

// draw based on canvas, x & y
function moveDraw(canvas, x, y) {
    const context = canvas.getContext("2d")
    // context.rect(x - 30, y - 20, 60, 40)
    // context.fill()
    if(isMouseDown) {
        context.lineTo(x, y)
        context.stroke()    
    }

}

setupCanvas(canvasIn)
setupCanvas(canvasOut)

// when clicked up, make curser smaller
function shrinkCurser() {
    cursor.classList.remove("is-down")
}

document.addEventListener("mousedown", function(e) {
    isMouseDown = true
    growCurser()
    startDraw(canvasIn, e.pageX, e.pageY)
    startDraw(canvasOut, e.pageX, e.pageY)
})

document.addEventListener("mouseup", function() {
    isMouseDown = false
    shrinkCurser()
})

document.addEventListener("mousemove", function(e) {
    //e.pageX - where we are on the page across
    //e.pageY - where we are on the page downwards
    moveCurser(e.pageX, e.pageY)
    moveDraw(canvasIn, e.pageX, e.pageY)
    moveDraw(canvasOut, e.pageX, e.pageY)
})

window.addEventListener("resize", function() {
    setupCanvas(canvasIn)
    setupCanvas(canvasOut)
})