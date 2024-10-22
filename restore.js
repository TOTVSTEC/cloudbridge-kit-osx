var task = module.exports,
	path = require('path'),
	Q = null,
	fs = null,
	shelljs = null,
	cloudbridge = null,
	projectDir = null,
        paths = null;

task.run = function run(cli, targetPath, projectData) {
	cloudbridge = cli;
	projectDir = targetPath;
	Q = cloudbridge.require('q');
	fs = cloudbridge.require('fs');
	shelljs = cloudbridge.require('shelljs');
        paths = cloudbridge.cb_require('utils/paths');

	return Q()
		.then(copyDependencies)
		.then(applyTemplate);
};

function copyDependencies() {
	var src = path.join(__dirname, 'build', '*'),
		target = path.join(projectDir, 'build');

	shelljs.mkdir('-p', target);
	shelljs.cp('-Rf', src, target);

        var smartclient = paths.get("SMARTCLIENT", projectDir);
        var appserver =  paths.get("APPSERVER", projectDir);

	shelljs.chmod('+x', smartclient);
	shelljs.chmod('+x', appserver);
}

function applyTemplate() {
	var ini = path.join(projectDir, 'build', 'osx', 'bin', 'smartclient.app', 'Contents', 'MacOS', 'smartclient.ini'),
		project = require(path.join(projectDir, 'cloudbridge.json'));

	var content = fs.readFileSync(ini, { encoding: 'utf8' });
	content = content.replace(/LASTMAINPROG.+/igm, 'LASTMAINPROG=' + project.name + '.Cloud');
	fs.writeFileSync(ini, content);
}
