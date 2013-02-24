/*
 * draggable_options.js
 */
(function($) {

module("draggable: options");

// TODO: This doesn't actually test whether append happened, possibly remove
test("{ appendTo: 'parent' }, default, no clone", function() {
	expect( 2 );
	var el = $("#draggable2").draggable({ appendTo: "parent" });
	TestHelpers.draggable.shouldMove(el);

	el = $("#draggable1").draggable({ appendTo: "parent" });
	TestHelpers.draggable.shouldMove(el);

});

// TODO: This doesn't actually test whether append happened, possibly remove
test("{ appendTo: Element }, no clone", function() {
	expect( 2 );
	var el = $("#draggable2").draggable({appendTo: $("#draggable2").parent()[0] });

	TestHelpers.draggable.shouldMove(el);

	el = $("#draggable1").draggable({ appendTo: $("#draggable2").parent()[0] });
	TestHelpers.draggable.shouldMove(el);
});

// TODO: This doesn't actually test whether append happened, possibly remove
test("{ appendTo: Selector }, no clone", function() {
	expect( 2 );
	var el = $("#draggable2").draggable({ appendTo: "#main" });
	TestHelpers.draggable.shouldMove(el);

	el = $("#draggable1").draggable({ appendTo: "#main" });
	TestHelpers.draggable.shouldMove(el);
});

test("{ appendTo: 'parent' }, default", function() {

	expect(2);

	var el = $("#draggable1").draggable();

	TestHelpers.draggable.trackAppendedParent(el);

	equal( el.draggable( "option", "appendTo" ), "parent" );

	TestHelpers.draggable.move(el, 1, 1);
	equal( el.data("last_dragged_parent"), $("#qunit-fixture")[0] );

});

test("{ appendTo: Element }", function() {

	expect(1);

	var appendTo = $("#draggable2").parent()[0],
		el = $("#draggable1").draggable({ appendTo: appendTo });

	TestHelpers.draggable.trackAppendedParent(el);

	TestHelpers.draggable.move(el, 1, 1);
	equal( el.data("last_dragged_parent"), appendTo );

});

test("{ appendTo: jQuery }", function() {

	expect(1);

	var appendTo = $("#draggable2").parent(),
		el = $("#draggable1").draggable({ appendTo: appendTo });

	TestHelpers.draggable.trackAppendedParent(el);

	TestHelpers.draggable.move(el, 1, 1);
	equal( el.data("last_dragged_parent"), appendTo[0] );

});
test("{ appendTo: Selector }", function() {

	expect(1);


	var appendTo = "#main",
		el = $("#draggable1").draggable({ appendTo: appendTo });

	TestHelpers.draggable.trackAppendedParent(el);

	TestHelpers.draggable.move(el, 1, 1);
	equal( el.data("last_dragged_parent"), $(appendTo)[0] );

});


test("appendTo, default, switching after initialization", function() {

	expect(2);

	var el = $("#draggable1").draggable({ helper : "clone" });

	TestHelpers.draggable.trackAppendedParent(el);

	// Move and make sure el was appended to fixture
	TestHelpers.draggable.move(el, 1, 1);
	equal( el.data("last_dragged_parent"), $("#qunit-fixture")[0] );

	// Move and make sure el was appended to main
	el.draggable( "option", "appendTo", $("#main") );
	TestHelpers.draggable.move(el, 2, 2);
	equal( el.data("last_dragged_parent"), $("#main")[0] );

});

test("{ axis: false }, default", function() {
	expect( 1 );
	var el = $("#draggable2").draggable({ axis: false });
	TestHelpers.draggable.shouldMove(el);
});

test("{ axis: 'x' }", function() {
	expect( 1 );
	var el = $("#draggable2").draggable({ axis: "x" });
	TestHelpers.draggable.testDrag(el, el, 50, 50, 50, 0);
});

test("{ axis: 'y' }", function() {
	expect( 1 );
	var el = $("#draggable2").draggable({ axis: "y" });
	TestHelpers.draggable.testDrag(el, el, 50, 50, 0, 50);
});

test("{ axis: ? }, unexpected", function() {
	var el,
		unexpected = {
			"true": true,
			"{}": {},
			"[]": [],
			"null": null,
			"undefined": undefined,
			"function() {}": function() {}
		};

	expect( 6 );

	$.each(unexpected, function(key, val) {
		el = $("#draggable2").draggable({ axis: val });
		TestHelpers.draggable.testDrag(el, el, 50, 50, 50, 50, "axis: " + key);
		el.draggable("destroy");
	});
});

test("axis, default, switching after initialization", function() {

	expect(3);

	var el;

	// Any direction
	el = $("#draggable1").draggable({ axis : false });
	TestHelpers.draggable.testDrag(el, el, 50, 50, 50, 50);

	// Only horizontal
	el.draggable("option", "axis", "x");
	TestHelpers.draggable.testDrag(el, el, 50, 50, 50, 0);

	// Vertical only
	el.draggable("option", "axis", "y");
	TestHelpers.draggable.testDrag(el, el, 50, 50, 0, 50);

});

test("{ cancel: 'input,textarea,button,select,option' }, default", function() {
	expect( 2 );

	$("<div id='draggable-option-cancel-default'><input type='text'></div>").appendTo("#main");

	var el = $("#draggable-option-cancel-default").draggable({ cancel: "input,textarea,button,select,option" });
	TestHelpers.draggable.shouldMove(el);

	el.draggable("destroy");

	el = $("#draggable-option-cancel-default").draggable({ cancel: "input,textarea,button,select,option" });
	TestHelpers.draggable.testDrag(el, "#draggable-option-cancel-default input", 50, 50, 0, 0);
	el.draggable("destroy");
});

test("{ cancel: 'span' }", function() {
	expect( 2 );

	var el = $("#draggable2").draggable();
	TestHelpers.draggable.testDrag(el, "#draggable2 span", 50, 50, 50, 50);

	el.draggable("destroy");

	el = $("#draggable2").draggable({ cancel: "span" });
	TestHelpers.draggable.testDrag(el, "#draggable2 span", 50, 50, 0, 0);
});

test( "{ cancel: ? }, unexpected", function() {
	expect( 6 );

	var el,
		unexpected = {
			"true": true,
			"false": false,
			"{}": {},
			"[]": [],
			"null": null,
			"undefined": undefined
		};

	$.each( unexpected, function( key, val ) {
		el = $("#draggable2").draggable({ cancel: val });
		TestHelpers.draggable.shouldMove( el, "cancel: " + key );
		el.draggable("destroy");
	});
});

test("cancel, default, switching after initialization", function() {
	expect( 3 );

	$("<div id='draggable-option-cancel-default'><input type='text'></div>").appendTo("#main");

	var input = $("#draggable-option-cancel-default input"),
		el = $("#draggable-option-cancel-default").draggable();

	TestHelpers.draggable.testDrag(el, input, 50, 50, 0, 0);

	el.draggable("option", "cancel", "textarea" );
	TestHelpers.draggable.testDrag(el, input, 50, 50, 50, 50);

	el.draggable("option", "cancel", "input" );
	TestHelpers.draggable.testDrag(el, input, 50, 50, 0, 0);

});

/*

test("{ connectToSortable: selector }, default", function() {
	expect( 1 );

	ok(false, "missing test - untested code is broken code");
});

test("{ containment: false }, default", function() {
	expect( 1 );

	ok(false, "missing test - untested code is broken code");
});

test("{ containment: Element }", function() {
	expect( 1 );

	ok(false, "missing test - untested code is broken code");
});
*/

test("{ containment: 'parent' }, relative", function() {
	expect( 1 );

	var offsetAfter,
		el = $("#draggable1").draggable({ containment: "parent" }),
		p = el.parent(),
		po = p.offset(),
		expected = {
			left: po.left + TestHelpers.draggable.border(p, "left") + TestHelpers.draggable.margin(el, "left"),
			top: po.top + TestHelpers.draggable.border(p, "top") + TestHelpers.draggable.margin(el, "top")
		};

	el.simulate( "drag", {
		dx: -100,
		dy: -100
	});
	offsetAfter = el.offset();
	deepEqual(offsetAfter, expected, "compare offset to parent");
});

test("{ containment: 'parent' }, absolute", function() {
	expect( 1 );

	var offsetAfter,
		el = $("#draggable2").draggable({ containment: "parent" }),
		p = el.parent(),
		po = p.offset(),
		expected = {
			left: po.left + TestHelpers.draggable.border(p, "left") + TestHelpers.draggable.margin(el, "left"),
			top: po.top + TestHelpers.draggable.border(p, "top") + TestHelpers.draggable.margin(el, "top")
		};

	el.simulate( "drag", {
		dx: -100,
		dy: -100
	});
	offsetAfter = el.offset();
	deepEqual(offsetAfter, expected, "compare offset to parent");
});

test("containment, default, switching after initialization", function() {
	expect( 2 );

	var el = $("#draggable1").draggable({ containment: false });

	TestHelpers.draggable.testDrag(el, el, -100, -100, -100, -100);

	el.draggable( "option", "containment", "parent" )
		.css({top:0,left:0})
		.appendTo( $("#main") );

	TestHelpers.draggable.testDrag(el, el, -100, -100, 0, 0);

	// TODO: Switching back to false does not update to false
	// el.draggable( "option", "containment", false );
	// TestHelpers.draggable.testDrag(el, el, -100, -100, -100, -100);

});

/*
test("{ containment: 'document' }", function() {
	expect( 1 );

	ok(false, "missing test - untested code is broken code");
});

test("{ containment: 'window' }", function() {
	expect( 1 );

	ok(false, "missing test - untested code is broken code");
});

test("{ containment: Selector }", function() {
	expect( 1 );

	ok(false, "missing test - untested code is broken code");
});

test("{ containment: [x1, y1, x2, y2] }", function() {
	expect( 1 );

	ok(false, "missing test - untested code is broken code");
});
*/

test("{ cursor: 'auto' }, default", function() {
	function getCursor() { return $("#draggable2").css("cursor"); }

	expect(2);

	var actual, before, after,
		expected = "auto",
		el = $("#draggable2").draggable({
			cursor: expected,
			start: function() {
				actual = getCursor();
			}
		});

	before = getCursor();
	el.simulate( "drag", {
		dx: -1,
		dy: -1
	});
	after = getCursor();

	equal(actual, expected, "start callback: cursor '" + expected + "'");
	equal(after, before, "after drag: cursor restored");

});

test("{ cursor: 'move' }", function() {

	function getCursor() { return $("body").css("cursor"); }

	expect(2);

	var actual, before, after,
		expected = "move",
		el = $("#draggable2").draggable({
			cursor: expected,
			start: function() {
				actual = getCursor();
			}
		});

	before = getCursor();
	el.simulate( "drag", {
		dx: -1,
		dy: -1
	});
	after = getCursor();

	equal(actual, expected, "start callback: cursor '" + expected + "'");
	equal(after, before, "after drag: cursor restored");

});

test("cursor, default, switching after initialization", function() {

	expect(3);

	var el = $("#draggable1").draggable();

	TestHelpers.draggable.trackMouseCss( el );

	TestHelpers.draggable.move( el, 1, 1 );
	equal( el.data("last_dragged_cursor"), "auto" );

	el.draggable( "option", "cursor", "move" );
	TestHelpers.draggable.move( el, 1, 1 );
	equal( el.data("last_dragged_cursor"), "move" );

	el.draggable( "option", "cursor", "ns-resize" );
	TestHelpers.draggable.move( el, 1, 1 );
	equal( el.data("last_dragged_cursor"), "ns-resize" );

});

test( "cursorAt", function() {
	expect( 24 );

	var deltaX = -3,
		deltaY = -3,
		tests = {
			"false": { cursorAt : false },
			"{ left: -5, top: -5 }": { x: -5, y: -5, cursorAt : { left: -5, top: -5 } },
			"[ 10, 20 ]": { x: 10, y: 20, cursorAt : [ 10, 20 ] },
			"'10 20'": { x: 10, y: 20, cursorAt : "10 20" },
			"{ left: 20, top: 40 }": { x: 20, y: 40, cursorAt : { left: 20, top: 40 } },
			"{ right: 10, bottom: 20 }": { x: 10, y: 20, cursorAt : { right: 10, bottom: 20 } }
		};

	$.each( tests, function( testName, testData ) {
		$.each( [ "relative", "absolute" ], function( i, position ) {
			var el = $( "#draggable" + ( i + 1 ) ).draggable({
					cursorAt: testData.cursorAt,
					drag: function( event, ui ) {
						if( !testData.cursorAt ) {
							equal( ui.position.left - ui.originalPosition.left, deltaX, testName + " " + position + " left" );
							equal( ui.position.top - ui.originalPosition.top, deltaY, testName + " " + position + " top" );
						} else if( testData.cursorAt.right ) {
							equal( ui.helper.width() - ( event.clientX - ui.offset.left ), testData.x - TestHelpers.draggable.unreliableOffset, testName + " " + position + " left" );
							equal( ui.helper.height() - ( event.clientY - ui.offset.top ), testData.y - TestHelpers.draggable.unreliableOffset, testName + " " +position + " top" );
						} else {
							equal( event.clientX - ui.offset.left, testData.x + TestHelpers.draggable.unreliableOffset, testName + " " + position + " left" );
							equal( event.clientY - ui.offset.top, testData.y + TestHelpers.draggable.unreliableOffset, testName + " " + position + " top" );
						}
					}
			});

			el.simulate( "drag", {
				moves: 1,
				dx: deltaX,
				dy: deltaY
			});
		});
	});
});

test( "cursorAt, switching after initialization", function() {

	expect( 24 );

	var deltaX = -3,
		deltaY = -3,
		tests = {
			"false": { cursorAt : false },
			"{ left: -5, top: -5 }": { x: -5, y: -5, cursorAt : { left: -5, top: -5 } },
			"[ 10, 20 ]": { x: 10, y: 20, cursorAt : [ 10, 20 ] },
			"'10 20'": { x: 10, y: 20, cursorAt : "10 20" },
			"{ left: 20, top: 40 }": { x: 20, y: 40, cursorAt : { left: 20, top: 40 } },
			"{ right: 10, bottom: 20 }": { x: 10, y: 20, cursorAt : { right: 10, bottom: 20 } }
		};

	$.each( tests, function( testName, testData ) {
		$.each( [ "relative", "absolute" ], function( i, position ) {
			var el = $( "#draggable" + ( i + 1 ) );

			el.draggable({
					drag: function( event, ui ) {
						if( !testData.cursorAt ) {
							equal( ui.position.left - ui.originalPosition.left, deltaX, testName + " " + position + " left" );
							equal( ui.position.top - ui.originalPosition.top, deltaY, testName + " " + position + " top" );
						} else if( testData.cursorAt.right ) {
							equal( ui.helper.width() - ( event.clientX - ui.offset.left ), testData.x - TestHelpers.draggable.unreliableOffset, testName + " " + position + " left" );
							equal( ui.helper.height() - ( event.clientY - ui.offset.top ), testData.y - TestHelpers.draggable.unreliableOffset, testName + " " +position + " top" );
						} else {
							equal( event.clientX - ui.offset.left, testData.x + TestHelpers.draggable.unreliableOffset, testName + " " + position + " left" );
							equal( event.clientY - ui.offset.top, testData.y + TestHelpers.draggable.unreliableOffset, testName + " " + position + " top" );
						}
					}
			});

			el.draggable( "option", "cursorAt", false );
			el.draggable( "option", "cursorAt", testData.cursorAt );

			el.simulate( "drag", {
				moves: 1,
				dx: deltaX,
				dy: deltaY
			});
		});
	});

});


test( "disabled", function() {

	expect( 3 );

	var el = $("#draggable1").draggable();

	TestHelpers.draggable.shouldMove(el);

	el.draggable( "option", "disabled", true );
	TestHelpers.draggable.shouldNotMove(el);

	el.draggable( "option", "disabled", false );
	TestHelpers.draggable.shouldMove(el);

});

test("{ grid: [50, 50] }, relative", function() {
	expect( 2 );

	var el = $("#draggable1").draggable({ grid: [50, 50] });
	TestHelpers.draggable.testDrag(el, el, 24, 24, 0, 0);
	TestHelpers.draggable.testDrag(el, el, 26, 25, 50, 50);
});

test("{ grid: [50, 50] }, absolute", function() {
	expect( 2 );

	var el = $("#draggable2").draggable({ grid: [50, 50] });
	TestHelpers.draggable.testDrag(el, el, 24, 24, 0, 0);
	TestHelpers.draggable.testDrag(el, el, 26, 25, 50, 50);
});

test("grid, switching after initialization", function() {

	expect( 4 );

	var el = $("#draggable1").draggable();
	// Forward
	TestHelpers.draggable.testDrag(el, el, 24, 24, 24, 24);
	TestHelpers.draggable.testDrag(el, el, 0, 0, 0, 0);

	el.draggable( "option", "grid", [50,50] );

	TestHelpers.draggable.testDrag(el, el, 24, 24, 0, 0);
	TestHelpers.draggable.testDrag(el, el, 26, 25, 50, 50);

});

test("{ handle: 'span' }", function() {
	expect( 2 );

	var el = $("#draggable2").draggable({ handle: "span" });

	TestHelpers.draggable.testDrag(el, "#draggable2 span", 50, 50, 50, 50, "drag span");
	TestHelpers.draggable.shouldNotMove(el, "drag element");
});

test("handle, default, switching after initialization", function() {
	expect( 6 );

	var el = $("#draggable2").draggable();

	TestHelpers.draggable.testDrag(el, el, 50, 50, 50, 50);
	TestHelpers.draggable.testDrag(el, "#draggable2 span", 100, 100, 100, 100);

	// Switch
	el.draggable( "option", "handle", "span" );
	TestHelpers.draggable.testDrag(el, el, 50, 50, 0, 0);
	TestHelpers.draggable.testDrag(el, "#draggable2 span", 100, 100, 100, 100);

	// And back
	el.draggable( "option", "handle", false );
	TestHelpers.draggable.testDrag(el, el, 50, 50, 50, 50);
	TestHelpers.draggable.testDrag(el, "#draggable2 span", 100, 100, 100, 100);

});

test("helper, default, switching after initialization", function() {
	expect( 3 );

	var el = $("#draggable1").draggable();
	TestHelpers.draggable.shouldMove(el);

	el.draggable( "option", "helper", "clone" );
	TestHelpers.draggable.shouldNotMove(el);

	el.draggable( "option", "helper", "original" );
	TestHelpers.draggable.shouldMove(el);

});

test("{ helper: 'clone' }, relative", function() {
	expect( 1 );

	var el = $("#draggable1").draggable({ helper: "clone" });
	TestHelpers.draggable.shouldNotMove(el);
});

test("{ helper: 'clone' }, absolute", function() {
	expect( 1 );

	var el = $("#draggable2").draggable({ helper: "clone" });
	TestHelpers.draggable.shouldNotMove(el);
});

test("{ helper: 'original' }, relative, with scroll offset on parent", function() {
	expect( 3 );

	var el = $("#draggable1").draggable({ helper: "original" });

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.testScroll(el, "relative");

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.testScroll(el, "static");

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.testScroll(el, "absolute");

	TestHelpers.draggable.restoreScroll();

});

test("{ helper: 'original' }, relative, with scroll offset on root", function() {
	expect( 3 );

	var el = $("#draggable1").draggable({ helper: "original" });

	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "relative");

	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "static");

	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "absolute");

	TestHelpers.draggable.restoreScroll("root");

});

test("{ helper: 'original' }, relative, with scroll offset on root and parent", function() {

	expect(3);

	var el = $("#draggable1").draggable({ helper: "original" });

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "relative");

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "static");

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "absolute");

	TestHelpers.draggable.restoreScroll();
	TestHelpers.draggable.restoreScroll("root");

});

test("{ helper: 'original' }, absolute, with scroll offset on parent", function() {

	expect(3);

	var el = $("#draggable1").css({ position: "absolute", top: 0, left: 0 }).draggable({ helper: "original" });

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.testScroll(el, "relative");

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.testScroll(el, "static");

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.testScroll(el, "absolute");

	TestHelpers.draggable.restoreScroll();

});

test("{ helper: 'original' }, absolute, with scroll offset on root", function() {

	expect(3);

	var el = $("#draggable1").css({ position: "absolute", top: 0, left: 0 }).draggable({ helper: "original" });

	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "relative");

	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "static");

	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "absolute");

	TestHelpers.draggable.restoreScroll("root");

});

test("{ helper: 'original' }, absolute, with scroll offset on root and parent", function() {

	expect(3);

	var el = $("#draggable1").css({ position: "absolute", top: 0, left: 0 }).draggable({ helper: "original" });

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "relative");

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "static");

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "absolute");

	TestHelpers.draggable.restoreScroll();
	TestHelpers.draggable.restoreScroll("root");

});

test("{ helper: 'original' }, fixed, with scroll offset on parent", function() {

	expect(3);

	var el = $("#draggable1").css({ position: "fixed", top: 0, left: 0 }).draggable({ helper: "original" });

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.testScroll(el, "relative");

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.testScroll(el, "static");

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.testScroll(el, "absolute");

	TestHelpers.draggable.restoreScroll();

});

test("{ helper: 'original' }, fixed, with scroll offset on root", function() {

	expect(3);

	var el = $("#draggable1").css({ position: "fixed", top: 0, left: 0 }).draggable({ helper: "original" });

	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "relative");

	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "static");

	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "absolute");

	TestHelpers.draggable.restoreScroll("root");
});

test("{ helper: 'original' }, fixed, with scroll offset on root and parent", function() {

	expect(3);

	var el = $("#draggable1").css({ position: "fixed", top: 0, left: 0 }).draggable({ helper: "original" });

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "relative");

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "static");

	TestHelpers.draggable.setScroll();
	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.testScroll(el, "absolute");

	TestHelpers.draggable.restoreScroll();
	TestHelpers.draggable.restoreScroll("root");

});

test("{ helper: 'clone' }, absolute", function() {

	expect(1);

	var helperOffset = null,
		origOffset = $("#draggable1").offset(),
		el = $("#draggable1").draggable({ helper: "clone", drag: function(event, ui) {
			helperOffset = ui.helper.offset();
		} });

	el.simulate( "drag", {
		dx: 1,
		dy: 1
	});
	deepEqual({ top: helperOffset.top-1, left: helperOffset.left-1 }, origOffset, "dragged[1, 1] ");

});

test("{ helper: 'clone' }, absolute with scroll offset on parent", function() {

	expect(3);

	TestHelpers.draggable.setScroll();
	var helperOffset = null,
		origOffset = null,
		el = $("#draggable1").draggable({ helper: "clone", drag: function(event, ui) {
			helperOffset = ui.helper.offset();
		} });

	$("#main").css("position", "relative");
	origOffset = $("#draggable1").offset();
	el.simulate( "drag", {
		dx: 1,
		dy: 1
	});
	deepEqual({ top: helperOffset.top-1, left: helperOffset.left-1 }, origOffset, "dragged[1, 1] ");

	$("#main").css("position", "static");
	origOffset = $("#draggable1").offset();
	el.simulate( "drag", {
		dx: 1,
		dy: 1
	});
	deepEqual({ top: helperOffset.top-1, left: helperOffset.left-1 }, origOffset, "dragged[1, 1] ");

	$("#main").css("position", "absolute");
	origOffset = $("#draggable1").offset();
	el.simulate( "drag", {
		dx: 1,
		dy: 1
	});
	deepEqual({ top: helperOffset.top-1, left: helperOffset.left-1 }, origOffset, "dragged[1, 1] ");

	TestHelpers.draggable.restoreScroll();

});

test("{ helper: 'clone' }, absolute with scroll offset on root", function() {

	expect(3);

	TestHelpers.draggable.setScroll("root");
	var helperOffset = null,
		origOffset = null,
		el = $("#draggable1").draggable({ helper: "clone", drag: function(event, ui) {
			helperOffset = ui.helper.offset();
		} });

	$("#main").css("position", "relative");
	origOffset = $("#draggable1").offset();
	el.simulate( "drag", {
		dx: 1,
		dy: 1
	});
	deepEqual({ top: helperOffset.top-1, left: helperOffset.left-1 }, origOffset, "dragged[1, 1] ");

	$("#main").css("position", "static");
	origOffset = $("#draggable1").offset();
	el.simulate( "drag", {
		dx: 1,
		dy: 1
	});
	deepEqual({ top: helperOffset.top-1, left: helperOffset.left-1 }, origOffset, "dragged[1, 1] ");

	$("#main").css("position", "absolute");
	origOffset = $("#draggable1").offset();
	el.simulate( "drag", {
		dx: 1,
		dy: 1
	});
	deepEqual({ top: helperOffset.top-1, left: helperOffset.left-1 }, origOffset, "dragged[1, 1] ");

	TestHelpers.draggable.restoreScroll("root");

});

test("{ helper: 'clone' }, absolute with scroll offset on root and parent", function() {

	expect(3);

	TestHelpers.draggable.setScroll("root");
	TestHelpers.draggable.setScroll();

	var helperOffset = null,
		origOffset = null,
		el = $("#draggable1").draggable({ helper: "clone", drag: function(event, ui) {
			helperOffset = ui.helper.offset();
		} });

	$("#main").css("position", "relative");
	origOffset = $("#draggable1").offset();
	el.simulate( "drag", {
		dx: 1,
		dy: 1
	});
	deepEqual({ top: helperOffset.top-1, left: helperOffset.left-1 }, origOffset, "dragged[1, 1] ");

	$("#main").css("position", "static");
	origOffset = $("#draggable1").offset();
	el.simulate( "drag", {
		dx: 1,
		dy: 1
	});
	deepEqual({ top: helperOffset.top-1, left: helperOffset.left-1 }, origOffset, "dragged[1, 1] ");

	$("#main").css("position", "absolute");
	origOffset = $("#draggable1").offset();
	el.simulate( "drag", {
		dx: 1,
		dy: 1
	});
	deepEqual({ top: helperOffset.top-1, left: helperOffset.left-1 }, origOffset, "dragged[1, 1] ");

	TestHelpers.draggable.restoreScroll("root");
	TestHelpers.draggable.restoreScroll();

});

test("{ opacity: 0.5 }", function() {

	expect(1);

	var opacity = null,
		el = $("#draggable2").draggable({
			opacity: 0.5,
			start: function() {
				opacity = $(this).css("opacity");
			}
		});

	el.simulate( "drag", {
		dx: -1,
		dy: -1
	});

	equal(opacity, 0.5, "start callback: opacity is");

});

test("opacity, default, switching after initialization", function() {

	expect(3);

	var opacity = null,
		el = $("#draggable2").draggable({
			start: function() {
				opacity = $(this).css("opacity");
			}
		});

	TestHelpers.draggable.move( el, 1, 1 );
	equal( opacity, 1 );

	el.draggable( "option", "opacity", 0.5 );
	TestHelpers.draggable.move( el, 2, 1 );
	equal( opacity, 0.5 );

	el.draggable( "option", "opacity", false );
	TestHelpers.draggable.move( el, 3, 1 );
	equal( opacity, 1 );

});

/**
add tests for the following:
refreshPositions
revert
revertDuration
scope
scroll
scrollSensitivity
scrollSpeed
snap
snapMode
snapTolerance
stack
*/

test("{ zIndex: 10 }", function() {

	expect(1);

	var actual,
		expected = 10,
		el = $("#draggable2").draggable({
			zIndex: expected,
			start: function() {
				actual = $(this).css("zIndex");
			}
		});

	el.simulate( "drag", {
		dx: -1,
		dy: -1
	});

	equal(actual, expected, "start callback: zIndex is");

});

test("zIndex, default, switching after initialization", function() {

	expect(3);

	var zindex = null,
		el = $("#draggable2").draggable({
			start: function() {
				zindex = $(this).css("z-index");
			}
		});

	el.css( "z-index", 1 );

	TestHelpers.draggable.move( el, 1, 1 );
	equal( zindex, 1 );

	el.draggable( "option", "zIndex", 5 );
	TestHelpers.draggable.move( el, 2, 1 );
	equal( zindex, 5 );

	el.draggable( "option", "zIndex", false );
	TestHelpers.draggable.move( el, 3, 1 );
	equal( zindex, 1 );

});

})(jQuery);
