function gameloop() {
	//Initialization
	window.game = new gdjs.RuntimeGame(gdjs.projectData, {});

	//Create a renderer
	window.game.getRenderer().createStandardCanvas(document.body);

	//Bind keyboards/mouse/touch events
	window.game.getRenderer().bindStandardEvents(window.game.getInputManager(), window, document);

	//Load all assets and start the game
	window.game.loadAllAssets(function() {
		window.game.startGameLoop();
		window.status = false
		window.scenestack = window.game.getSceneStack()
	});
	document.querySelector('#game').disabled = true;
}

function stoploop() {
	document.querySelector('#loop').disabled = true;
	document.querySelector('#reloop').disabled = false;
	window.game.pause(true)
}

function reloop() {
	document.querySelector('#loop').disabled = false;
	document.querySelector('#reloop').disabled = true;
	window.game.pause(false)
}

function enablehitboxes() {
	var scene = window.scenestack.getCurrentScene()
	gdjs.evtTools.debuggerTools.enableDebugDraw(scene, true, true, true, true)
	document.querySelector('#enableh').disabled = true;
	document.querySelector('#disableh').disabled = false;
}

function disablehitboxes() {
	var scene = scenestack.getCurrentScene()
	gdjs.evtTools.debuggerTools.enableDebugDraw(scene, false, true, true, true)
	document.querySelector('#enableh').disabled = false;
	document.querySelector('#disableh').disabled = true;
}

function getallvariables() {
	var vars = JSON.stringify(window.scenestack.getCurrentScene().getVariables()._variables.items)
	var opened = window.open("");
	opened.document.write(vars)
}
		
function getallglobalvariables() {
	var vars = JSON.stringify(window.scenestack.getCurrentScene().getGame().getVariables()._variables.items)
	var opened = window.open("");
	opened.document.write(vars)
}

function editvariable() {
    var a = document.getElementById("varscope");
    var value = a.value;
    if (value == "scene") {
        if (isNaN(document.getElementById('varvalue').value) == false) {
            window.scenestack.getCurrentScene().getVariables().get(document.getElementById('varname').value).setNumber(parseInt(document.getElementById('varvalue').value))
        }
        if (document.getElementById('varvalue').value == "true" || document.getElementById('varvalue').value == "false") {
            if (String(document.getElementById('varvalue').value) == "true") { 
                window.scenestack.getCurrentScene().getVariables().get(document.getElementById('varname').value).setBoolean(true)
            } else {
                window.scenestack.getCurrentScene().getVariables().get(document.getElementById('varname').value).setBoolean(false)
            }
        }
        else {
            window.scenestack.getCurrentScene().getVariables().get(document.getElementById('varname').value).setString(document.getElementById('varvalue').value)
        }
    }

    if (value == "global") {
        if (isNaN(document.getElementById('varvalue').value) == false) {
            window.scenestack.getCurrentScene().getGame().getVariables().get(document.getElementById('varname').value).setNumber(parseInt(document.getElementById('varvalue').value))
        }
        if (document.getElementById('varvalue').value == "true" || document.getElementById('varvalue').value == "false") {
            if (String(document.getElementById('varvalue').value) == "true") { 
                window.scenestack.getCurrentScene().getGame().getVariables().get(document.getElementById('varname').value).setBoolean(true)
            } else {
                window.scenestack.getCurrentScene().getGame().getVariables().get(document.getElementById('varname').value).setBoolean(false)
            }
        }
        else {
            window.scenestack.getCurrentScene().getGame().getVariables().get(document.getElementById('varname').value).setString(document.getElementById('varvalue').value)
        }
    }
	
}	

function getallobjects() {
    try {
        var finaljson = {}
        var objs = JSON.stringify(gdjs.RuntimeObject._identifiers.items);
        var objjson = JSON.parse(objs)
        for (const [key, value] of Object.entries(objjson)) {
            var objstr = key.toString()
            var obj = window.scenestack.getCurrentScene().getObjects(key)[0]
            var x_pos = obj.x
            var y_pos = obj.y
            var angle = obj.angle
            var opacity = obj.opacity
            var z_order = obj.zOrder
            try {
                var tint =	obj._color.toString();
            } catch{
                console.log("[GDJS Toolkit] Could not get tint of object " + objstr)
            }
            try {
                var variables = JSON.stringify(obj.getVariables()._variables._variables.items)
            } catch {
                console.log("[GDJS Toolkit] Could not get Variables of object " + objstr)
                var variables = "{}"
            }
            finaljson[objstr] = {x: 1, y: 1, z: 1, opacity: 0, angle: 0, vars: "{}", tint: ""}
            finaljson[objstr]['x'] = x_pos
            finaljson[objstr]['y'] = y_pos
            finaljson[objstr]['z'] = z_order
            finaljson[objstr]['opacity'] = opacity
            finaljson[objstr]['angle'] = angle
            finaljson[objstr]['vars'] = variables
            finaljson[objstr]['tint'] = tint
        }

        var opened = window.open("");
        opened.document.write(JSON.stringify(finaljson))
    } catch {
        console.log("[GDJS Toolkit] object error on object " + objstr)
	    return
    }
}

function editobjectattribute() {
    var e = document.getElementById("objattr");
    var value = e.value;
    var objstr = document.getElementById('nameobj').value;
    var val = parseInt(document.getElementById('enume').value);
    var obj = window.scenestack.getCurrentScene().getObjects(objstr)[0]
    if (value == "x") {
        obj.setX(val)
    }
    if (value == "y") {
        obj.setY(val)
    }
    if (value == "z") {
        obj.setZOrder(val)
    }
    if (value == "op") {
        obj.setOpacity(val)
    }
    if (value == "an") {
        obj.setAngle(val)
    }
}
