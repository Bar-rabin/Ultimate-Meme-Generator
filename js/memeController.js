let gCanvas
let gCtx
let gStartPos


function onInit() {
    gCanvas = document.querySelector('canvas')
    console.log(gCanvas)
    gCtx = gCanvas.getContext('2d')

    renderMeme()
    console.log(gMeme.lines[0].txt)


}
function renderMeme() {
    var strHtml = ''

    for (var i = 0; i < 18; i++) {
        var imgId = i + 1
        strHtml += `<img id=${imgId} onclick="onSelectImg(this)" src="meme-imgs (square)/${imgId}.jpg" />`
    }

    document.querySelector('.gallery').innerHTML = strHtml

}


function renderCanvas() {
    getMeme()
    const elImg = new Image()
    elImg.src = `meme-imgs (square)/${gMeme.selectedImgId}.jpg`

    elImg.onload = () => {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)


        drawText(gMeme.lines[0].txt, 200, 25)

    }


}



function onDown(ev) {
    console.log('ondown')

    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return

    setLineDrag(true)
    gStartPos = pos
    document.querySelector('canvas').style.cursor = 'grabbing'

}

function onMove(ev) {

    const { isDrag } = getLine()
    if (!isDrag) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)

    gStartPos = pos
    renderCanvas()
}


function onUp() {
    console.log('onUp')

    setLineDrag(false)
    document.querySelector('canvas').style.cursor = 'grab'
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    return pos

}

function onSelectImg(elImg) {
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.editor').style.display = 'block'
    getMeme()
    gMeme.selectedImgId = elImg.id
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

    renderCanvas()
    // drawText(gMeme.lines[0].txt, 200, 25)
}


function drawRect(text, x, y) {

    const textWidth = gCtx.measureText(text).width
    const textHeight = 20

    const padding = 10
    const rectX = x - textWidth / 2 - padding
    const rectY = y - textHeight / 2 - padding
    const rectWidth = textWidth + 2 * padding
    const rectHeight = textHeight + 2 * padding

    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight)
}

function drawText(text, x, y) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'black'
    gCtx.font = '20px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    drawRect(text, x, y)

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onSetLineTxt(text) {

    setLineTxt(text)
    renderCanvas()
}

