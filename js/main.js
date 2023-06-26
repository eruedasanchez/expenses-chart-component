import data from './data.json' assert {type: 'json'};

let chartBarsContainer = document.querySelector('.chart__bars-container');
let  values = [];

data.forEach(element => {
    values.push(element.amount);
    chartBarsContainer.innerHTML += `
    <div class="chart__bar">
        <div class="chart__bar--label">$${element.amount}</div>
        <div class="chart__bar--day">${element.day}</div>
    </div>
    `
});

const HEIGHTMAXBARPX = 150;
let maxValue = Math.max(...values);

let bars = document.querySelectorAll('.chart__bar');
bars = [...bars];

bars.forEach(bar => {
    let newValue = parseFloat(bar.childNodes[1].innerText.slice(1));
    let actualHeightPx = (newValue * HEIGHTMAXBARPX) / maxValue;
    bar.style.height = `${actualHeightPx}px`;

    // Paint the largest bar with cyan
    if(newValue === maxValue){
        bar.style.backgroundColor = `hsl(186, 34%, 60%)`;
    }
    
    bar.addEventListener('mouseover', event => {
        if(event.target.className == 'chart__bar'){
            let labelElement = event.target.childNodes[1]; // chart__bar--label
            labelElement.style.display = 'block';
        }
    });

    bar.addEventListener('mouseout', event => {
        if(event.target.className == 'chart__bar'){
            let labelElement = event.target.childNodes[1]; // chart__bar--label
            labelElement.style.display = 'none';
        }
    });
});




