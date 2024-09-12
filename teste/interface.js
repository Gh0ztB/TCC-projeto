const circle = document.getElementById('circle');
const dateInput = document.getElementById('dateInput');

let targetDate = new Date();

function updateCircleColor() {
    const now = new Date();
    const timeDifference = targetDate - now;
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    
    if (daysRemaining > 30) {
        circle.style.backgroundColor = 'green'; 
    } else if (daysRemaining > 7) {
        circle.style.backgroundColor = 'yellow'; 
    } else if (daysRemaining > 0) {
        circle.style.backgroundColor = 'red'; 
    } else {
        circle.style.backgroundColor = 'grey'; 
    }
}


setInterval(updateCircleColor, 1000);


updateCircleColor();


function updateDate() {
    const newDate = new Date(dateInput.value);
    if (isNaN(newDate.getTime())) {
        alert('Data inválida.');
        return;
    }
    targetDate = newDate;
    updateCircleColor();
}