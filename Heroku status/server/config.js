var config = {};

config.statusOptions = {
    uri: 'https://status.heroku.com/api/v3/current-status',
    json: true
};

config.issuesOptions = {
    uri: 'https://status.heroku.com/api/v3/issues?since=2012-04-24&limit=1',
    json: true
};

config.allowOriginString = 'Access-Control-Allow-Origin';
config.all = '*';

config.statusFailed = 'Status request failed';
config.issuesFailed = 'Issues request failed';

config.listenMessage = 'Server is listening';

config.dateFormat = 'dd/mm/yyyy';
config.timeFormat = 'HH:MM';
config.timeZoneFormat = 'Z';

module.exports = config;