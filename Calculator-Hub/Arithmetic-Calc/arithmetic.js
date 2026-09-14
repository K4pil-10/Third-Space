let display = document.getElementById("display");

let buttons = document.querySelectorAll("[data-value]");

let equals = document.getElementById("equals");

let clear = document.getElementById("clear");

let backspace = document.getElementById("backspace");

buttons.forEach(button =>{
    button.addEventListener("click", ()=>{
        display.value += button.dataset.value;
    });
});

equals.addEventListener("click", ()=>{
    try{
        display.value = eval(display.value);
    }

    catch{
        display.value = "Error";
    }
});

clear.addEventListener("click", ()=>{
    display.value = "";
});

backspace.addEventListener("click", () =>{
    display.value = display.value.slice(0,-1);
});


