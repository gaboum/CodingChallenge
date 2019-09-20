let mortgageInput = document.getElementById('mortgageInput');
let interestInput = document.getElementById('interestInput');
let calculateBtn  = document.getElementById('btn_calc');
let loanAmount  = document.querySelector('.loan-amount');
let annual_tax  = document.getElementById('annual-tax');
let annual_insurance  = document.getElementById('annual-insurance');
let out_pi  = document.getElementById('out-pi');
let out_tax  = document.getElementById('out-tax');
let out_insurance  = document.getElementById('out-insurance');
let out_total  = document.getElementById('out-total');

let years_of_mortgage = document.querySelector('.mortgage-slider .rangeInputControl');
let rate_of_interest = document.querySelector('.interest-slider .rangeInputControl');

function moveRangeSlider(){

    let val = (this.value - this.min) / (this.max - this.min);
    this.style.backgroundImage = 
	'-webkit-gradient(linear, left top, right top, '
                 + 'color-stop(' + val + ', #1091cc), '
                 + 'color-stop(' + val + ', #cacaca)'
                 + ')';
    if ( this.id === "years_of_mortgage" ) {
        mortgageInput.value = this.value;
    } else {
        interestInput.value = this.value;
    }
    
}

const captialize = words => words.split(' ').map( w =>  w.substring(0,1).toUpperCase()+ w.substring(1)).join(' ');


function displayErrorFields() {
    removeDisplayErrors();
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let txt = "Mandatory Field";

    let reqFields = document.querySelectorAll('.loanSpan');
    for (let i = 0; i <= reqFields.length - 1; i++) {
        
        
        let node = document.createElement('span');
        node.classList.add("error-field");
        node.style.color = "#da3535";
        node.style.fontSize = "10px";
        reqFields[i].appendChild(node);
        if (w >= 900 ) {
            node.innerText = captialize(node.previousSibling.id.replace('-',' ')) + " is mandatory";
        } else {
            node.innerText = txt;
        }
        node.previousSibling.style.border = "2px solid #da3535";
        
        
    }
}
function removeDisplayErrors() {
    document.querySelectorAll('.error-field').forEach(function(args){
        args.previousSibling.style.border="solid 1px #a6a6a6";
        args.remove();
    });
}


years_of_mortgage.onchange = moveRangeSlider;
rate_of_interest.onchange = moveRangeSlider;
years_of_mortgage.onchange();
rate_of_interest.onchange();


document.querySelector('.mortgage-slider .rangeInputControl').onchange = function(){
    let val = (this.value - this.min) / (this.max - this.min);
    this.style.backgroundImage = 
	'-webkit-gradient(linear, left top, right top, '
                 + 'color-stop(' + val + ', #1091cc), '
                 + 'color-stop(' + val + ', #cacaca)'
                 + ')';
    mortgageInput.value = this.value;
};

document.querySelector('.interest-slider .rangeInputControl').onchange = function(){
    let val = (this.value - this.min) / (this.max - this.min);
    this.style.backgroundImage = 
	'-webkit-gradient(linear, left top, right top, '
                 + 'color-stop(' + val + ', #1091cc), '
                 + 'color-stop(' + val + ', #cacaca)'
                 + ')';
    interestInput.value = this.value;
};

let calculateBtnCounter = false;


calculateBtn.onclick = function() {
    

    console.log({mortgageInput: mortgageInput.value, interestInput:interestInput.value, loanAmount: loanAmount.value, annual_tax: annual_tax.value, annual_insurance: annual_insurance.value});

    if( loanAmount.value === "" || annual_tax.value === "" || annual_insurance.value === "" ) {
        displayErrorFields();
        return false;
    }

    removeDisplayErrors();
    document.querySelectorAll('.resultList > div span:nth-child(2)').forEach(function(args){
        args.style.opacity=1;
    });    

    resPI = ((interestInput.value / 100) / 12)* loanAmount.value / (1-Math.pow((1 + ((interestInput.value / 100)/12)), -mortgageInput.value*12));
    resTAX = annual_tax.value / 12;
    resINSURANCE = annual_insurance.value / 12;


    out_pi.innerText = "$ " + resPI.toFixed(2);
    out_tax.innerText = "$ " + resTAX.toFixed(2);
    out_insurance.innerText = "$ " + resINSURANCE.toFixed(2);
    out_total.innerText = "$ " + (resPI + resTAX + resINSURANCE).toFixed(2);
    
    document.querySelector('.resultsBox').classList.add('show');
    
    if (calculateBtnCounter === false) {
        calculateBtn.innerText = "RECALCULATE";
        calculateBtnCounter = true;
    }
    
};

loanAmount.onkeypress = function(e) {
    if ( e.key === 'e') {
        loanAmount.style.border = "2px solid #da3535";
        return false;
    }
    if ( isNaN(e.key) ) {
        loanAmount.style.border = "2px solid #da3535";
    }
};
loanAmount.onkeyup = function(e) {
    loanAmount.style.border = "solid 1px #a6a6a6";
};
annual_insurance.onkeypress = function(e) {
    if ( e.key === 'e') {
        annual_insurance.style.border = "2px solid #da3535";
        return false;
    }
    if ( isNaN(e.key) ) {
        annual_insurance.style.border = "2px solid #da3535";
    }
};
annual_insurance.onkeyup = function(e) {
    annual_insurance.style.border = "solid 1px #a6a6a6";
};
annual_tax.onkeypress = function(e) {
    if ( e.key === 'e') {
        annual_tax.style.border = "2px solid #da3535";
        return false;
    }
    if ( isNaN(e.key) ) {
        annual_tax.style.border = "2px solid #da3535";
    }
};
annual_tax.onkeyup = function(e) {
    annual_tax.style.border = "solid 1px #a6a6a6";
};

