import { readable, writable } from 'svelte/store';

// Current Time
export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 500);

	return function stop() {
		clearInterval(interval);
	};
});

// CSV Data
export const jumpers = writable([]);
