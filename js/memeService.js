'use strict'

const STOREGE_KEY = 'memes'

let gSaveMeme

let gLine = {
    x: 125,
    y: 25,
    width: 150,
    height: 50,
    isDrag: false
}
let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red',
            isDrag: false
        }
    ],
    secondLine: [
        {
            txt: 'second Line',
            size: 20,
            color: 'red',
            isDrag: false,

        }
    ]
}


function getSaveMeme() {
    return gSaveMeme
}



function getMeme() {
    return gMeme
}

function getLine() {
    return gLine
}


function setLineTxt(newText) {
    gMeme.lines[0].txt = newText
    console.log(gMeme.lines[0].txt)

}

function setLineDrag(isDrag) {
    gLine.isDrag = isDrag
}

function isLineClicked(pos) {
    const { x, y } = gLine
    return pos.x >= x && pos.x <= x + gLine.width && pos.y >= y && pos.y <= y + gLine.height
}

function moveLine(dx, dy) {
    gLine.x += dx
    gLine.y += dy

}


function saveMeme(meme) {
    saveToStorage(STOREGE_KEY, meme)
}
