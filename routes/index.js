//Routing files
const issues = require('./../database/issues');

module.exports = exports = function(app, db) {

	// VIEWS
	app.get('/', function (req, res) {
	  res.sendFile(path.join(__dirname, 'build', 'index.html'));
	});
	app.get('/hello', (req, res) => res.send('Hello!'))

	// DATABASE QUERYS
	app.get('/db/getAllIssues', issues.getAllIssues);
	app.post('/db/updateTitle', issues.updateTitle);
	app.post('/db/updateDescription', issues.updateDescription);
	app.post('/db/updateSeverity', issues.updateSeverity);
	app.post('/db/updateStatus', issues.updateStatus);
	app.post('/db/addNewIssue', issues.addNewIssue);
	app.post('/db/deleteIssue', issues.deleteIssue);

}