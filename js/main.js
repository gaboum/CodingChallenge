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
    if ( isNaN(e.key) ) {
        loanAmount.style.border = "2px solid red";
    }
};
loanAmount.onkeyup = function(e) {
    loanAmount.style.border = "solid 1px #a6a6a6";
};
annual_insurance.onkeypress = function(e) {
    if ( isNaN(e.key) ) {
        annual_insurance.style.border = "2px solid red";
    }
};
annual_insurance.onkeyup = function(e) {
    annual_insurance.style.border = "solid 1px #a6a6a6";
};
annual_tax.onkeypress = function(e) {
    if ( isNaN(e.key) ) {
        annual_tax.style.border = "2px solid red";
    }
};
annual_tax.onkeyup = function(e) {
    annual_tax.style.border = "solid 1px #a6a6a6";
};

