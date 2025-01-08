let gCanvas
let gCtx
let gStartPos


function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')

    const up = { x: gCanvas.width / 2, y: gCanvas.height / 4 }
    createLine(up)
    renderLine()
    renderMeme()

}
function renderMeme() {
    var strHtml = ''

    for (var i = 0; i < 18; i++) {
        var imgId = i + 1
        strHtml += `<img id=${imgId} onclick="onSelectImg(this)" src="meme-imgs (square)/${imgId}.jpg" />`
    }

    document.querySelector('.gallery').innerHTML = strHtml
}

function renderLine() {
    const { pos } = getLine()

    drawLine(pos.x, pos.y)
}




function drawLine(x = 125, y = 25) {
    gCtx.strokeStyle = 'black'
    gCtx.beginPath()
    gCtx.rect(x, y, 150, 50)
    gCtx.stroke()

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
    console.log('onMove')

    const { isDrag } = getLine()
    if (!isDrag) return

    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)

    gStartPos = pos
    renderLine()

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

    getMeme()
    gMeme.selectedImgId = elImg.id
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
    renderLine()

}


function drawText(text, x, y) {

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText
}

function onSetLineTxt(text) {
    getMeme()

    setLineTxt(text)
    renderMeme()
    drawText(text, 200, 50)
}

