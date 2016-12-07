(function() {
"use strict";

var state = document.getElementById('tax-state');

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('s-calculator').addEventListener('submit', estimateTotal);
	
	var btnEstimate = document.getElementById('btn-estimate');
	
	btnEstimate.disabled = true;
	state.addEventListener('change', function() {
	
		if (state.value === '') {
			btnEstimate.disabled = true;
		} else {
			btnEstimate.disabled = false;
		}
	
	});
});

function estimateTotal(event) {
	event.preventDefault();
	
	if (state.value === '') {
		alert('Please choose your shipping state.');
		state.focus();
	}
	
    //Define all the variables for calculator
	var	taxState = state.value,
		packageMethod = document.querySelector
                        ('[name=r_method]:checked').value || "";
    
	var packageCostPer,
		packageCost,
		taxFactor = 1,
        totalAmount,
		estimate;
	
	if (taxState === 'VIC') {
		taxFactor = 1.075;
	} else if (taxState === '') {
		return true;
	}
	
	switch(packageMethod) {
		case 'eco' :
			packageCostPer = 349;
			break;
		case 'standard' :
			packageCostPer = 550;
			break;
        case 'premium' :
            packageCostPer = 1050;
            break;
		default :
			packageCostPer = 0;
			break;
	}
	
    //Simple calculation formulas
    packageCost = packageCostPer;
    totalAmount = packageCost * taxFactor;
    
    estimate = '$' + (packageCost * taxFactor).toFixed(2);
    
    document.getElementById('txt-estimate').value = estimate;
	
	var results = document.getElementById('results');
	
	results.innerHTML = 'Website package: $' + packageCost.toFixed(2) + '<br>';
    results.innerHTML += 'Total amount: $' + totalAmount + '<br>';
	results.innerHTML += 'Tax: ' + ((taxFactor - 1) * 100).toFixed(2) + 
                         '% (' + taxState + ')';
}

})();