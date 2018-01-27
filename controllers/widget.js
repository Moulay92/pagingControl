// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var currentIndex = 0,
    lastXpostion = 0, // last position of x scroll before scrolling
    currentPosition = 0, // the current x scroll position (when scrolling)
    swipeDistance = 80, // the distance that allows to swipe between pages;
    nbrOfViews = 0,
    params = args || {},
	densityFactor = OS_IOS ? 1 : Ti.Platform.displayCaps.logicalDensityFactor;

$.setViews = function(views, _params) {
	params = _params;
	$.pagingcontrol.scrollTo(0, 0); // init pagingcontrolview
	$.pagingcontrol.removeAllChildren(); // init pagingcontrolview

	var widthOfView = _params.widthOfView || views[0].getWidth();
	var margin = _params.margin || 15;
	params.widthOfView = widthOfView;
	params.margin = margin;
	nbrOfViews = views.length;
	for (var i = 0; i < nbrOfViews; i++) {
		var page = Ti.UI.createView({
			width : widthOfView,
			height : Ti.UI.SIZE,
			right : margin,
			left : (i == 0) ? margin : 0
		});
		page.add(views[i]);
		$.pagingcontrol.add(page);
	}

	if (_params.showIndicator) {
		cretePageIndicators(nbrOfViews);
	} else {
		$.pageIndicator.height = 0;
		$.pageIndicator.top = 0;
	}
};

$.moveToPage = function(_index) {
	if(_index < 0) return;
	currentIndex = _index;
	var widthOfView = params.widthOfView;
	var marign = params.margin;
	var PaginWidth = $.pagingcontrol.size.width;
	var sidePages = (PaginWidth - widthOfView - (2 * marign) ) / 2; // how much side pages must shown
	var scrolWidth = (_index * widthOfView) + (_index  * marign ) - sidePages;
	lastXpostion = (_index == 0) ? 0 : scrolWidth;
	if (_index == (nbrOfViews - 1)) {
		$.pagingcontrol.scrollToBottom();
	} else {
		$.pagingcontrol.scrollTo(lastXpostion, 0, {
			animated : true
		});
	}
	changeIndicator(currentIndex);
};

$.moveNext = function(){
	$.moveToPage(++currentIndex);
};
$.movePrevious = function(){
	$.moveToPage(--currentIndex);
};

function cretePageIndicators(nbrOfIndicators) {
	$.pageIndicator.removeAllChildren();
	for (var i = 0; i < nbrOfIndicators; i++) {
		var indicatorView = Ti.UI.createView({
			index : i,
			height : 6,
			width : 6,
			borderRadius : 3,
			backgroundColor : (i == 0) ? '#393e46' : '#b9bbbd',
			left : (i == 0) ? 0 : 6
		});
		$.pageIndicator.add(indicatorView);
	};
}

function changeIndicator(_index) {
	var indicatorsView = $.pageIndicator.getChildren();
	for (var i = 0; i < indicatorsView.length; i++) {
		indicatorsView[i].backgroundColor = (_index == indicatorsView[i].index) ? '#393e46' : '#b9bbbd';
		indicatorsView[i].borderColor = (_index == indicatorsView[i].index) ? '#393e46' : '#b9bbbd';
	}
}

function onScroll(e) {
	currentPosition = e.x / densityFactor;
}

function onDragend(e) {

	var diff = currentPosition - lastXpostion;
	if (diff > swipeDistance) {
		currentIndex++;
	} else if (diff < (swipeDistance * -1)) {
		currentIndex--;
	}
	$.moveToPage(currentIndex);
}

