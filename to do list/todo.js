let currentDate = new Date();

let completedDays=JSON.parse(
    localStorage.getItem("completedDays")
)||{};

let missedDays=JSON.parse(
    localStorage.getItem("missedDays")
)||{};

let tasks = JSON.parse(
    localStorage.getItem("tasks")
) || [];

function addTask(){

    const input = document.getElementById("search");
    const taskName = input.value.trim();

    if(taskName === ""){
        alert("Please enter a task");

        return;
    }

    const task = {
        id:Date.now(),
        name: taskName,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();
    input.value = "";

}


function displayTasks(){
    const list= document.getElementById("list");

    const empty = document.getElementById("empty");

    list.innerHTML = "";

    if (tasks.length ===0){
        empty.style.display ="block";
        return;
    }

    empty.style.display ="none";

    tasks.forEach(function(task) {
       const li = document.createElement("li");
       li.classList.add("task-item");
       if (task.completed) {
        li.classList.add("completed");
       }

       const taskName = document.createElement("span");
       taskName.classList.add("task-name");

       taskName.textContent = task.name;
       const buttons = document.createElement("div");
       buttons.classList.add("task-buttons");
       const completeButton = document.createElement("button");

completeButton.classList.add("complete-task");
completeButton.textContent = task.completed ? "Undo" : "Done";

completeButton.onclick = function(){
        completeTask(task.id);
       };
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-task");

      deleteButton.textContent = "Delete";

      deleteButton.onclick = function(){
        deleteTask(task.id);
      };

      buttons.appendChild(
        completeButton
      );
      buttons.appendChild(
        deleteButton
      );

      li.appendChild(taskName);
      li.appendChild(buttons);
      list.appendChild(li);
    });
}

function completeTask(id){
    tasks.forEach(function(task){
        if (task.id === id){
            task.completed = !task.completed;
        }
    });
    saveTasks();
    displayTasks();
}


function deleteTask(id){
    tasks= tasks.filter(function(task)
{
    return task.id !== id;
});

saveTasks();
displayTasks();
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function createCalender() {
    const date = document.getElementById("date");
    const title = document.getElementById("title");

    date.innerHTML ="";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = currentDate.toLocaleString(
        "default",{
            month: "long"
        }
    );

    title.textContent = monthName + " " + year;

    const firstDay = new Date(year,month,1).getDay();

    const daysInMonth = new Date(year, month + 1,0).getDate();

    for(let i=0;i<firstDay;i++){
        const empty = document.createElement("div");
        empty.classList.add("day","empty");
        date.appendChild(empty);
    }

    for( let day = 1; day <= daysInMonth; day++){
        const dayBox = document.createElement("div");
        dayBox.classList.add("day");

        const number = document.createElement ("span");

        number.classList.add("day-number");

        number.textContent = day;
        dayBox.appendChild(number);

        const dateKey = year +"-" +
        String(month + 1).padStart(2,"0") + "-" +

        String(day).padStart(2,"0");

        if (completedDays[dateKey]){
            dayBox.classList.add("completed");
        }

        if (missedDays [dateKey]){

            dayBox.classList.add("missed");
        }
const today = new Date();
        const todayKey = today.getFullYear() + "-" +
        String(
            today.getMonth() +1
        ).padStart(2,"0") + "-" +

        String(
            today.getDate()
        ).padStart(2,"0");

        if (dateKey === todayKey ){
            dayBox.classList.add("today");
        }
    

    dayBox.onclick = function(){
        if( completedDays[dateKey]){
            delete completedDays[dateKey];

            missedDays[ dateKey] = true;
        }

        else if ( missedDays [dateKey]){
            delete missedDays[dateKey];
        }
        else{
            completedDays[dateKey] = true;
        }
        saveCalender();
        createCalender();
        updateStats();
    };
    date.appendChild(dayBox);
}}

function saveCalender(){
    localStorage.setItem("completedDays", JSON.stringify(completedDays));
    localStorage.setItem("missedDays", JSON.stringify(missedDays));
}


function updateStats(){
    const completed = Object.keys(completedDays).length;
    document.getElementById("total").textContent=completed;

    const totalTracked = Object.keys(completedDays).length + Object.keys(missedDays).length;

    let percentage = 0;

    if (totalTracked > 0){
        percentage = Math.round(
            (
                completed / totalTracked
            ) * 100
        );
    }

    document.getElementById("rate").textContent = percentage + "%";

    const dates = Object.keys( completedDays).sort();

    let bestStreak = 0;
    let streak = 0;

    for (let i=0;i<dates.length;i++){
        if(i===0){
            streak = 1;
        }
        else{
            const previous = new Date(dates[i - 1]);
            const current = new Date(dates[i]);
            const difference = (current - previous)/(1000*60*60*24);
            if (difference === 1) {
                streak++;
            }
            else{
                streak = 1;
            }
        }

        if(streak > bestStreak){
            bestStreak=streak;
        }
    }

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0,0,0,0);

    while (true){
        const key = today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate() ).padStart(2,"0");
      if (completedDays[key]){
        currentStreak++;
        today.setDate(today.getDate()-1);
      }
      else{
        break;
      }
    }

    document.getElementById("current").textContent = currentStreak;
    document.getElementById("best").textContent = bestStreak;
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth()-1);
    createCalender();
}

function nextMonth(){
    currentDate.setMonth(currentDate.getMonth()+1);
    createCalender();
}


document.getElementById("search")
.addEventListener("keydown",function(event){
    if(
        event.key === "Enter"
    ){
        addTask();
    }
});


createCalender();
updateStats();
displayTasks();