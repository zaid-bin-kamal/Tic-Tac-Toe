let boxes = document.querySelectorAll(".btn");
let reset = document.querySelector("#reset");
let newGame = document.querySelector("#newGame");
let winMsg = document.querySelector("#winMsg");
let won = document.querySelector(".won");
let turnO = true;

const winningPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
 
const resetGame = () => {
    turnO = true;
    enableBox();
    won.classList.add("hide");
}


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        let winner = checkWinner();

        if(!winner){
            checkDraw();
        }
    });
})

const checkWinner = () => {
    for(let pattern of winningPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1!="" && pos2 != "" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                console.log("Winner", pos1);
                disableBox();
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
}

const showWinner = (winner) => {
    winMsg.innerText = `Congratulations, ${winner} has won!`;
    won.classList.remove("hide");
}

const checkDraw = () => {
    let draw = true;
    for(let box of boxes){
        if(box.innerText === ""){
            draw = false;
        }
    }
    if(draw){
        winMsg.innerText = `Game Drawn!`;
        won.classList.remove("hide");
    }
}

const disableBox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);