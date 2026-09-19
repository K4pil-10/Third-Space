let bmiForm = document.getElementById("bmi_form");
let clearBtn = document.getElementById("clearBtn");

let bmiValue = document.getElementById("bmiValue");

let category = document.getElementById("category");


bmiForm.addEventListener("submit", function(event){
    event.preventDefault();

    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);

    let height_in_meters = height / 100;
    let bmi_formula = weight / (height_in_meters * height_in_meters); // height_in_meters ^2;
    bmiValue.textContent = bmi_formula.toFixed(2);

    if (bmi_formula < 18.5){
        category.textContent = "Under-Weight";
    }

    else if (bmi_formula < 25){
        category.textContent = "Normal weight";
    }

    else if (bmi_formula < 30){
        category.textContent = "Over-Wight";
    }

    else{
        category.textContent = "Obesity";
    }
});


clearBtn.addEventListener("click", function(){
    bmiForm.reset();
    bmiValue.textContent = "--";
    category.textContent = "Enter your details above";
});