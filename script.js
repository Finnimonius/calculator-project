const allButtons = document.querySelectorAll("hero__phone-btn");

const phoneNum = document.getElementById("phone-num");

phoneNum.addEventListener("click", () => {
    const indicator = document.getElementById("indicator");
    indicator.classList.add("hero__phone-indicator-back"); 
    
    setTimeout(() => {
        indicator.classList.remove("hero__phone-indicator-back"); 
    }, 450);

})