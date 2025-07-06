//Remoove teachers with zero seats left - in modify table
const courseTable = document.getElementById("ModifySlot");
const seatsRemaining = courseTable.querySelectorAll("span")
for (let i = 0; i < seatsRemaining.length; i++) { 
    if (seatsRemaining[i].textContent === '0') { 
        seatsRemaining[i].parentElement.parentElement.style.display = "none";
    } 
}
const mainContent = document.querySelector('body > main, body > .main-content');
if (mainContent) {
  mainContent.style.marginRight = '300px';
  mainContent.style.transition = '0.3s';
}
