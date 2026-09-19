let Primary_BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let Fallback_Base_Url = "https://latest.currency-api.pages.dev/v1/currencies";

let dropdowns  = document.querySelectorAll(".dropdown select");

let btn = document.querySelector("form .btn");

let fromCurr = document.querySelector(".from select");

let toCurr = document.querySelector(".to select");

let msg = document.querySelector(".msg");

let swap_btn = document.querySelector(".swap_btn")

for (let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value= currCode;

        if(select.name ==="from" && currCode ==="USD"){
            newOption.selected= "selected";
        }

        else if(select.name==="to" && currCode === "NPR"){
            newOption.selected= "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        changeFlag(evt.target);
    });
}

let changeFlag = (element)=>{
    let currCode = element.value;
    let countrycode = countryList[currCode];
    if (countrycode){
         let flagSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = flagSrc; 
    }
};


const updateExchange_Rate = async() =>{
    let amt = document.querySelector(".amt input");
    let amtVal = amt.value;

    if (amtVal === "" || amtVal < 1){
        amtVal = 1;
        amt.value = "1";
    }

    let fromVal = fromCurr.value.toLowerCase();
    let toVal = toCurr.value.toLowerCase();

    msg.innerText = "Getting exchange rate...";

    await new Promise((resolve) => setTimeout(resolve,300));
        

    try{
        let response;
        try{

            response = await fetch(`${Primary_BASE_URL}/${fromVal}.json`);

            if (!response.ok) throw new Error("Primary Fetch failed");
        }
        catch (e){
            response = await fetcch (` ${Fallback_Base_Url}/${fromVal}.json`);
        }

        let data = await response.json();
        let rate = data[fromVal][toVal];

        
        if (!rate) throw new Error ("Currency rate unavailable");

        let finalAmt = (amtVal * rate).toFixed(2);

        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    }
    catch (error) {
        msg.innerText = "Error fetching exchange rate.";
    }
};


swap_btn.addEventListener("click", () =>{
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;

    changeFlag(fromCurr);
    changeFlag(toCurr);
    updateExchange_Rate();
});


btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchange_Rate();
});

window.addEventListener("load", () =>{
    updateExchange_Rate();
});