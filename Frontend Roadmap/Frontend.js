const phases = [
    {
        title : "Html and Css + Projects",
        start: "2027-01-01",
        end: "2027-01-30",
        topics:[ 
            "HTML basics",
            "Semantic HTML",
            "Forms",
            "CSS basics", 
            "Flexbox", 
            "CSS Grid",
            "Responsive design",
            "CSS animations",
            "Portfolio structure",
            "Hero section", 
            "About and Skills",
            "Projects section", 
            "Contact section",
            "Accessibility", 
            "SEO",
            "Portfolio project" 
        ]
        

    },

    {
        title: "Bootstrap and Taileind Css",
        start: "2027-02-01",
        end: "2027-02-15",
        topics: [ 
            "Bootstrap basics", 
            "Bootstrap grid",
             "Bootstrap components", 
             "Responsive layouts", 
             "Tailwind basics",
              "Tailwind utilities",
               "Responsive classes", 
               "Responsive UI project" 
            ]

    },

    {
        title: "Javascript",
        start: "2027-02-16",
        end: "2027-03-30",
        topics:[
            "Javascript basics",
            "Variables and data types",
            "Operators",
            "Loops",
            "Functions",
            "Arrays",
            "Objects",
            "Events",
            "Dom Manipulation",
            "ES6 features",
            "Forms",
            "Fetch API",
            "Promises",
            "Await",
            "Error handaling"

        ]
    },

    {
        title: "project-interactive JS web app",
        start:"2027-04-01",
        end: "2027-04-20",
        topics:[ 
            "Plan the project", 
            "Create the HTML structure", 
            "Style the application",
            "DOM manipulation", 
            "Events",
            "Forms", 
            "LocalStorage", 
            "API integration", 
            "Search", 
            "Filtering", 
            "Responsive design", 
            "Final testing" 
        ]
    },

    {
        title: "React and state management",
        start:"2027-04-21",
        end:"2027-05-30",
        topics:[
             "React basics", 
             "Components",
              "JSX",
               "Props",
                "State", 
                "Events", 
                "Conditional rendering", 
                "Lists", 
                "Forms", 
                "Hooks", 
                "useState", 
                "useEffect", 
                "React Router", 
                "API calls", 
                "State management" 
            ]

    },


    {
        title: "project Frontend Final",
        start:"2027-06-01",
        end:" 2027-06-20",
        topics: [ 
            "Plan the project", 
            "Create the UI", 
            "Build React components", 
            "Product cards", 
            "Navigation", 
            "Forms", 
            "State management", 
            "API integration", 
            "Responsive design", 
            "Testing", 
            "Final improvements" 
        ]
    },
{
    title: "Git and Github and DSA",
    start: "2027-06-21",
    end:"2027-08-15",
    topics: [ 
        "Git basics", 
        "Git commands",
        "Branches", 
        "Merge ", 
        "GitHub", 
        "Repositories", 
        "README files", 
        "Pull requests", 
        "Arrays", 
        "Strings", 
        "Linked lists", 
        "Stacks", 
        "Queues", 
        "Searching", 
        "Sorting", 
        "Problem solving" 
    ]
},

{
    title:"UI/UX Design",
    start: "2027-08-16",
    end:"2027-09-10",
    topics: [
         "UI/UX basics", 
         "Design principles", 
         "Colors", 
         "Typography", 
         "Spacing", 
         "Wireframes", 
         "Figma basics", 
         "Figma components", 
         "Auto Layout", 
         "Responsive design", 
         "Design systems",
          "Convert design into code" 
        ]
}
   
    
    ];


    const roadmap = document.getElementById("time");
    const progressBar = document.getElementById("one");
    const progressText = document.getElementById("progress");

    const totalDaysText = document.getElementById("totaldays");
    const completedDaysText= document.getElementById("completed days");
    const percentageText = document.getElementById("percentage");
    const currentDayText = document.getElementById("current");

    const searchInput = document.querySelector(".search");

    function getDays(startDate, endDate){
    const days =[];

    let date = new Date(startDate);
    const lastDate = new Date(endDate);

    while (date <= lastDate) {
       days.push( new Date(date));
       date.setDate(date.getDate()+1);
    }
    return days;
    }

    function showDate (date){
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}


    function makeRoadmap(){

        roadmap.innerHTML="";
        let totalDays=0;
        phases.forEach(function(phase,phaseNumber)
    {
            const days= getDays(phase.start,phase.end);
            totalDays +=days.length;
            const phaseBox =document.createElement("section");
            phaseBox.className="cardphase";

            const phaseHead = document.createElement("div");

            phaseHead.className = "PhaseHead";

            phaseHead.innerHTML= `
            <div class="number">${
                phaseNumber +1
            }
            </div>

            <div class="phaseTitle">
            <h2>${
                phase.title
            }
            </h2>
            <p>
            ${  showDate(new Date (phase.start)) }
            ${ showDate (new Date(phase.end))
            }
            </P>
            </div>
            
            <div class="days">${
                days.length
            }
            Days
            </div>

           

            `;

            const phaseBody = document.createElement("div");
            phaseBody.className="phaseBody";

            const summary = document.createElement("div");
            summary.className="phasesummary";

            summary.innerHTML= `

            <div>
            <span class="summaryLabel"> START </span>
            <strong>
            ${
                showDate(new Date(phase.start))
            }
            </strong>
            </div>

            <div>
            <span class="summaryLabel">END</span>
            <strong>
            ${ showDate(new Date(phase.end))}
            </strong>
            </div>

            <div>
            <span class="summaryLabel">DAYS</span>
            <strong>${
                days.length
            }
            
            </strong>
            <div>
            <span class="summaryLabel">PROGRESS</span>
            <strong class="phaseProgressText">0%
            </strong>
            </div>
            `;
            
            const dayGrid = document.createElement ("div");
            dayGrid.className="daygrid";

            days.forEach(function (day, dayNumber) 
            { 
                const dayBox = document.createElement("label");

                dayBox.className = "daybox";

                const checkboxId= "phase-" + phaseNumber + "-day-" + dayNumber;

                dayBox.innerHTML= `
                <input type="checkbox"
                 id="${checkboxId}">

                <span class="checkmark">✓</span>

                <span class="dayInfo">
                <b>Day ${
                    dayNumber +1
                }
                </b>
                <small>${
                    showDate(day)
                }
                </small>
                </span>
                `;

                const checkbox = dayBox.querySelector("input");

                const savedData =
                JSON.parse(localStorage.getItem("frontendJourney")) ||{};

                if (savedData[checkboxId]){

                    checkbox.checked= true;
                    dayBox.classList.add("checked");
                }

                checkbox.addEventListener("change",function()
                {
                    if (checkbox.checked){
                        dayBox.classList.add("checked");
                    }
                    else{
                        dayBox.classList.remove("checked");
                    }
                    saveProgress();
                    updateProgress();

                }
            );

              dayGrid.appendChild(dayBox);
            }
        
        );

        phaseBody.appendChild(summary);
       phaseBody. appendChild(dayGrid);

       phaseBox.appendChild(phaseHead);
       phaseBox.append(phaseBody);

       roadmap.appendChild(phaseBox);

       phaseHead.addEventListener("click", function()
    {
        phaseBox.classList.toggle("active");
    }
    );
            
    }
    );
    totalDaysText.textContent = totalDays;

    updateProgress();
        
    }


    function saveProgress()
{
    const progress= {};
    const checkboxes = document.querySelectorAll(".daybox input")
    checkboxes.forEach(function(checkbox)
{
progress [checkbox.id] = checkbox.checked;

}
);

localStorage.setItem(
    "frontendJourney",
    JSON.stringify(progress)
);
}


function updateProgress()
{
    const checkboxes =
    document.querySelectorAll(".daybox input")

    let completed =0;
    checkboxes.forEach(function (checkbox)
    {
        if (checkbox.checked)
            {
        completed++;
            }
        }
   
);
const total = checkboxes.length;
let percent = 0;
 if (total>0)
 {
    percent = Math.round((completed/total)*100);
 }

 completedDaysText.textContent=completed;
 percentageText.textContent = percent +"%";
 progressText.textContent=completed+"/"+total+"Days";
 progressBar.style.width = percent + "%";

 if ( completed <total){
    currentDayText.textContent = completed +1;
 }
 else

    {

        currentDayText.textContent=total;
    }

    updatePhaseProgress();
}

function updatePhaseProgress(){

    const phasesOnPage = document.querySelectorAll(".cardphase");

phasesOnPage.forEach(function(phase)

{
    const checkboxes=
     phase.querySelectorAll(".daybox input");

         let completed=0;
         checkboxes.forEach(function (checkbox)
         {
            if(checkbox.checked){
                completed++;
            }
         }
        );
        const total = checkboxes.length;
        let percent=0;

        if (total>0){
            percent=Math.round((completed/total)*100);
        }

        const progressText= phase.querySelector(".phaseProgressText");

        if(progressText) {
            progressText.textContent = percent + "%";
        }
    }
);
}



searchInput.addEventListener("input", function()
{
    const searchText=
    searchInput.value.toLowerCase().trim();

const phasesOnPage = document.querySelectorAll(".cardphase");
 phasesOnPage.forEach(function (phase)
{
    const phaseText= phase.textContent.toLowerCase();

    if (phaseText.includes (searchText)){
        phase.style.display="";
    }
    else
    {
        phase.style.display="none";
    }
}
);
}
);

function openall() {
    const phases = document.querySelectorAll(".cardphase");
    phases.forEach(function(phase) {
        phase.classList.add("active");
    });
}

function closeall() {
    const phases = document.querySelectorAll(".cardphase");
    phases.forEach(function(phase) {
        phase.classList.remove("active");
    });
}
makeRoadmap();