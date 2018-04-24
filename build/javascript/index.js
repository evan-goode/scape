"use strict";

if (navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
	alert("scape isn't compatible with iOS Safari yet. You may notice some " + "audio issues.");
}

var playRandom = function playRandom() {
	var sample = chance.weighted(random, random.map(function (sample) {
		return sample.weight;
	}));
	sample.sound.play();
	sample.volumes.master.target = chance.floating({ min: 0.5, max: 1 });
	var pan = chance.pickone([1, -1]) * chance.floating({ min: 0.3, max: 1 });
	sample.sound.stereo(pan);
	triggerRandom();
};
var triggerRandom = function triggerRandom() {
	setTimeout(playRandom, chance.integer({
		min: 10 * SECOND,
		max: 20 * SECOND
	}));
};

var start = function start() {
	document.querySelector(".main").classList.remove("hidden");
	document.querySelector(".instructions").classList.add("hidden");
	// samples.map((sample) => {
	// 	if (sample.type === "intro") {
	// 		sample.sound.play();
	// 	}
	// });
	setTimeout(function () {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = backgrounds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var sample = _step.value;

				sample.sound.play();
				sample.volumes.master.target = 1;
			}
			// triggerRandom();
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}, 0 * SECOND); // TODO intro length
};
var loaded = function loaded() {
	window.started = false;
	var triggerStart = function triggerStart() {
		if (!window.started) {
			window.started = true;
			start();
		}
	};
	document.querySelector(".instructions").classList.remove("hidden");
	window.addEventListener("touchend", triggerStart);
	window.addEventListener("click", triggerStart);
};