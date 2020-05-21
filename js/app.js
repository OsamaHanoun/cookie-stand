'use strict'
var locations = [];
var tableHeader = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', 'Daily Location Total']
function Location(location, minPerCust, maxPerCust, avgCookiePerSale) {
    this.location = location;
    this.minPerCust = minPerCust;
    this.maxPerCust = maxPerCust;
    this.avgCookiePerSale = avgCookiePerSale;
    this.salesArray;
    this.totalSales;
    this.cookieSales();
    locations.push(this);
}
Location.prototype.cookieSales = function () {

    this.totalSales = 0;
    this.salesArray = [];

    for (let index = 0; index < tableHeader.length - 1; index++) {
        var numOfSales = Math.floor((Math.floor(Math.random() * (this.maxPerCust - this.minPerCust + 1)) + this.minPerCust) * this.avgCookiePerSale);
        this.totalSales += numOfSales;
        this.salesArray.push(numOfSales);
    }


}

var seattle = new Location('Seattle', 23, 65, 6.3, [], 0);
var tokyo = new Location('Tokyo', 3, 24, 1.2, [], 0);
var dubai = new Location('Dubai', 11, 38, 3.7, [], 0);
var paris = new Location('Paris', 20, 38, 2.3, [], 0);
var lima = new Location('Lima', 2, 16, 4.6, [], 0);

// Functions Calling

render(locations, tableHeader);
// DOM Manipulation
function render(locationArray, tableHeader) {
    // the following code to reset table and then to create headers
     document.getElementById('salesTable').remove();
     var divE = document.getElementById('salesTable-div');
     var tableE= document.createElement('table');
     tableE.setAttribute('id', 'salesTable');
     divE.appendChild(tableE);
     



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


// Events

var formE = document.getElementById('addShopForm');
formE.addEventListener('submit', function (event) {
    event.preventDefault();

    var shopName = event.target.shopName.value;
    var minHourlyCust = event.target.minHourlyCust.value;
    var maxHourlyCust = event.target.maxHourlyCust.value;
    var avgCookie = event.target.avgCookie.value;
    if (minHourlyCust > maxHourlyCust){
        let temp = minHourlyCust;
        minHourlyCust = maxHourlyCust;
        maxHourlyCust = temp; 
    }
    document.getElementById("addShopForm").reset(); 

    var addedShop = new Location(shopName, minHourlyCust, maxHourlyCust, avgCookie);
    render(locations, tableHeader);
});


