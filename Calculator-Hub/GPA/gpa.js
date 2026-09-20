let subjects = document.getElementById("subjects");

let addSub_btn = document.querySelector(".add_subject_btn");

let calcGpa_btn = document.querySelector(".calc_gpa_btn");

let clearAll_btn = document.querySelector(".clear_all_btn");

let gpa_display = document.getElementById("gpa");

let message = document.getElementById("message");

function get_grade_point(marks){
    if (marks >= 90){
        return 4.00;
    }

    else if (marks >= 80){
        return 3.60;
    }

    else if (marks >= 70){
        return 3.20;
    }

    else if (marks >= 60){
        return 2.80;
    }

    else if (marks >= 50){
        return 2.40;
    }

    else if (marks >= 40){
        return 2.00;
    }

    else if (marks >=35){
        return 1.60;
    }

    if (marks <35){
        hasFailedSubject = true;
    }
}

calcGpa_btn.addEventListener("click", function (){
    let marks_input = document.querySelectorAll(".marks");

    let total_Grade_points = 0;
    let valid_subs = 0;
    let failed = false;
    
    marks_input.forEach(function (input){
        let marks = Number(input.value);

        if (input.value === ""){
            input.style.borderColor = "#d00000";
            failed = true;
            return;
        }

        if (marks < 0 || marks > 100 || isNaN(marks)){
            input.style.borderColor = "#d00000";
            failed =true;
            return;
        }

        input.style.borderColor = "#212529";
        
        let grade_point = get_grade_point(marks);

        total_Grade_points += grade_point;
        valid_subs++;
    });

    if (failed || valid_subs === 0){
        gpa_display.textContent = "--";
        message.textContent = "Please enter valid marks for all subjects";

        return;
    }

    let gpa = total_Grade_points / valid_subs ;

    gpa_display.textContent = gpa.toFixed(2);

    if (gpa >= 3.60){
        message.textContent = "Excellent! Keep it up. Great Work."
    }

    else if (gpa >= 3.20){
        message.textContent = "Very Good! You are doing well.";
    }

    else if (gpa >= 2.80){
        message.textContent = "Good! Keep improving";
    }

    else if (gpa > 2.40){
        message.textContent = "Nice Effort! You can improve further."
    }

    else if (gpa >= 2.00){
        message.textContent = "Keep Working hard to improve your GPA.";
    }

    else if (gpa >= 1.60){
        message.textContent ="You Passed, but need more improvements."
    }

    else{
        message.textContent = "Some subjects are below the passing grade.";
    }
});


addSub_btn.addEventListener ("click", function(){
    let subject_cnt =document.querySelectorAll(".subject").length + 1;

    let new_sub = document.createElement("div");

    new_sub.classList.add("subject");

  new_sub.innerHTML = `
    <div class="subject_top">
        <input type="text" class="subject_name" value="Subject ${subject_cnt}" placeholder="Subject Name">
        <button class="clear_subject">Clear</button>
        </div>
        <input type="number" class="marks" placeholder="Enter marks" min="0" max="100" id="Subject${subject_cnt}">
    `;

    subjects.querySelector(".btn_container").before(new_sub);
});

subjects.addEventListener("click", function (event){
    if (event.target.classList.contains("marks")){
        event.target,style.borderColor = "#212529"
    }
});


clearAll_btn.addEventListener("click", function(){
    let marks_input = document.querySelectorAll(".marks");

    marks_input.forEach(function(input){
        input.value= "";
        input.style.borderColor = "#212529"
    });
    gpa_display.textContent ="--"

    message.textContent = "Enter your subjects marks above";
});
