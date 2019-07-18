////

if( typeof(PlusUserPanel) == 'undefined' ){
var PlusUserPanel = new Class( {
initialize:function( style, options ){
this.setting = $extend({
}, options || {} );

this.closePanel = function(){

};


var panels = $$(".plus-panel");
switch( style ){
case "slide":
this.slideUpDown( panels );
break;

case "fade":
this.fadeEffect( panels );
break;
default:
this.nonEffect( panels );

}
//$(document).addEvent("click", this.closePanel);
$$(".plus-panel").addEvents( {"mouseenter":function(){
$(document).removeEvents( "click" );
},
"mouseleave":function(){
$(document).addEvent("click", this.closePanel);

}.bind(this) } );
},

nonEffect:function( panels ){
this.closePanel=function(){
$$("#plus-userpanel .plus-button").removeClass("active");
panels.hide();
}
$$("#plus-userpanel .plus-button a").addEvent( "click", function(){
var panelId = this.get("href");
var parent = this.getParent("div");
panels.hide();
if( parent.hasClass("active") ){
$$("#plus-userpanel .plus-button").removeClass("active");
return false;
}
$$("#plus-userpanel .plus-button").removeClass("active");parent.addClass("active");
if( $$(panelId) ){
$$(panelId).setStyles( { "display":"block","opacity":1 } ).show();
}
return false;
} );

},
fadeEffect:function( panels ){
this.closePanel=function(){
$$("#plus-userpanel .plus-button").removeClass("active");
panels.fade("out");
}

$$("#plus-userpanel .plus-button a").addEvent( "click", function(){
var panelId = this.get("href");
var parent = this.getParent("div");
panels.fade("out");
if( this.hasClass("active") ){
$$("#plus-userpanel .plus-button").removeClass("active");
return false;
}
$$("#plus-userpanel .plus-button").removeClass("active");parent.addClass("active");
if( $$(panelId) ){
$$(panelId).setStyles( { "display":"block","opacity":0 } ).fade("in");
}
return false;
} );

},

slideUpDown:function( panels ){

var heights = new Array();
var fx = new Array();
panels.setStyles({"display":"block","opacity":0}).each( function(panel, i) {
heights["#"+panel.id] = panel.getSize().y;
fx["#"+panel.id] = new Fx.Morph( panel );
fx["#"+panel.id].cancel().set( {"height":0} );
} );


var lastactive = '';
this.closePanel=function(){
$$("#plus-userpanel .plus-button").removeClass("active");
if( lastactive !="" ){fx[lastactive].start( {"height":0} ); }
}
$$("#plus-userpanel .plus-button a").addEvent( "click", function(){
;
var panelId = this.get("href");
var parent = this.getParent("div");
var height =  parent.getSize().y;

if( parent.hasClass("active") ){
$$("#plus-userpanel .plus-button").removeClass("active");
fx[panelId].cancel().start( {"height":0} );
return false;
}

$$("#plus-userpanel .plus-button").removeClass("active");parent.addClass("active");

if( lastactive !="" ){fx[lastactive].start( {"height":0} ); }
lastactive = panelId;
if( $$(panelId) ){
var pwidth = $$(panelId).getWidth();
var rwidth = 0;
if( parent.getPosition().x> 900 ){
rwidth = parseInt(pwidth) - parseInt(parent.getSize().x);
}
$$(panelId).setStyles( { "opacity":1 } );
fx[panelId].cancel().start( {"height":heights[panelId]} );
}
return false;
} );
}


} );
}
