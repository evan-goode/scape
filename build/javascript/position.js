"use strict";

(function () {
	var setPosition = function setPosition(position) {
		var coordinates = [position.coords.latitude, position.coords.longitude];
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = backgrounds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var sample = _step.value;

				var closest = findClosestPoint(coordinates, sample.region.a, sample.region.b);
				sample.sound.pos(closest[0] * MULTIPLIER, 0, closest[1] * MULTIPLIER);
			}
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

		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = special[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var _sample = _step2.value;

				var closest = findClosestPoint(coordinates, _sample.region.a, _sample.region.b);
				if (!_sample.played && window.started && coordinates[0] === closest[0] && coordinates[1] === closest[1]) {
					console.log("playing crash");
					_sample.played = true;
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;

					try {
						for (var _iterator3 = samples[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var other = _step3.value;

							if (other.type !== "special") {
								other.volumes.override.target = 0;
							}
						}
					} catch (err) {
						_didIteratorError3 = true;
						_iteratorError3 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion3 && _iterator3.return) {
								_iterator3.return();
							}
						} finally {
							if (_didIteratorError3) {
								throw _iteratorError3;
							}
						}
					}

					_sample.sound.play();
					setTimeout(function () {
						var _iteratorNormalCompletion4 = true;
						var _didIteratorError4 = false;
						var _iteratorError4 = undefined;

						try {
							for (var _iterator4 = samples[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
								var _other = _step4.value;

								if (_other.type !== "special") {
									_other.volumes.override.target = 1;
								}
							}
						} catch (err) {
							_didIteratorError4 = true;
							_iteratorError4 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion4 && _iterator4.return) {
									_iterator4.return();
								}
							} finally {
								if (_didIteratorError4) {
									throw _iteratorError4;
								}
							}
						}
					}, 1 * MINUTE);
				}
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

		Howler.pos(coordinates[0] * MULTIPLIER, 0, coordinates[1] * MULTIPLIER);
	};
	navigator.geolocation.watchPosition(setPosition);

	/**
  * find the closest point within a rectangle to another point
  * @param {array} point the point to approximate
  * @param {array} a the bottom-left corner of the rectangle
  * @param {array} b the top-right corner of the rectangle
  * @return {array} the closest point within the rectangle to the given
  *                 point
  */
	var findClosestPoint = function findClosestPoint(point, a, b) {
		var closest = [];
		for (var dimension = 0; dimension < point.length; dimension += 1) {
			if (point[dimension] < a[dimension]) {
				closest[dimension] = a[dimension];
			} else if (point[dimension] > b[dimension]) {
				closest[dimension] = b[dimension];
			} else {
				closest[dimension] = point[dimension];
			}
		}
		return closest;
	};
})();