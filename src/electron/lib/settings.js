const Store = require('electron-store');

const defaults = {
	cgsServer: {
		IP: '127.0.0.1',
		Port: 5250,
		Queue: 1
	},
	cgtTemplate: {
		defaultBB: {
			template: '',
			fields: 2,
			keys: ['f0', 'f1'],
			layer: 20,
			sendJSON: false,
			defaultPlayTime: 7
		}
	}
};

module.exports = new Store({
	name: 'settings',
	fileExtension: 'config',
	watch: true,
	defaults
});
