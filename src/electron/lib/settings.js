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
			keys: ['f0', 'f1'],
			layer: 20,
			sendJSON: false,
			defaultPlayTime: 7
		},
		infoBar: {
			template: '',
			keys: ['f0', 'f1'],
			layer: 21,
			sendJSON: false,
			defaultPlayTime: 0,
			selectOptions: [
				{
					name: 'Deutsche Einzelmeisterschaft 2023',
					disciplines: ['Speed 30 Sekunden', 'Speed 180 Sekunden', 'Freestyle']
				},
				{
					name: 'Bundesfinale Einzel 2023',
					disciplines: ['Speed 30 Sekunden', 'Speed 180 Sekunden', 'Freestyle']
				},
				{ name: 'Double Under Cup 2023', disciplines: [] },
				{ name: 'Triple Under Cup 2023', disciplines: [] }
			]
		},
		jumpBB: {
			template: '',
			keys: ['f0', 'f1', 'f2'],
			layer: 22,
			sendJSON: false,
			defaultPlayTime: 7,
			dataSource: ''
		}
	}
};

module.exports = new Store({
	name: 'settings',
	fileExtension: 'config',
	watch: true,
	defaults
});
