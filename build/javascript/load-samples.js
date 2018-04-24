"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
	var onload = function onload() {
		var proportion = samples.reduce(function (total, sample) {
			if (sample.sound.state() === "unloaded") {
				throw "Couldn't load sample " + sample.src;
			}
			return total + (sample.sound.state() === "loaded" ? 1 : 0);
		}, 0) / samples.length;
		var elements = [].concat(_toConsumableArray(document.querySelectorAll(".progress")));
		var loadingIndex = Math.floor(proportion * elements.length);
		var loadedIndex = loadingIndex - 1;
		for (var index = 0; index < elements.length; index += 1) {
			if (index <= loadingIndex) {
				elements[index].classList.add("loading");
			}
			if (index <= loadedIndex) {
				elements[index].classList.add("loaded");
			}
		}
		if (proportion === 1) {
			loaded();
		}
	};
	samples.map(function (sample) {
		var sound = new Howl({
			src: [sample.src],
			loop: sample.type === "background",
			onload: onload
		});
		sample.sound = sound;
		sample.volumes = {
			master: {
				current: 1,
				target: 1,
				ease: 1
			},
			override: {
				current: 1,
				target: 1,
				ease: 0.0008
			}
		};
		if (sample.type === "background") {
			sample.volumes.master = {
				current: 0,
				target: 0,
				ease: 0.003
			};
		}
	});
})();