const express = require('express')
const app = express()
module.exports = app
const request = require('request');
var bodyParser = require('body-parser');
var jsonminify = require("jsonminify");
var rp = require('request-promise');


// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(9000, function() {
  console.log('Application is listening on 9000');
});


var hotels;
app.get('/hotels', function (req, res) {

	var options = {
	    uri: 'https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel',
		json: true 
	};

	rp(options)
 	.then(function (body) {
        hotels = body.offers.Hotel
        res.send(hotels)
    })
    .catch(function (err) {
        console.log("An Error Occured: ",err);
	});

});

