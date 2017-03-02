var task = module.exports;

task.run = function run(cli, targetPath, projectData) {
	var restore = require('./restore');

	return restore.run(cli, targetPath, projectData);
};
