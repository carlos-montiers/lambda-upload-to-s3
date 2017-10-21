'use strict';

let goProgram = 'upload_s3';
let sourceFile = 'test.png';

let bucket = 'carlos-s3';
let region = 'us-east-1';

module.exports.main = (event, context, callback) => {

	let fs = require('fs');
	let child_process = require('child_process');

	// Copy goProgram to tmp and give execution permissions
	let tmpGoProgram = '/tmp/' + goProgram;
	fs.writeFileSync(tmpGoProgram, fs.readFileSync(goProgram));
	fs.chmodSync(tmpGoProgram, '755');

	process.env['PATH'] += ':' + process.env['LAMBDA_TASK_ROOT'];
	let execution = child_process.spawnSync(tmpGoProgram, [sourceFile, bucket, region], {
		env : process.env
	});
	let errorlevel = execution.status;

	let response = {
		statusCode: 200,
        headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			result: errorlevel
		})
	};

	callback(null, response);
};
