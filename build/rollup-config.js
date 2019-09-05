
// Config file for running Rollup in "normal" mode (non-watch)

import rollupGitVersion from 'rollup-plugin-git-version'
import json from 'rollup-plugin-json'

import gitRev from 'git-rev-sync'


let version = require('../package.json').version;
let release;

// Skip the git branch+rev in the banner when doing a release build
if (process.env.NODE_ENV === 'release') {
	release = true;
} else {
	release = false;
	const branch = gitRev.branch();
	const rev = gitRev.short();
	version += '+' + branch + '.' + rev;
}

const banner = `/*
 * longdomap.markercluster ` + version + `,
 */`;

export default {
	input: 'src/index.js',
	output: {
		banner,
		file: 'dist/longdomap.markercluster-src.js',
		format: 'umd',
		legacy: true, // Needed to create files loadable by IE8
		name: 'Longdomap.markercluster',
		sourcemap: true,
	},
	plugins: [
		release ? json() : rollupGitVersion(),
	],
};
