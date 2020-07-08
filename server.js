const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes');
const mongodb = require('./database/mongo');
var bodyParser = require("body-parser");


const PORT = 4000;

app.set('port', process.env.PORT || PORT);

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

mongodb.init(function (err, db) {
	if (err) {
		console.log(err);
	} else {
		
		console.log(`✅ Connected to MongoDB!`)
		
		// Routes
		router(app, db);
		
		app.listen(app.get('port'), function() {
		    console.log(`✅ React App is listening at http://localhost:4000/`);
		});

	}
});