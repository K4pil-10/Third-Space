let boxes = document.querySelectorAll(".box");

let turn = document.getElementById("turn");

let win_container= document.querySelector(".win");

let win_text = document.getElementById("wins");

let reset_btn = document.getElementById("reset_btn");

let new_game_btn = document.getElementById("new_game");

let pvp_btn = document.getElementById("pvp_btn");

let pvc_btn = document.getElementById("pvc_btn");

let level_choice = document.getElementById("level");


let turnO = false; // Player X play first;

let isPVC = false; // start with first pvp

let game_over = false;

let win_patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4 ,7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

level_choice.disabled = true;

pvp_btn.addEventListener("click", () =>{
    isPVC = false;
    pvp_btn.classList.add("active");
    pvc_btn.classList.remove("active");
    level_choice.disabled = true;
    reset_game();
});

pvc_btn.addEventListener("click", () =>{
    isPVC = true;
    pvc_btn.classList.add("active");
    pvp_btn.classList.remove("active");
    level_choice.disabled = false;
    reset_game();
});

boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        if (box.innerText !== "" || game_over || (isPVC && turnO))
            return;
        

        if (isPVC && turnO)
            return;

        let curr_player = isPVC ? "X" : (turnO ? "O" : "X");

        make_move (box, curr_player);

        if (check_winner())
            return ;

        if (isPVC && !game_over){
            setTimeout(computer_moves, 400)
        };
    });
});

function make_move(box, current_P){
    box.innerText = current_P;
    box.classList.add(current_P.toLowerCase());
    box.disabled= true;

    turnO = !turnO;
    turn.innerText = `Player ${turnO ? "O" : "X"}'s Turn `;

};

function check_winner (){
    for (let pattern of win_patterns){
        let possible_1_Val = boxes[pattern[0]].innerText;
        let possible_2_Val = boxes[pattern[1]].innerText;
        let possible_3_Val = boxes[pattern[2]].innerText;

        if (possible_1_Val !== "" && possible_1_Val === possible_2_Val && possible_2_Val === possible_3_Val){

            show_Winner(possible_1_Val,pattern)
            return true;
        }
    }

    let Is_Darw= [...boxes].every((box) => box.innerText !== "");

    if(Is_Darw){
        showDraw();
        return;
    }
    return false;
};

function show_Winner(winner, pattern){
    game_over = true;
    win_text.innerText = `Congratulations! Winner is ${winner}`;

    win_container.classList.remove("hide");

    turn.innerText= "Game-Over :)";

    pattern.forEach((index)=> boxes[index].classList.add("win-cell"));
    disabled_All_Boxes();
}

function showDraw(){
    game_over= true;
    win_text.innerText = "It's a Draw 🤝";
    win_container.classList.remove("hide");
    turn_text.innerText= "Game-Over";
}

function disabled_All_Boxes(){
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

function reset_game(){
    turnO = false;
    game_over= false;
    win_container.classList.add("hide");
    turn.innerText = "Player X's Turn";

    boxes.forEach((box) =>{
        box.innerText = "";
        box.disabled= false;
        box.className = "box colors";
    });
}

function computer_moves(){

    let chosen_index;
    let level = level_choice.value;

    let empty_indices = [...boxes].map((box, index) => (box.innerText === "" ? index : null)).filter((val) => val !== null);

    if (empty_indices.length === 0 || game_over) 
        return;

    if (level === "easy"){
        chosen_index = getRandomMove(empty_indices);
    }

    else if (level === "medium"){
        if(Math.random () > 0.5){
            chosen_index = getBestMove() ?? getRandomMove(empty_indices);
        }
        else{
            chosen_index = getRandomMove(empty_indices);
        }
    }

    else if (level === "hard"){
        chosen_index = get_best_move() ?? getRandomMove(empty_indices);
    }

    let target_box = boxes[chosen_index];
    make_move(target_box , "O");
    check_winner();
}

function getRandomMove(empty_indices){
    return empty_indices[Math.floor(Math.random() * empty_indices.length)];
}

function get_best_move(){
    for (let pattern of win_patterns){
        let move = findWinningSpot(pattern, "O");
        if (move !== null){
            return move;
        }
    }

    for (let pattern of win_patterns){
        let move = findWinningSpot(pattern, "X");
        if(move !== null){
                return move;
        }
    }

    if(boxes[4].innerText === ""){
        return 4;
    }

    let corners = [0, 2, 6, 8].filter((i) => boxes[i].innerText === "");

    if (corners.length > 0){
        return corners[Math.floor(Math.random() * corners.length)];
    }

    return null;
}

function  findWinningSpot(pattern, symbol){
    let [a, b, c] = pattern;

    let values = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];

    if (values.filter((v) => v === symbol).length === 2 && values.includes("")){
        return pattern[values.indexOf("")];
    }

    return null;
}

reset_btn.addEventListener("click", reset_game);
new_game_btn.addEventListener("click", reset_game)


//finally done now let keep it in main branch 