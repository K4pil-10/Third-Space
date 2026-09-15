let principal = document.getElementById("principal");

let time = document.getElementById("time");

let rate = document.getElementById("rate");

let form = document.getElementById("interest_form");

let clear_btn = document.getElementById("clear");

let interest = document.getElementById("interest");

let amt= document.getElementById("amount");

form.addEventListener("submit", calc_Interest);

clear_btn.addEventListener("click", clear_calc);

function calc_Interest(event){
    event.preventDefault();
    let p = Number(principal.value);
    let t = Number(time.value);
    let r = Number(rate.value);

    let simple_interest = (p * t * r) / 100;
    let total_amt = p + simple_interest;

    interest.innerText = simple_interest.toFixed(2)
    amt.innerText = total_amt.toFixed(2);
}

function clear_calc(){
    principal.value = "";
    rate.value = "";
    time.value = "";

    interest.innerText = "0";
    amt.innerText = "0";
}