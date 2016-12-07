(function() {
"use strict";

var state = document.getElementById('s-state');

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('cart-hplus').addEventListener('submit', estimateTotal);
	
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
	
	var yearHosting = parseInt(document.getElementById('txt-q-power')
							 .value, 10) || 0,
		packageState = state.value,
		packageMethod = document.querySelector('[name=r_method]:checked')
						     .value || "";
		
	var totalQty = yearHosting,
		packageCostPer,
		packageCost,
        totalAmount,
		taxFactor = 1,
		estimate,
		totalHostingPrice = 50 * yearHosting;
	
	if (packageState === 'CA') {
		taxFactor = 1.075;
	} else if (packageState === 'WA') {
		taxFactor = 1.065;
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
	
    //Calculations
    packageCost = packageCostPer;
    totalAmount = ((packageCost + totalHostingPrice) * taxFactor);
    
    estimate = '$' + ((totalHostingPrice + packageCost) * taxFactor).toFixed(2);
	
	document.getElementById('txt-estimate').value = estimate;
	
	var results = document.getElementById('results');
	
	results.innerHTML = 'Hosting period: ' + totalQty + ' (Month/s)' + '<br>';
    results.innerHTML += 'Hosting price: $' + totalHostingPrice + '<br>';
	results.innerHTML += 'Website package: $' + packageCost.toFixed(2) + '<br>';
    results.innerHTML += 'Total amount: $' + totalAmount + '<br>';
	results.innerHTML += 'Tax: ' + ((taxFactor - 1) * 100).toFixed(2) + '% (' + packageState + ')';
}

})();