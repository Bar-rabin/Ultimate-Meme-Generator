'use strict'
let gCanvasSave
let gCanvas
let gCtx
let gStartPos
let gTextSize = 20
let gCtxSave


function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')

    onResize()
    renderMeme()

}

function onResize() {
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.clientWidth - 2

}



function renderMeme() {
    var strHtml = ''

    for (var i = 0; i < 18; i++) {
        var imgId = i + 1
        strHtml += `<img id="${imgId}"onclick="selectImg(this)" src="meme-imgs (square)/${imgId}.jpg" />`
    }
    strHtml += `<img id="tall" onclick="selectImg(this)"  src='tall.jpg'/>
    `

    document.querySelector('.gallery').innerHTML += strHtml

}

function renderSave() {
    var savedMeme = loadFromStorage(STOREGE_KEY)
    if (savedMeme) {
        const elImg = new Image()
        elImg.src = savedMeme
        console.dir(elImg)


        gCanvasSave = document.querySelector('.save canvas')
        console.log(gCanvasSave)
        gCtxSave = gCanvasSave.getContext('2d')



        elImg.onload = () => {
            gCtxSave.clearRect(0, 0, gCanvasSave.width, gCanvasSave.height)
            gCtxSave.drawImage(elImg, 0, 0, gCanvasSave.width, gCanvasSave.height)
        }
    }

}


function renderCanvas(src = `meme-imgs (square)/${getMeme().selectedImgId}.jpg`) {
    const elImg = new Image()
    elImg.src = src
    console.log(elImg.src)

    elImg.onload = () => {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

        gCtx.font = `${gTextSize}px Arial`
        drawText(gMeme.lines[0].txt, gCanvas.width / 2, gCanvas.height / 16)

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

function selectImg(elImg) {
    document.querySelector('.gallery').style.display = 'none'
    const editor = document.querySelector('.editor')
    editor.style.display = 'grid'

    getMeme()

    gMeme.selectedImgId = elImg.id
    gCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gCanvas.width
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

    document.querySelector('.active').classList.toggle('active')
    document.querySelector('.edit-a').classList.toggle('active')

    renderCanvas(elImg.src)
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
    gCtx.strokeStyle = gCtx.strokeStyle || 'black'
    gCtx.fillStyle = gCtx.fillStyle || 'black'
    gCtx.font = `${gTextSize}px Arial`
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

function onDownloadCanvas(elLink) {
    const dataUrl = gCanvas.toDataURL()

    elLink.href = dataUrl
    elLink.download = 'my-perfect-meme'
}


function openColorPicker(type) {
    if (type === 'text') {

        document.getElementById('color-picker1').click()
    } else if (type === 'border') {
        document.getElementById('color-picker2').click()

    }
}

function onChangeTheColorTxt(event) {
    const selectedColor = event.target.value
    gCtx.fillStyle = selectedColor
    renderCanvas()
}


function onChangeTheColorTxtBorder(event) {
    const selectedColorBorder = event.target.value
    gCtx.strokeStyle = selectedColorBorder
    renderCanvas()
}


function onBiggerFont() {
    gTextSize += 1
    renderCanvas()
}

function onSmallerFont() {
    gTextSize -= 1
    renderCanvas()
}

function onAddLine() {
    const { secondLine } = getMeme()
    console.log(secondLine)

    drawText(secondLine[0].txt, 200, 350)
}


function onGetRandomMeme() {
    const elImg = new Image()
    let imgNum = getRandomInt(1, 19)
    elImg.id = `${imgNum}`
    elImg.src = `meme-imgs (square)/${imgNum}.jpg`

    selectImg(elImg)
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
    let buttonX = `<button class="btn-x" onclick="closeMenu()" type="button">X</button>
    `
    document.querySelector('.main-nav').innerHTML += buttonX
}

function closeMenu() {
    document.body.classList.toggle('menu-open')

}
function onSaveMeme() {
    const meme = gCanvas.toDataURL()
    saveMeme(meme)
}



function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function moveToSave() {
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.save').style.display = 'grid'


    renderSave()
}

function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)


    }

    uploadImg(canvasData, onSuccess)
}

function onImgInput(ev) {
    loadImageFromInput(ev, selectImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = function (event) {
        const img = new Image()
        img.onload = () => {
            onImageReady(img)
        }
        console.log(img.src)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}


function moveToGallery(elAGallery) {
    elAGallery.classList.toggle('active')
    document.querySelector('.gallery').style.display = 'grid'
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.edit-a').classList.toggle('active')

}