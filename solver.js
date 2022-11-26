var board = []
var row = []


window.onload = function(){
    makeGrid();
    var btnSolve = document.getElementById("solve");
    var btnClear = document.getElementById("clear");
    btnSolve.onclick = function(){
        if(makeJSboard()){
            solve()
            display()
        }
    btnClear.onclick = function(){
        clear()
        display()
    }
    };//function(){console.log(board)};
}

function makeGrid() {
    for(let r = 0; r < 9; r++){
        row = []
        for (let c = 0; c < 9; c++) {
            row.push('');

            let tile = document.createElement("div");
            let tileElement = document.createElement("input");

            tileElement.setAttribute("maxlength", "1");
            // tileElement.setAttribute("min", "1");
            // tileElement.setAttribute("max", "9");

            tile.id = 'T' + r.toString() + '-' + c.toString();
            tileElement.id = 'TE' + r.toString() + '-' + c.toString();
            tile.classList.add("tile");
            tileElement.classList.add("tile_element");

            if(c%3 == 2){
                tile.style.borderRightWidth = "4px";
            }
            if(r%3 == 2){
                tile.style.borderBottomWidth = "4px";
            }

            document.getElementById("board").append(tile);
            document.getElementById(tile.id).appendChild(tileElement);
        }
        board.push(row);
    }
}

function solve(){
    // if(boardIsFull()){
    //     return;
    // }
    for(let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++) {
            if(board[r][c] == ''){
                for(let guess = '1'; guess <= '9'; guess++){
                    if(isValid(guess,r,c)){
                        board[r][c] = guess.toString();
                        solve();
                        if(boardIsFull()){
                            return;
                        }
                        board[r][c] = '';
                    }
                }
                return;
            }
        }
    }
}

function isValid(guess, r, c){
    
    for(let i=0; i < 9; i++){
        
        if(i != c && guess == board[r][i]){
            return false;
        }
        //Check Col
        if(i != r && guess == board[i][c]){
            return false;
        }
        //Check Box
        let x = Math.floor(r/3) *3 + Math.floor(i/3)
        let y = Math.floor(c/3)*3 + (i%3);

        if(x != r && y!=c && guess == board[x][y]){
            return false;
        }
    }
    return true;
 }
function boardIsFull(){
    for(let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++) {
            let id = 'TE' + r.toString() + '-' + c.toString();
            if (board[r][c] > '9' || board[r][c]  < '1'){
                return false;
            }
        }
    }
    return true

}

let notify = false;
function makeJSboard(){
    for(let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++) {
            let id = 'TE' + r.toString() + '-' + c.toString();
            if (document.getElementById(id).value != '' && (document.getElementById(id).value < '1' || document.getElementById(id).value > '9')){
                notify = true;
                document.getElementById(id).value = '';
            }

            board[r][c] = document.getElementById(id).value;
    
            for(let i=0; i < 9; i++){
                if (document.getElementById(id).value == ''){
                    continue;
                }
                //Check Row
                if(i != c && board[r][c] == board[r][i]){
                    alert("Row " + (r+1).toString() + " is invalid");
                    clear();
                    return false;
                }
                //Check Col
                if(i != r && board[r][c] == board[i][c]){
                    alert("Column " + (c+1).toString() + " is invalid");
                    clear();
                    return false;
                }
                //Check Box
                var x = Math.floor(r/3) *3 + Math.floor(i/3)
                var y = Math.floor(c/3)*3 + (i%3);
                
                
                if(x != r && y!=c && board[r][c] == board[x][y]){
                    console.log(x.toString() + ',' + y.toString() +'    ' + r.toString() + ',' + c.toString())
                    alert("Box " + (Math.floor(c/3) + Math.floor(r/3)*3 + 1).toString() + " is invalid");
                    clear();
                    return false;
                }

            }
        }
    }
    if(notify){
        notify = false;
        alert("Removed all Invalid Inputs");
    }
    return true;
}

function display(){
    for(let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++) {
            let id = 'TE' + r.toString() + '-' + c.toString();
            document.getElementById(id).value = board[r][c];
        }
    }
}

function clear(){
    for(let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++) {
            board[r][c] = '';
        }
    }    
}