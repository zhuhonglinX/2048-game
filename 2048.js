
var temp = [0, 0, 0, 0, 0];
var ar = [0, 0, 0, 0];
ar[0] = [0, 2, 0, 0];
ar[1] = [0, 0, 0, 2];
ar[2] = [0, 0, 0, 0];
ar[3] = [0, 0, 0, 0];

var tile = document.querySelector("#tile")
var tileCells = document.querySelectorAll(".tile-cell")

/**
 * up       38
 * down     40
 * left     37
 * right    39
 */
function getKey(e) {
    var code = e.keyCode
    // console.log(code)
    if (code < 37 || code > 40){
        return
    }
    calculate(code)
    setTimeout(function() {
        removeDom()
        renderNum()
    }, 50);
    createCell()
    

}

function changePosition (oldY, oldX, newY, newX) {
    // console.log("change: {} {} to {} {}".format(oldY, oldX, newY, newX))
    var oldPosition = "position-{}-{}".format(oldY+1, oldX+1)
    var newPosition = "position-{}-{}".format(newY+1, newX+1)
    for (let k = 0; k < tileCells.length; k++) {
        // console.log(tileCells[k].className)
        if (tileCells[k].className.match(oldPosition)) {
            tileCells[k].className = 'tile-cell ' + newPosition
            // console.log(newPosition)
        }
    }

}

function removeDom () {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let position = "position-{}-{}".format(i+1, j+1)
            let dom = tile.querySelectorAll("." + position)
            if (dom.length > 1) {
                tile.removeChild(dom[1])
            }
        }
    }
}

function renderNum() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (ar[i][j] != 0) {
                let position = "position-{}-{}".format(i+1, j+1)
                let dom = tile.querySelectorAll("." + position)
                let bit = 1
                if (ar[i][j] > 10) bit = 2
                else if (ar[i][j] > 100) bit = 3
                else if (ar[i][j] > 1000) bit = 4
                dom[0].innerHTML = '<div class="num bit{}">{}</div>'.format(bit, ar[i][j])
            }
        }
    }
}

function calculate(code) {
    if (code == 37) {
        for (let i = 0; i < 4; i++) {
            // 每一队列，去空
            for (let j = 0; j < 4; j++) {
                if (ar[i][j] == 0) {
                    for (let k = j; k < 4; k++) {
                        if (ar[i][k] != 0) {
                            ar[i][j] = ar[i][k]
                            ar[i][k] = 0
                            changePosition(i, k, i, j)
                            break
                        }
                    }
                }
            }   
            // 每一队列，计算
            for (let j = 0; j < 3; j++) {
                if (ar[i][j] == ar[i][j+1]) {
                    ar[i][j] += ar[i][j+1]
                    changePosition(i, j+1, i, j)
                    j++
                    while (j < 3) {
                        ar[i][j] = ar[i][j+1]
                        changePosition(i, j+1, i, j)
                        j++
                    }
                }
            }
            ar[i][3] = 0
        }
        // for (let i = 0; i < 4; i++){
        //     console.log(ar[i][0], ar[i][1], ar[i][2], ar[i][3])
        // }

    } else if (code == 38) {
        for (let j = 0; j < 4; j++) {
            // 每一队列，去空
            for (let i = 0; i < 4; i++) {
                if (ar[i][j] == 0) {
                    for (let k = i; k < 4; k++) {
                        if (ar[k][j] != 0) {
                            ar[i][j] = ar[k][j]
                            ar[k][j] = 0
                            changePosition(k, j, i, j)
                            break
                        }
                    }
                }
            }   
            // 每一队列，计算
            for (let i = 0; i < 3; i++) {
                if (ar[i][j] == ar[i+1][j]) {
                    ar[i][j] += ar[i+1][j]
                    changePosition(i+1, j, i, j)
                    i++
                    while (i < 3) {
                        ar[i][j] = ar[i+1][j]
                        changePosition(i+1, j, i, j)
                        i++
                    }
                } 
            }
            ar[3][j] = 0
        }
        // for (let i = 0; i < 4; i++){
        //     console.log(ar[i][0], ar[i][1], ar[i][2], ar[i][3])
        // }
    
    } else if (code == 39) {
        for (let i = 0; i < 4; i++) {
            // 每一队列，去空
            for (let j = 3; j >= 0; j--) {
                if (ar[i][j] == 0) {
                    for (let k = j; k >= 0; k--) {
                        if (ar[i][k] != 0) {
                            ar[i][j] = ar[i][k]
                            ar[i][k] = 0
                            changePosition(i, k, i, j)
                            break
                        }
                    }
                }
            }   
            // 每一队列，计算
            for (let j = 3; j >= 0; j--) {
                if (ar[i][j] == ar[i][j-1]) {
                    ar[i][j] += ar[i][j-1]
                    changePosition(i, j-1, i, j)
                    j--
                    while (j > 0) {
                        ar[i][j] = ar[i][j-1]
                        changePosition(i, j-1, i, j)
                        j--
                    }
                }
            }
            ar[i][0] = 0
        }
        // for (let i = 0; i < 4; i++){
        //     console.log(ar[i][0], ar[i][1], ar[i][2], ar[i][3])
        // }

    } else if (code == 40) {
        for (let j = 0; j < 4; j++) {
            // 每一队列，去空
            for (let i = 3; i >= 0; i--) {
                if (ar[i][j] == 0) {
                    for (let k = i; k >= 0; k--) {
                        if (ar[k][j] != 0) {
                            ar[i][j] = ar[k][j]
                            ar[k][j] = 0
                            changePosition(k, j, i, j)
                            break
                        }
                    }
                }
            }
            // 每一队列，计算
            for (let i = 3; i >= 0; i--) {
                if (ar[i][j] == ar[i-1][j]) {
                    ar[i][j] += ar[i-1][j]
                    changePosition(i-1, j, i, j)                    
                    i--
                    while (i > 0) {
                        ar[i][j] = ar[i-1][j]
                        changePosition(i-1, j, i, j)
                        i--
                    }
                }
            }
            ar[0][j] = 0
        }
        // for (let i = 0; i < 4; i++){
        //     console.log(ar[i][0], ar[i][1], ar[i][2], ar[i][3])
        // }
    }
}

function createCell() {
    var i, j;
    do {
        i = Math.floor(Math.random() * 4);
        j = Math.floor(Math.random() * 4);
    } while (ar[i][j] != 0);
    ar[i][j] = (Math.random() > 0.5) ? 4 : 2;
    // console.log(ar[i][j], i, j)
    var cell = document.createElement("div")
    cell.className = "tile-cell position-{}-{}".format(i+1, j+1)
    let bit = 1
    if (ar[i][j] > 10) bit = 2
    else if (ar[i][j] > 100) bit = 3
    else if (ar[i][j] > 1000) bit = 4
    cell.innerHTML = '<div class="num bit{}">{}</div>'.format(bit, ar[i][j])
    tile.appendChild(cell)
    tileCells = document.querySelectorAll(".tile-cell")
}


document.onkeydown = getKey


// 封装类似 python format 函数
String.prototype.format = function () {
    var i = 0, args = arguments
    return this.replace(/{}/g, function () {
        return typeof args[i] != 'undefined' ? args[i++] : ''
    })
}
