let gCanvas
let gCtx
let gStartPos

function onInitEditor() {
    renderCanvas()
}

function renderCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
}

function onSelectImg(elImg) {
    console.log('jjjj')
    getMeme()
    gMeme.selectedImgId = elImg.id
    console.log(gMeme)
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

}