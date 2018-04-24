"use strict";

(function () {
	var tuna = new Tuna(Howler.ctx);
	var convolver = new tuna.Convolver({
		highCut: 22050,
		lowCut: 20,
		dryLevel: 1,
		wetLevel: 0.3,
		level: 1,
		impulse: "node_modules/tunajs/impulses/impulse_rev.wav",
		bypass: 0
	});
	Howler.addEffect(convolver);
	// navigator.mediaDevices.getUserMedia({
	// 	audio: true,
	// 	video: false,
	// }).then((stream) => {
	// 	const source = Howler.ctx.createMediaStreamSource(stream);
	// 	const delay = new tuna.Delay({
	// 		feedback: 0.7, // 0 to 1+
	// 		delayTime: 150, // 1 to 10000 milliseconds
	// 		wetLevel: 0.25, // 0 to 1+
	// 		dryLevel: 1, // 0 to 1+
	// 		cutoff: 2000, // cutoff frequency, 20 to 22050
	// 		bypass: 0,
	// 	});
	// 	const moog = new tuna.MoogFilter({
	// 		cutoff: 0.3, // 0 to 1
	// 		resonance: 3.5, // 0 to 4
	// 		bufferSize: 4096, // 256 to 16384
	// 	});
	// 	const gain = new tuna.Gain({
	// 		gain: 1 // 0 and up
	// 	});
	// 	source.connect(delay);
	// 	delay.connect(moog);
	// 	moog.connect(gain);
	// 	gain.connect(Howler.ctx.destination);
	// });
})();