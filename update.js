var task = module.exports,
	Q = null;

task.run = function run(cli, targetPath, projectData) {
	Q = cli.require('q');

	return Q()
		.then(function() {
			var remove = require('./remove');

			return remove.run(cli, targetPath, projectData);
		})
		.then(function() {
			var install = require('./install');

			return install.run(cli, targetPath, projectData);
		});
};
