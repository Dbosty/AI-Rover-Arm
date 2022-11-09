//speeds
let avg_speed = 0;
let turn_speed = 0;

//handle keypressess

let up_key = false;
let down_key = false;
let left_key = false;
let right_key = false;
let shift_key = false;
let space_key = false;
let letters = {}
    
letters["a"] = false;
letters["b"] = false;
letters["c"] = false;
letters["d"] = false;
letters["e"] = false;
letters["f"] = false;


//for mouse control isntead of keyboard
document.getElementById("up-arrow").onclick = function() {
    up_key = true;
    sendCommands();

    up_key = false;
}
document.getElementById("down-arrow").onclick = function() {
    down_key = true;
    sendCommands();

    down_key = false;
}
document.getElementById("left-arrow").onclick = function() {
    left_key = true;
    sendCommands();

    left_key = false;
}
document.getElementById("right-arrow").onclick = function() {
    right_key = true;
    sendCommands();
    right_key = false;
}
document.getElementById("space").onclick = function() {
    space_key = true;
    sendCommands();
    space_key = false;
}

for (let i = 0; i < letters.length; i++) {
    document.getElementById(letters.keys(ahash)[i] + "-key").onclick = function() {
        letters[letters.keys(ahash)[i]] = true;
    }
}



document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 38:
            up_key = true;
            document.getElementById("up-arrow").className += " dark-arrow-div"
            break;


        case 40:
            down_key = true;
            document.getElementById("down-arrow").className += " dark-arrow-div"
            break;

        case 37:
            left_key = true;
            document.getElementById("left-arrow").className += " dark-arrow-div"
            break;

        case 39:
            right_key = true;
            document.getElementById("right-arrow").className += " dark-arrow-div"
            break;

        case 16:
            shift_key = true;
            break;
        case 32:
            space_key = true;
            document.getElementById("space").className += " dark-arrow-div"
            break;
            //letters begin here
        case 65:
            letters["a"] = true;
            document.getElementById("a-key").className += " dark-arrow-div";
            break;
        case 66:
            letters["b"] = true;
            document.getElementById("b-key").className += " dark-arrow-div";
            break;
        case 67:
            letters["c"] = true;
            document.getElementById("c-key").className += " dark-arrow-div";
            break;
        case 68:
            letters["d"] = true;
            document.getElementById("d-key").className += " dark-arrow-div";
            break;
        case 69:
            letters["e"] = true;
            document.getElementById("e-key").className += " dark-arrow-div";
            break;
        case 70:
            letters["f"] = true;
            document.getElementById("f-key").className += " dark-arrow-div";
            break;


    }

    sendCommands()

}


document.onkeyup = function(e) {
    switch (e.keyCode) {
        case 38:
            up_key = false;
            document.getElementById("up-arrow").classList.remove("dark-arrow-div")
            break;

        case 40:
            down_key = false;
            document.getElementById("down-arrow").classList.remove("dark-arrow-div")
            break;


        case 37:
            left_key = false;
            document.getElementById("left-arrow").classList.remove("dark-arrow-div")
            break;


        case 39:
            right_key = false;
            document.getElementById("right-arrow").classList.remove("dark-arrow-div")
            break;
        case 16:
            shift_key = false;
            break;
        case 32:
            space_key = false;
            document.getElementById("space").classList.remove("dark-arrow-div")
            break;

            //letters begin here
        case 65:
            letters["a"] = false;
            document.getElementById("a-key").classList.remove("dark-arrow-div");
            break;
        case 66:
            letters["b"] = false;
            document.getElementById("b-key").classList.remove("dark-arrow-div");
            break;
        case 67:
            letters["c"] = false;
            document.getElementById("c-key").classList.remove("dark-arrow-div");
            break;
        case 68:
            letters["d"] = false;
            document.getElementById("d-key").classList.remove("dark-arrow-div");
            break;
        case 69:
            letters["e"] = false;
            document.getElementById("e-key").classList.remove("dark-arrow-div");
            break;
        case 70:
            letters["f"] = false;
            document.getElementById("f-key").classList.remove("dark-arrow-div");
            break;

    }


}



function getSpeeds() {
    var l = 0;
    var r = 0;


    arrowResults = useArrows();
    if (arrowResults != null) {
        l = arrowResults[0];
        r = arrowResults[1];

    } else {}


    return { l: l, r: r };
}

var tout = 50;
var drive_active = false;
var arm_active = false;

function useArrows() {
    speeds = new Array();
    // the following isnt great code but it works




    if (left_key) {
        turn_speed -= 30;
    } else if (right_key) {

        turn_speed += 30;
    } else if (up_key) {
        avg_speed += 30
    } else if (down_key) {
        avg_speed -= 30;
    } else if (space_key) {
        avg_speed = 0;
        turn_speed = 0;
    }

    l_speed = avg_speed + turn_speed;
    r_speed = avg_speed - turn_speed;

    if (Math.abs(l_speed) < 120 && l_speed != 0) {
        if (l_speed > 0) {
            l_speed = 120;
        } else {
            l_speed = -120;
        }
    }


    if (Math.abs(r_speed) < 120 && r_speed != 0) {
        if (r_speed > 0) {
            r_speed = 120;
        } else {
            r_speed = -120;
        }
    }
    l_speed = clip(l_speed, -255, 255);
    r_speed = clip(r_speed, -255, 255);

    speeds.push(l_speed);
    speeds.push(r_speed);
    return speeds;


}

function getArmCommand() {
    if (!sliders.inited)
        return "";

    var cmd = "";
    for (i = 0; i < sliders.s.length; i++) {
        var s = sliders.s[i];
        if (s.x == 0)
            continue;
        var str = s.id.substr(6) + ":";
        var val = s.x / sliders.size * 10;
        if (i > 5) //xy sliders
            val *= 2;
        val = Math.round((val + Number.EPSILON) * 100) / 100;
        if (s.invert)
            val = -val;
        str += (val > 0 ? "+" : "") + val;
        if (cmd != "")
            cmd += ",";
        cmd += str;
    }
    arm_active = (cmd != "");
    return cmd;
}

function getDriveCommand() {
    var cmd = "";
    var speeds = getSpeeds();
    cmd = "L:" + speeds.l + ",R:" + speeds.r;
    drive_active = (speeds.l != 0 || speeds.r != 0);
    return cmd;
}

var last_status = {};
var last_name = "";

function sendCommands() {
    var drivecmd = getDriveCommand();
    var armcmd = getArmCommand();

    if (armcmd != "" && drivecmd != "")
        drivecmd += ",";
    drivecmd += armcmd;
    //ex( direct + encodeURIComponent(drivecmd) );
    execAjaxSimpleJson(direct + encodeURIComponent(drivecmd), "",
        onResp, networkError);
    //console.log( "sending " + drivecmd );
    if (!drive_active && !arm_active) {
        if (tout < 1000)
            tout += 50; //slow down the sending since not driving
    } else
        tout = 50; //keep sending quickly
    
}

function sendArmCommand(pos) {
    execAjaxSimpleJson(direct + encodeURIComponent(pos), "",
        onResp, networkError);

    function onResp(r) {
        if (r.error == 0) {
            last_status = r.status;
            if (last_status && hasProp(last_status, "err_seq"))
                showError("Error in app");
        }
    }
}

function createJoystick(parent) {
    const maxDiff = did("wrapper").offsetHeight / 2;
    let dragStart = null;
    let currentPos = { x: 0, y: 0 };


    stick = did("joystick");
    stick.addEventListener('mousedown', handleMouseDown); //, {passive:true});
    document.addEventListener('mousemove', handleMouseMove); //, {passive:true});
    document.addEventListener('mouseup', handleMouseUp); //, {passive:true});
    stick.addEventListener('touchstart', handleMouseDown); //, {passive:true});
    document.addEventListener('touchmove', handleMouseMove); //, {passive:true});
    document.addEventListener('touchend', handleMouseUp); //, {passive:true});
    did('wrapper').addEventListener('wheel',
        function(e) {
            e.preventDefault();
        }, false);
    did('wrapper').addEventListener('touchmove',
        function(e) {
            e.preventDefault();
        }, false);
    stick.style.transform = `translate3d(50%, 50%, 0px)`;
    parent.appendChild(stick);

    function handleMouseDown(event) {
        stick.style.transition = '0s';
        if (event.changedTouches) {
            dragStart = {
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY,
            };
            return;
        }
        dragStart = {
            x: event.clientX,
            y: event.clientY,
        };

    }

    function handleMouseMove(event) {
        if (dragStart === null)
            return;
        event.preventDefault();
        if (event.changedTouches) {
            event.clientX = event.changedTouches[0].clientX;
            event.clientY = event.changedTouches[0].clientY;
        }
        var xDiff = event.clientX - dragStart.x;
        var yDiff = event.clientY - dragStart.y;
        const xDir = xDiff / Math.abs(xDiff);
        const yDir = yDiff / Math.abs(yDiff);

        const distanceX = Math.min(maxDiff, Math.abs(xDiff));
        const distanceY = Math.min(maxDiff, Math.abs(yDiff));
        const xNew = (distanceX * xDir) + did("joystick").offsetWidth / 2;
        const yNew = (distanceY * yDir) + did("joystick").offsetHeight / 2;
        stick.style.transform = `translate3d(${xNew}px , ${yNew}px, 0px)`;
        currentPos = {
            x: Math.floor((distanceX / (did("joystick").offsetHeight)) * 254) * xDir,
            y: -Math.floor((distanceY / (did("joystick").offsetWidth)) * 253) * yDir
        };
    }

    function handleMouseUp(event) {
        if (dragStart === null) return;
        stick.style.transition = '.2s';
        stick.style.transform = `translate3d(50%, 50%, 0px)`;
        dragStart = null;
        currentPos = { x: 0, y: 0 };
        stop();
    }
    return {
        getPosition: () => currentPos,
    };

}