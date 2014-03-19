/*
 * Single Window Application Template:
 * A basic starting point for your application.  Mostly a blank canvas.
 *
 * In app.js, we generally take care of a few things:
 * - Bootstrap the application with any data we need
 * - Check for dependencies like device type, platform version or network connection
 * - Require and open our top-level UI component
 *
 */
var platino = require("co.lanica.platino"),
	chipmunk2d = require('co.lanica.chipmunk2d'),
	animo = require("animo"),
	win = Ti.UI.createWindow(),
	game = platino.createGameView(),
	scene = platino.createScene();

//bootstrap and check dependencies
if (Ti.version < 3.2) {
	alert('Sorry - this application template requires Titanium Mobile SDK 3.2 or later');
}

// This is a single context application with multiple windows in a stack
(function() {
	//render appropriate components based on the platform and form factor
	var osname = Ti.Platform.osname,
		_W = Ti.Platform.displayCaps.platformWidth,
		_H = Ti.Platform.displayCaps.platformHeight,
		bg = platino.createSprite({
			width: _W,
			height: _H
		});		
	scene.add(bg);
	
	game.enableOnDrawFrameEvent = true;
	game.fps = 10;
	game.color(0,0,0);
	
	
	game.addEventListener("onload", function(e){
		var self = e.source,
			SCREEN = {
				width: 320,
				height: 568
			},
			scale = self.size.height / SCREEN.height;
		
		self.screen = {
			width: self.size.width / scale,
			height: self.size.height / scale
		};
		self.touchScaleX = self.screen.width / self.size.width;
		self.touchScaleY = self.screen.height / self.size.height;
		
		self.pushScene(scene);
		
		self.start();
		skeleton = animo.createSkeletonWithFile('assets/skeletons/redman_Redman.json');
		skeleton.setPosition(SCREEN.width/2, SCREEN.height/2);
		skeleton_animation = animo.createSkeletalAnimationWithFile('assets/skeletons/animations/UntitledAnimation.json');
		skeleton.playAnimation(skeleton_animation);
	});

	win.add(game);
	win.open();
})();
