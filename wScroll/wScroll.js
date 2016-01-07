wScrollSpeed = 0.15;
wScrollList = [];

function wScroll(id, heig) {
	window.addEventListener('load', function () {
		document.getElementById(id).innerHTML = "<div class='wScrollConent' id='" + id + "_content'><div class='wScrollScrollBar' id='" + id + "_bar'><div class='wScrollScroll' id='" + id + "_scroll'></div></div><div class='wScrollScrolling' id='" + id + "_scrolling'>" + document.getElementById(id).innerHTML + "</div></div>";
		
		var heigh = parseInt(heig);
		if (heigh > 0) {
			heigh = heigh + "px";
		} else {
			heigh = document.getElementById(id).offsetHeight + "px";
			
		}
		document.getElementById(id + "_content").style.height = heigh;
		document.getElementById(id + "_bar").style.height = heigh;
		
		document.getElementById(id).addEventListener("mousewheel", wScrollMove, false);
		document.getElementById(id).addEventListener("keydown", wScrollMove, false);
		
		document.getElementById(id).destinationPosition = 0;
		document.getElementById(id).marginPosition = 0;
		document.getElementById(id).invoked = false;
		document.getElementById(id).maxHeight = document.getElementById(id + "_content").offsetHeight;
		document.getElementById(id).scrollingHeight = document.getElementById(id + "_scrolling").offsetHeight;
		
		wScrollList.push(document.getElementById(id));
		wScrollSizeChange(true);
	});
}

(function wScrollSizeLoop() {
	setTimeout(function(){wScrollSizeChange(); wScrollSizeLoop();}, 500);
	
})();
 
function wScrollMove(e) {
	var evt = window.event || e;
	var delta = evt.detail ? evt.detail : evt.wheelDelta;
	var keyCode = evt.keyCode;
	
	console.log(keyCode);
	
    if (evt.stopPropagation) {
        evt.stopPropagation();
    } else {
        evt.cancelBubble = true;
    }
	
	//console.log(delta);
	//console.log(this.id);
	//console.log(this.destinationPosition);
	//console.log(this.maxHeight);
	//console.log(this.scrollingHeight);
	//console.log(this.invoked);
	
	if (!this.smaller) {
		if ((this.destinationPosition > 0 && delta > 0) || (this.destinationPosition < 0 && delta < 0)) {
			this.destinationPosition += delta;
		} else if ((this.destinationPosition == 0) || (this.destinationPosition > 0 && delta < 0) || (this.destinationPosition < 0 && delta > 0)) {
			this.destinationPosition = delta;
		}
		
		if (!this.invoked) {
			this.invoked = true;
			wScrolling(this);
		}
	}
	
	if (evt.preventDefault) {
		evt.preventDefault();
	} else {
		return false;
	}
}

function wScrolling(element) {
	
	var delta = element.destinationPosition * wScrollSpeed;
	element.destinationPosition = element.destinationPosition - delta;
	
	if (element.destinationPosition < 1 && element.destinationPosition > -1) {
		element.destinationPosition = 0;
		delta = 0;
		element.invoked = false;
	}
	element.marginPosition += delta;
	
	if (element.marginPosition < element.maxHeight - element.scrollingHeight) {
		element.marginPosition = element.maxHeight - element.scrollingHeight;
		element.destinationPosition = 0;
	} else if (element.marginPosition > 0) {
		element.marginPosition = 0;
		element.destinationPosition = 0;
	}
	
	document.getElementById(element.id + "_scrolling").style.marginTop = element.marginPosition + "px";
	document.getElementById(element.id + "_scroll").style.marginTop = - element.maxHeight / element.scrollingHeight * element.marginPosition + "px";
	
	if (element.invoked) {
		setTimeout(function(){ wScrolling(element); }, 10);
	}
}

function wScrollSizeChange(force) {
	for(i = 0; i < wScrollList.length; i++) {
		if (document.getElementById(wScrollList[i].id + "_scrolling").offsetHeight != wScrollList[i].scrollingHeight || force) {
			wScrollList[i].scrollingHeight = document.getElementById(wScrollList[i].id + "_scrolling").offsetHeight;
			wScrollList[i].scrollSize = Math.pow(wScrollList[i].maxHeight, 2) / wScrollList[i].scrollingHeight;
			
			if (document.getElementById(wScrollList[i].id).scrollingHeight < document.getElementById(wScrollList[i].id).maxHeight) {
				document.getElementById(wScrollList[i].id + "_bar").style.visibility = "hidden";
				document.getElementById(wScrollList[i].id + "_content").style.paddingRight = "0px";
				wScrollList[i].smaller = true;
			} else {
				document.getElementById(wScrollList[i].id + "_bar").style.visibility = "";
				document.getElementById(wScrollList[i].id + "_content").style.paddingRight = "";
				wScrollList[i].smaller = false;
			}
			
			document.getElementById(wScrollList[i].id + "_scroll").style.height = wScrollList[i].scrollSize + "px";
			
			//console.log(document.getElementById(wScrollList[i].id + "_scroll").style.height);
			
			//wScrollList[i] = [wScrollList[i][0], document.getElementById(wScrollList[i][0] + "_scrolling").offsetHeight];
		}
	}
};

