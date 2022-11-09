function showerror(msg) {
    show("errmsg");
    did("errmsg").innerHTML = msg;
    window.setTimeout("did('errmsg').innerHTML='';hide('errmsg');", 2000);
}
showError = showerror;

function networkError() { }
function onDoNothing(r) { }
function clip(v, vmin, vmax) {
    if (v < vmin) v = vmin;
    if (v > vmax) v = vmax;
    return v;
}
var base_cmd = "/command?cmd=";
var action = base_cmd + "action&v1=";
var direct = base_cmd + "direct&v1=";
var config = { "arm": true, "drive": true, "camera": true};

function ex(url) {
    //console.log( "going to " + url );
    execAjaxSimpleJson(url, "", onDoNothing, networkError);
}
function loadConfig() {
    execAjaxSimpleJson("/config.json", "", onResp, networkError);
    function onResp(r) {
        config = r;
        start();
    }
}
function incrSpeed() {
    ex(action + "up");
}
function decrSpeed() {
    ex(action + "down");
}
function left() {
    ex(action + "left");
}
function stop() {
    ex(action + "+"); //space
}
function armhome() {
    ex(action + "h");
}
function right() {
    ex(action + "right");
}
function sendSpeedToRobot(l, r) {
    ex(direct + "L:" + l + ",R:" + r);
}

function goTop() {
    window.scrollTo(0, 0);
}
function showTop(n) {
    show(n);
    goTop();
}
function showMessage(m) {
    did("mmessagecontent").innerHTML = m;
    showTop("mmessage");
}

function msgClose(m) {
    showMessage(m + "<div class='btn' style='margin:20px' onclick='hide(\"mmessage\")' >Close</div>");
}

function msgAsk(m, onYes) {
    showMessage(m +
        "<div class='btn' style='margin:20px' onclick='hide(\"mmessage\");" + onYes + "' >Yes</div>" +
        "<div class='btn' style='margin:20px' onclick='hide(\"mmessage\")' >No</div>"
    );
}

function reboot() {
    ex(base_cmd + "reboot");
    hide("power");
    showError("Rebooting");

}
function homeandreboot() {
    armhome();
    window.setTimeout(reboot, 100);
}


function shutdown() {
    hide("power");
    ex(base_cmd + "shutdown");
    showError("Shutting down..");
}
function homeandshutdown() {
    goTop();
    hide("shutdowndlg");
    armhome();
    showMessage("Shutting down..this page will not be accessible anymore until you physically power off and power on the Pi<br/><div class='bbtn' style='margin:20px' onclick='window.location.reload();return false;'>Reload</div> to access again after powering up");
    window.setTimeout(shutdown, 100);
}


var img_first_fetch = true;
var got_img = false;
function oncamimgload() {
    //hide the ask button since
    //camera was already on
    //so should just show it
    got_img = true;
    if (img_first_fetch) {
        hide("camask");
        did("camdiv").style.display = "";
        hide("power");
    }
    img_first_fetch = false;
}

var camon = true; //by default
function camerapwr(on) {
    hide("camask");
    if (on) {
        did("camdiv").style.display = "";
        hide("power");
        showError("Turning camera on, wait a few seconds");
    }
    else {
        did("camdiv").style.display = "none";
        hide("power");
        showError("Turning camera off");
    }

    camon = on;
    service("camera", (on ? "start" : "stop"));
    //ex( base_cmd + (on?"servicestart":"servicestop") + "&v1=camera" );
}



function reverseString(str) {
    return str.split("").reverse().join("");
}

var camtimeout = null;
var ctr = 0;
function reloadcamimg() {
    if (camtimeout)
        window.clearTimeout(camtimeout);
    camtimeout = window.setTimeout(getcamimg, 1000);
}
function getcamimg() {
    if (!config["camera"])
        return;
    ctr++;
    if (camon) {
        did("camimg").src = "/cameraimg?ctr=" + ctr;
        camtimeout = window.setTimeout(getcamimg, 300);
    }
    else {
        camtimeout = window.setTimeout(getcamimg, 500);
    }
}
function start() {
    if (config["arm"])
        initSliders();
    if (config["camera"])
        camtimeout = window.setTimeout(getcamimg, 1000);

    sendtimeout = window.setTimeout(sendCommands, 100);
}


var tabdivs = ["drivecontrol", "armcontrol"];
var numtabs = tabdivs.length;
function tabsel(t) {
    //console.log( "Received " + t );
    for (i = 0; i < numtabs; i++) {
        did('tab' + i).className = "tab" + (i == t ? " sel" : "");
        var d = ((i == t) ? "" : "none");
        did(tabdivs[i]).style.display = d;
        //console.log( "Setting " + tabdivs[i] + " to " + d );
    }
    if (tabdivs[t] == "armcontrol")
        initSliders();
}
function seltab(name) {
    for (i = 0; i < numtabs; i++) {
        if (tabdivs[i] == name) {
            tabsel(i);
            break;
        }
    }
}
function pwr(on) {
    ex(direct + (on ? "on" : "off"));
}



function getpositionstr() {
    var p = [];
    var names = ["a", "b", "c", "d", "e", "f"];
    for (i = 0; i < names.length; i++) {
        var pos = did("pos-" + names[i]).value;
        if (pos != "")
            p.push(names[i] + ":" + pos);
    }
    return p.join(",");
}






function showpower(t) {
    sho("power", t);
}

function set90() {
    ex(direct + "set90");
    showError("Done");
}

function armcmd(cmd) {
    ex(direct + encu(cmd));
}

