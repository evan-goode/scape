"use strict";

(function () {
	window.addEventListener("deviceorientation", function (event) {
		var alpha = (event.alpha + 90) * Math.PI / 180;
		console.log(alpha);
		Howler.orientation(Math.cos(alpha), 0, Math.sin(alpha), 0, 1, 0);
	});
	// set a default orientation if we cannot get device orientation
	window.dispatchEvent(new DeviceOrientationEvent("deviceorientation", {
		alpha: 0
	}));

	// ease each volume of each sample to its respective target
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = samples[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var sample = _step.value;

			var _loop2 = function _loop2(key) {
				var volume = sample.volumes[key];
				var transition = volume.ease;
				var ease = function ease(object) {
					object.current = (1 - transition) * object.current + transition * object.target;
					window.requestAnimationFrame(function () {
						ease(object);
					});
				};
				ease(volume);
			};

			for (var key in sample.volumes) {
				_loop2(key);
			}
		}

		// set the volume of each sample to the product of each of its volumes
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

	var _loop = function _loop(_sample) {
		var set = function set(sample) {
			var values = Object.values(sample.volumes);
			var volume = values.reduce(function (total, current) {
				return total * current.current;
			}, 1);
			sample.sound.volume(volume);
			window.requestAnimationFrame(function () {
				return set(sample);
			});
		};
		set(_sample);
	};

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = samples[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var _sample = _step2.value;

			_loop(_sample);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}
})();