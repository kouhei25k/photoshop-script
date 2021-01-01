//@target photoshop



function openFile(name) {
    const fileName = name
    try {
        var fObj = new File("~/Desktop/photoshop/" + fileName + ".jpg");
        open(fObj);
    } catch (e) {
        alert("失敗！");
    }
}

const width = 157;
const height = 89;

function rangeClip(x, y) {

    const baseX = x;
    const baseY = y;
    const topRight = [baseX, baseY];
    const topLeft = [baseX + width, baseY];
    const bottomLeft = [baseX, baseY + height];
    const bottomRight = [baseX + width, baseY + height];

    const range = [topRight, topLeft, bottomRight, bottomLeft];

    $.writeln(range)
    try {
        activeDocument.selection.select(range, SelectionType.REPLACE, 0, true);
        activeDocument.selection.invert();
        activeDocument.selection.clear();
        activeDocument.selection.deselect();
    } catch (e) {

        alert("選択範囲の切り抜きが出来ませんでした")
    }
}


const x = 54
const y = 59


function layerCopy() {
    var layerObj = activeDocument.activeLayer; // アクティブレイヤー
    layerObj.duplicate();
};

function movingToTopLeft() {
    layObj = activeDocument.activeLayer.bounds;
    x1 = parseInt(layObj[0]);
    y1 = parseInt(layObj[1]);
    x2 = parseInt(layObj[2]);
    y2 = parseInt(layObj[3]);

    activeDocument.activeLayer.translate(-x1, -y1);
}

openFile("layout")
pastNewImage("61")
a()
layersResize()

function a() {
    for (i = 0; i < 5; i++) {
        layerCopy()

    }
    // コピー元レイヤー削除
    activeDocument.activeLayer = activeDocument.layers[5];
    activeDocument.activeLayer.remove()

    const frameWeight = 3
    var anchorY = y
    for (i = 0; i < 5; i++) {
        activeDocument.activeLayer = activeDocument.layers[i];
        rangeClip(x, anchorY)
        movingToTopLeft()
        activeDocument.activeLayer.translate(105, 284);
        anchorY += (height - 3)
        $.writeln(anchorY)
    }
}





function pastNewImage(fileName) {
    const name = fileName
    openFile(name)
    activeDocument.selection.selectAll();
    activeDocument.activeLayer.copy();
    activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    activeDocument.paste();
    movingToTopLeft()
}

function layersResize() {

    for (i = 0; i < 5; i++) {
        activeDocument.activeLayer = activeDocument.layers[i];
        activeDocument.activeLayer.resize(1190, 1190, AnchorPosition.TOPLEFT);
    }


}