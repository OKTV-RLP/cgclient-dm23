const Store = require('electron-store');

// const schema = {
//     cgsServer: {
//         IP: {
//             type: 'string',
//             format: 'ipv4',
//             default: '127.0.0.1',
//         },
//         Port: {
//             type: 'integer',
//             min: 1000,
//             default: 5250,
//         },
//         Queue: {
//             type: 'integer',
//             min: 1,
//             max: 2,
//             default: 1,
//         },
//     },
//     cgtTemplate: {
//         defaultBB: {
//             Name: {
//                 type: 'string',
//                 default: '',
//             },
//             Key1: {
//                 type: 'string',
//                 default: 'f0',
//             },
//             Key2: {
//                 type: 'string',
//                 default: 'f1',
//             },
//             Layer: {
//                 type: 'integer',
//                 min: 1,
//                 default: 20,
//             },
//             SendJSON: {
//                 type: 'boolean',
//                 default: false,
//             },
//             defaultPlayTime: {
//                 type: 'integer',
//                 min: 1,
//                 max: 20,
//                 default: 5,
//             },
//         },
//     },
// };

const defaults = {
    cgsServer: {
        IP: '127.0.0.1',
        Port: 5250,
        Queue: 1,
    },
    cgtTemplate: {
        defaultBB: {
            Name: '',
            Key1: 'f0',
            Key2: 'f1',
            Layer: 20,
            SendJSON: false,
            defaultPlayTime: 7,
        },
    },
};

module.exports = new Store({
    name: 'settings',
    fileExtension: 'config',
    watch: true,
    defaults,
});
