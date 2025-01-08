let gLine
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
    ]
}

function createLine(pos) {
    gLine = {
        pos,
        isDrag: false
    }
}

// function createMeme(imgId, lineInx,txt, size, color) {
//   return {
//         selectedImgId: imgId,
//         selectedLineIdx: lineInx,
//         lines: [
//             {
//              txt,
//              size,
//              color,
//             }
//         ]
//     }
// }

function getMeme() {
    return gMeme
}

function getLine() {
    return gLine
}


function setLineTxt(newText) {
    gMeme.lines[0] = newText
    console.log(newText)

}

function setLineDrag(isDrag) {
    gLine.isDrag = isDrag
}

function isLineClicked(clickedPos) {
    const { pos } = gLine
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gLine.size
}

function moveLine(dx, dy) {
    gLine.pos.x += dx
    gLine.pos.y += dy

}