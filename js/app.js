'use strict'
var locations = [];
var tableHeader = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', 'Daily Location Total']
function Location(location, minPerCust, maxPerCust, avgCookiePerSale, salesArray, totalSales) {
    this.location = location;
    this.minPerCust = minPerCust;
    this.maxPerCust = maxPerCust;
    this.avgCookiePerSale = avgCookiePerSale;
    this.salesArray = salesArray;
    this.totalSales = totalSales;
    locations.push(this);
}
var seattle = new Location('Seattle', 23, 65, 6.3, [], 0);
var tokyo = new Location('Tokyo', 3, 24, 1.2, [], 0);
var dubai = new Location('Dubai', 11, 38, 3.7, [], 0);
var paris = new Location('Paris', 20, 38, 2.3, [], 0);
var lima = new Location('Lima', 2, 16, 4.6, [], 0);

// Functions Calling
cookieSales(locations);
console.log(seattle.salesArray);
render(locations, tableHeader);
// DOM Manipulation
function render(locationArray, tableHeader) {
   // the following code to create headers
    var container = document.getElementById('salesTable');
    var trE = document.createElement('tr');
    var thE = document.createElement('th');
    thE.setAttribute('id', 'headerEmptyCell');
    trE.appendChild(thE); // to create an empty cell in the left top corner
    container.appendChild(trE);
    for (let index = 0; index < tableHeader.length; index++) { // this loop to create header cells with content   
        var thE = document.createElement('th');
        trE.appendChild(thE);
        thE.textContent = tableHeader[index];
    }

    var totalPerHour = []; // variable to store last row data
    var totalPerDay = 0; // variable to store data for the right bottom cell

    // this loop for rows 2 to 6
    for (let i = 0; i < locationArray.length; i++) {
        var trE = document.createElement('tr');
        trE.setAttribute('id', 'location' + i);
        container.appendChild(trE);

        var trId = document.getElementById('location' + i)
        var tdE = document.createElement('td');
        trId.appendChild(tdE);
        tdE.textContent = locationArray[i].location;

        for (let index = 0; index < tableHeader.length; index++) {

            var tdE = document.createElement('td');
            trId.appendChild(tdE);
            tdE.textContent = locationArray[i].salesArray[index];

            totalPerHour.push(0);
            totalPerHour[index] += locationArray[i].salesArray[index];
        }
        tdE.textContent = locationArray[i].totalSales;
        totalPerDay += locationArray[i].totalSales;
    }

    // the following code to create the last row
    var trE = document.createElement('tr');
    container.appendChild(trE);
    var tdE = document.createElement('td');
    tdE.textContent = 'Totals';
    trE.appendChild(tdE); // to create an empty cell in the left bottom corner
    for (let index = 0; index < tableHeader.length; index++) {
        if (index == (tableHeader.length - 1)) {
            var tdE = document.createElement('td');
            trE.appendChild(tdE);
            tdE.textContent = totalPerDay;
            break;
        }
        var tdE = document.createElement('td');
        trE.appendChild(tdE);
        tdE.textContent = totalPerHour[index];
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


