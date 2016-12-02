var config = {};

config.statusURL = 'https://status.heroku.com/api/v3/current-status';
config.issuesURL = 'https://status.heroku.com/api/v3/issues?since=2012-04-24&limit=1';
config.allowOriginString = 'Access-Control-Allow-Origin';
config.all = '*';

config.contentTypeString = 'Content-Type';
config.contentType = 'application/json';

config.statusFailed = 'Status request failed';
config.issuesFailed = 'Issues request failed';

config.listenMessage = 'Server is listening';

config.dateFormat = 'dd/mm/yyyy';
config.timeFormat = 'HH:MM';
config.timeZoneFormat = 'Z';

module.exports = config;