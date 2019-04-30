const cursor = document.querySelector("div.cursor")
const canvasIn = document.querySelector("canvas.in")
const canvasOut = document.querySelector("canvas.out")

let isMouseDown = false

// when i hold the mouse down, make the cursor bigger
const growCursor = function () {
  cursor.classList.add("is-down")
}

// when i let go of the mouse, make the cursor smaller
const shrinkCursor = function () {
  cursor.classList.remove("is-down")
}

// move the cursor based on coordinates
const moveCursor = function (x, y) {
  cursor.style.left = x + "px"
  cursor.style.top = y + "px"
}

// set up a canvas
const setupCanvas = function (canvas) {
  const w = window.innerWidth
  const h = window.innerHeight
  const dpi = window.devicePixelRatio
  
  canvas.width = w * dpi
  canvas.height = h * dpi
  canvas.style.width = w + "px"
  canvas.style.height = h + "px"
  
  // which context are we talking about? 2d? 3d? something else?
  const context = canvas.getContext("2d")
  context.scale(dpi, dpi)
  
  
  if (canvas.classList.contains("in")) {
    context.fillStyle = "#000000"
  	context.strokeStyle = "#ffffff"
  } else {
    context.fillStyle = "#ffffff"
	  context.strokeStyle = "#000000"
  }
  
  context.lineWidth = 80
  context.lineCap = "round"
  context.lineJoin = "round"
  
  context.shadowBlur = 10
  context.shadowColor = context.strokeStyle
    
  context.rect(0, 0, w, h)
  context.fill()
}

// lets start to draw, based on the canvas, x and y
const startDraw = function (canvas, x, y) {
  const context = canvas.getContext("2d")
  
//   const colors = ["red", "yellow", "blue", "green"]
//   const randomNum = Math.floor(Math.random() * colors.length)
  
//   context.strokeStyle = colors[randomNum]
  
  context.moveTo(x, y)
  context.beginPath()
}

// lets draw based on three things, canvas, x and y
const moveDraw = function (canvas, x, y) {
  const context = canvas.getContext("2d")
  
  if (isMouseDown) {
    context.lineTo(x, y)
  	context.stroke()
  }
  
}






setupCanvas(canvasIn)
setupCanvas(canvasOut)

document.addEventListener("mousedown", function (event) {
  isMouseDown = true
  growCursor()
  startDraw(canvasIn, event.pageX, event.pageY)
  startDraw(canvasOut, event.pageX, event.pageY)
})

document.addEventListener("mouseup", function () {
  isMouseDown = false
  shrinkCursor()
})

document.addEventListener("mousemove", function (event) {
  console.log(event)
  // event.pageX -> where we are on the page across
  // event.pageY -> where we are on the page downwards
  moveCursor(event.pageX, event.pageY)
  moveDraw(canvasIn, event.pageX, event.pageY)
  moveDraw(canvasOut, event.pageX, event.pageY)
})

window.addEventListener("resize", function () {
  setupCanvas(canvasIn)
  setupCanvas(canvasOut)
})
