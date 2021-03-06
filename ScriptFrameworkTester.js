function setup(){
	loadAssetFromUrl("https://raw.githubusercontent.com/Franimal/theta-ar-scripts/master/Models/lightsaber/scene.gltf", "lightsaber");
}

var saberHilt = null;
var saberBlade = null;

function start(){
	saberHilt = createItem("lightsaber");
	size(saberHilt, 0.3);
		
	saberBlade = cylinder();
	
	wrap(saberBlade)
		.scale(0.05, 0.02, 1)
		.rotate(0, -90, 90)
		.color(1, 0.1, 0, 0.8)
		.emit(1, 0.1, 0, 0.8);
		
	setParent(saberBlade, saberHilt);
	
	move(saberBlade, 0, 0, 1);
	
	disable(saberBlade);
	disable(saberHilt);		

	if(!isHololens()){
		wrap(floor(20, 0))
			.texture("https://i.imgur.com/kH7jfKt.png")
			.tileTexture(10, 10)
			.color(0, 0.3, 1, 0.9)
			.emit(0, 1, 1, 1);	
	}
	var obj = cube("Left");
	
	wrap(obj)
		.move(-0.5, 0, 2)
		.scale(0.1, 0.1, 0.1)
		.state({
			moveKey: 'a',
			colorKey: 'a',
			testKey: 'a'
		})
		.instructions([
			transitionColor("a", 1, 0, 0, 1, 1, setKey("colorKey", "b")), 
			transitionColor("b", 0, 1, 0, 1, 1, setKey("colorKey", "c")), 
			transitionColor("c", 0, 0, 1, 1, 1, setKey("colorKey", "d")), 
			transitionColor("d", 1, 1, 1, 0, 1, setKey("colorKey", "a"))		
		])
		.instruction(transitionPos("a", 0, 0, 1, 1, setKey("moveKey", "b")))
		.instruction(transitionPos("b", -0.2, 0, 1, 1, setKey("moveKey", "c"))) 
		.instruction(transitionPos("c", 0, 0, 1, 1, setKey("moveKey", "d")))
		.instruction(transitionPos("d", 0, 0.2, 1, 1, setKey("moveKey", "a")));
	
	var fadeCloseSphere = sphere("Sphere");	
	
	wrap(fadeCloseSphere)
		.move(0, 0, 3)
		.scale(0.2, 0.2, 0.2)
		.state({
			orbitKey: 'a'
		})
		.instruction(fadeWhenClose("fade", 10, 0.5, setKey("orbitKey", "a")));
	
	var sphere2 = createSphere("Sphere");
	wrap(sphere2)
		.move(0, 0, 4)
		.rotate(100, 0, 0)
		.scale(0.2, 0.2, 0.2)
		.state({
			orbitKey: 'a'
		})
		.instruction(orbitHorizontal("a", 1, 5, setKey("orbitKey`", "a")));
	
	var cube2 = cube("FlyUpCube")
	wrap(cube2)
		.move(1, 0, 2)
		.scale(0.1, 0.1, 0.1)
		.state({
			state: 'start',
			moveKey: 'a',
			colorKey: 'a'
		})
		.instructions([
			transitionColor("b", 0, 1, 0, 1, 1, setKey("state", "start")),
			playerDistanceTrigger("start", 1, function() {setKey("state", "do"); setKey("state", "do")}),
			transitionColor("do", 0, 1, 0, 1, 1, setKey("state", "do")),
			transitionPos("do", 0, 0.2, 1, 1, setKey("state", "do"))
		]);
		showSpatialMesh(true);
}

var recording = false;

function toggleVideoRecording(){
	if(recording){
		stopRecordingVideo();
	} else {
		recordVideo();
	}
}

function recordVideo(){
	recording = true;
	startVideoRecording();
}

function stopRecordingVideo(){
	recording = false;
	stopVideoRecording();
}

function bindPosition(gameObject){
	return function(transform){
		gameObject.position = transform.position;
	}
}

var saberEnabled = false;
var recording = false;

function reload(){
	reloadScript();
}

function update(time, player, left, right){
	if(left){		
		if(left.grasped){
			
		}
		if(left.menuPressed){
			if(!saberEnabled){
				saberEnabled = true;
				enable(saberHilt);
				leftHand(saberHilt);
				rotate(saberHilt, 45, 45, 0);
			}
		}
		if(left.selectPressed){
			if(!recording){
				recording = true;
				recordVideo();
			}
		} else {
			if(recording){
				recording = false;
				stopRecordingVideo();
			}
		}
	    if(left.touchpadPressed){
			
		}
		if(left.thumbstickPressed){

		}

		//log(left.selectPressedAmount);
		
		//log(left.touchpadPosition);

		//log(left.touchpadTouched);
		//log(left.thumbstickPosition);

	}   
}        
