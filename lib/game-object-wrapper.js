function transitionPos(key, x, y, z, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endPosition = newVector(x, y, z);

	return function(obj, time, player, colllidedObject, inGaze, etc){
		var state = obj.state;

		if (getState(state, "moveKey") !== key) {
			return;
		}
		
		if(!started){
			started = true;
			startTime = time;
		}
		
		if(startTime >= totalTime){
			setPosition(obj, endPosition);
			started = false;
			onComplete(obj);
				return;
		}
		
		setPosition(obj,
			lerpVector(obj.position, endPosition, startTime/totalTime));
	}
}

function transitionColour(r, g, b, a, totalTime, onComplete){
	var started = false;
	var startTime = 0;
	var endColour = newColour(r, g, b, a);
	
	return function(obj, time){
		var state = obj.state;

		if (getState(state, "colourKey") !== key) {
			return;
		}
		
		if(!started){
			started = true;
			startTime = time;
		}
		
		if(startTime >= totalTime){
			setColour(obj, endColour);
				return;
		}
		
		//Broadcast, sound etc
		
		setColour(obj,
			lerpColour(
				obj.colour, 
				endColour, 
				startTime/totalTime));
	}
}

var getState(obj, keyName){
	return getObjectState(obj, keyName);
}

var setState = function(obj, keyName, value) {
	setObjectState(obj, keyName, value);
}

//Make move keys like on/off switches for all keys, so 'movea' etc

var setMoveKey = function(moveKey) {
	return function(obj) {
		setState(obj, 'moveKey', moveKey);
	}
}

