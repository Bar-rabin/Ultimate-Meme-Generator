
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
            txt: 'Second Line',
            size: 20,
            color: 'red',
            isDrag: false,

        }
    ]
}

function getMeme() {
    return gMeme
}



function setLineTxt(newText) {
    gMeme.lines[0].txt = newText
    console.log(gMeme.lines[0].txt)

}



// function isLineClicked(pos) {
//     const { x, y } = gLine
//     return pos.x >= x && pos.x <= x + gLine.width && pos.y >= y && pos.y <= y + gLine.height
// }

