'use strict'


var seattle = { location: 'Seattle', minPerCust: 23, maxPerCust: 65, avgCookiePerSale: 6.6, salesArray: [], totalSales: 0 };
var tokyo = { location: 'Tokyo', minPerCust: 3, maxPerCust: 24, avgCookiePerSale: 1.2, salesArray: [], totalSales: 0 };
var dubai = { location: 'Dubai', minPerCust: 11, maxPerCust: 38, avgCookiePerSale: 3.7, salesArray: [], totalSales: 0 };
var paris = { location: 'Paris', minPerCust: 20, maxPerCust: 38, avgCookiePerSale: 2.3, salesArray: [], totalSales: 0 };
var lima = { location: 'Lima', minPerCust: 2, maxPerCust: 16, avgCookiePerSale: 4.6, salesArray: [], totalSales: 0 };

var locations = [seattle, tokyo, dubai, paris, lima];

// Functions Calling
cookieSales(locations);
render(locations);
// DOM Manipulation 
function render(locationArray) {
    var container = document.getElementById('salesList');

    for (let i = 0; i < locationArray.length; i++) {
        var liE = document.createElement('li');
        liE.setAttribute('id', 'location'+i);
        container.appendChild(liE);
        liE.textContent = locationArray[i].location;
        var liId = document.getElementById('location' + i )
        console.log(liId)
        var time = 6;
        for (let index = 0; index < 14; index++) {
            var ddE = document.createElement('dd');
            console.log(ddE);
            liId.appendChild(ddE);

            if (index < 6) {
                ddE.textContent = `${time}am: ${locationArray[i].salesArray[index]} cookies`;
                time++;

            } else if (index == 6) {
                ddE.textContent = `12pm: ${locationArray[i].salesArray[index]} cookies`;
                time = 1;

            } else {
                ddE.textContent = `${time}pm: ${locationArray[i].salesArray[index]} cookies`;
                time++;
            }
        }
        ddE.textContent = `Total: ${locationArray[i].totalSales} cookies`;

    }



}

// Functions
function cookieSales(locationArray) {
    for (let i = 0; i < locationArray.length; i++) {
        ;
        var min = locationArray[i].minPerCust;
        var max = locationArray[i].maxPerCust;
        var avg = locationArray[i].avgCookiePerSale;
        var totalCookie = 0;
        var sales = [];

        for (let index = 0; index < 14; index++) {
            var numOfSales = Math.floor((Math.floor(Math.random() * (max - min + 1)) + min) * avg);
            totalCookie += numOfSales;
            sales.push(numOfSales);
        }
        locationArray[i].salesArray = sales;
        locationArray[i].totalSales = totalCookie;
        console.log(locationArray[i]);
    }
}


