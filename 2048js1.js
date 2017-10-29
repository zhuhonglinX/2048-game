
var temp = [0, 0, 0, 0, 0];
var ar = [0, 0, 0, 0];
ar[0] = [0, 0, 0, 0];
ar[1] = [0, 0, 0, 0];
ar[2] = [0, 0, 0, 0];
ar[3] = [0, 0, 0, 0];

function flash() {
    var gameover = 0;
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            var k = i * 4 + j + 1;
            var id = "in" + k;
            var button = document.getElementById(id);
            if (ar[i][j] == 0) {
                button.value = " ";
                gameover = 1;
            }
            else
                button.value = ar[i][j];
        }
    if (gameover == 0) {
        setTimeout(function () {
            alert("Sorry! game over");
        }, 2000);

        ar = [0, 0, 0, 0];
        ar[0] = [0, 0, 0, 0];
        ar[1] = [0, 0, 0, 0];
        ar[2] = [0, 0, 0, 0];
        ar[3] = [0, 0, 0, 0];
        temp = [0, 0, 0, 0, 0];

    }
}

function getKey(e) {
    e = e || window.event;
    var keycode = e.which;
    var i, j; //行，列
    if (keycode == 38) //表示'上'
    {
        for (j = 0; j < 4; j++) {
            for (i = 0; i < 4; i++)
                temp[i] = ar[i][j];
            temp[4] = 0;

            add();
            for (i = 0; i < 4; i++)
                ar[i][j] = temp[i];
        }
        rand();
        flash();
    }
    if (keycode == 40)//表示'下'
    {
        for (j = 0; j < 4; j++) {
            for (i = 0; i < 4; i++)
                temp[3 - i] = ar[i][j];

            add();
            for (i = 0; i < 4; i++)
                ar[i][j] = temp[3 - i];
        }
        rand();
        flash();
    }
    if (keycode == 37)//表示'左'
    {
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++)
                temp[j] = ar[i][j];

            add();
            for (j = 0; j < 4; j++)
                ar[i][j] = temp[j];
        }
        rand();
        flash();
    }
    if (keycode == 39)//表示'右'
    {
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++)
                temp[3 - j] = ar[i][j];

            add();
            for (j = 0; j < 4; j++)
                ar[i][j] = temp[3 - j];
        }
        rand();
        flash();
    }

}
document.onkeyup = getKey;
/*
function listenKey(){
    if(document.addEventListener()){
        document.addEventListener("keyup",getKey,false);
    }
    else if(document.attachEvent){
        document.attachEvent("onkeyup",getKey);
    }
    else{
        document.onkeyup = getKey;
    }
}
*/
function removeblock() {
    var i;
    var times = 0;
    while (times < 3) {
        for (i = 0; i < 4; i++) {
            if (temp[i] == 0) {
                temp[i] = temp[i + 1];
                temp[i + 1] = 0;
            }
        }
        times++;
    }
}

function add() {
    var i;
    removeblock();
    for (i = 0; i < 4; i++) {
        if (temp[i] == temp[i + 1] && temp[i] != 0) {
            temp[i] += temp[i + 1];
            temp[i + 1] = 0;
            removeblock();
            break;
        }
    }
}

function rand() {
    var i, j;
    do {
        i = Math.floor(Math.random() * 4);
        j = Math.floor(Math.random() * 4);
    } while (ar[i][j] != 0);
    ar[i][j] = (Math.random() > 0.5) ? 4 : 2;
}


