const Store = require('electron-store');

const defaults = {
	cgsServer: {
		IP: '127.0.0.1',
		Port: 5250,
		Queue: 1,
		Channel: 1
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
			dataSource: 'jumpers.csv'
		},
		ceremonyBB: {
			template: '',
			keys: ['f0', 'f1', 'f2', 'f3'],
			layer: 22,
			sendJSON: false,
			defaultPlayTime: 7,
			selectOptions: [
				'AK 0 (30+) weiblich',
				'AK 0 (30+) männlich',
				'AK 1 (19+) weiblich',
				'AK 1 (19+) männlich',
				'AK 2 (16-18) weiblich',
				'AK 2 (16-18) männlich',
				'AK 3 (14-15) weiblich',
				'AK 3 (14-15) männlich',
				'AK 4 (12-13) weiblich',
				'AK 4 (12-13) männlich'
			]
		}
	}
};

module.exports = new Store({
	name: 'settings',
	fileExtension: 'config',
	watch: true,
	defaults
});
