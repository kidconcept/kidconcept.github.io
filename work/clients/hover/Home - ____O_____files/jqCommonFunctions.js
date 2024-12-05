// Script Name..: jqCommonFunctions.js
// Date Created.: 03/31/2017
// Copyright....: Enrollment123.com, 2016-present
// Author.......: Eric Jacobs
// Description..: jQuery and other common JavaScript functions.
//
// Revision History:
// 11/30/2018 - ejacobs: SUPPORT-12255: Added msgContentDialog to present dialog with content string instead of via URL.
// 04/17/2018 - ejacobs: Added maxwidth & maxheight arguments to createDialogWithContent function.
//
//

// jQuery Dialog Handler With Buttons
function msgConfirmDialog(args) {
	args = (typeof args != "undefined") ? args : {};
	args.title = (typeof args.title != "undefined") ? args.title : 'Confirmation Required';
	args.text = (typeof args.text != "undefined") ? args.text : 'No message specified.';
	args.buttons = (typeof args.buttons != "undefined") ? args.buttons : {};
	args.width = (typeof args.width != "undefined") ? args.width : 350;
	args.height = (typeof args.height != "undefined") ? args.height : 'auto';
	args.dialogname = (typeof args.dialogname != "undefined") ? args.dialogname : "dialog-confirm";

	// Clear Any Existing Alert
	jqClearDialog(args.dialogname);

	// Add Alert & Activate
	$("<div></div>").attr("id",args.dialogname).appendTo("body");
	$("#" + args.dialogname).attr("title",args.title);
	$("#" + args.dialogname).html("<br>" + args.text);
	$("#" + args.dialogname ).dialog({
			width: args.width,
			height: args.height,
			resizable: false,
			modal: true,
			buttons: args.buttons,
			open: function(event, ui) { 
				$(".ui-dialog").css("z-index",9998);
				$(".ui-dialog-titlebar-close").hide();
				}
		});

	$("#" + args.dialogname).dialog("open");

}


// jQuery Interactive Dialog Handler With Buttons
function msgContentDialog(args) {
	args = (typeof args != "undefined") ? args : {};
	args.title = (typeof args.title != "undefined") ? args.title : '';
	args.content = (typeof args.content != "undefined") ? args.content : 'No content specified.';
	args.buttons = (typeof args.buttons != "undefined") ? args.buttons : {};
	args.width = (typeof args.width != "undefined") ? args.width : 500;
	args.height = (typeof args.height != "undefined") ? args.height : 'auto';
	args.dialogname = (typeof args.dialogname != "undefined") ? args.dialogname : "dialog-content";

	// Clear Any Existing Dialog
	jqClearDialog(args.dialogname);

	// Add & Activate
	$("<div></div>").attr("id",args.dialogname).appendTo("body");
	$("#" + args.dialogname).attr("title",args.title);
	$("#" + args.dialogname).html(args.content);
	$("#" + args.dialogname ).dialog({
			width: args.width,
			height: args.height,
			resizable: false,
			modal: true,
			buttons: args.buttons,
			open: function(event, ui) { 
				$(".ui-dialog").css("z-index",9998);
				$(".ui-dialog-titlebar-close").hide();
				}
		});

	$("#" + args.dialogname).dialog("open");

}


// jQuery Dialog Handler
function msgOKDialog(args) {
	args = (typeof args != "undefined") ? args : {};
	args.title = (typeof args.title != "undefined") ? args.title : 'Alert';
	args.text = (typeof args.text != "undefined") ? args.text : 'No message specified.';
	args.width = (typeof args.width != "undefined") ? args.width : 350;
	args.height = (typeof args.height != "undefined") ? args.height : 'auto';
	args.callback = (typeof args.callback != "undefined") ? args.callback : '';
	args.cbparams = (typeof args.cbparams != "undefined") ? args.cbparams : '';
	args.cssclass = (typeof args.cssclass != "undefined") ? args.cssclass : '';
	args.closeFunc = (typeof args.closeFunc != "undefined") ? args.closeFunc : function(){};
	args.isModal = (typeof args.modal != "undefined") ? args.modal : true;

	// Clear Any Existing Alert
	jqClearDialog('dialog-alert');
	
	// Add Alert & Activate
	$("<div class='" + args.cssclass + "'></div>").attr("id","dialog-alert").appendTo("body");
	$("#dialog-alert").attr("title",args.title);
	$("#dialog-alert").html("<br>" + args.text);

	var btns = {};
	btns["OK"] = function() {
			$( this ).dialog( "close" );
			if(args.callback != ''){
				window[args.callback](args.cbparams);
			}
		}
	$("#dialog-alert").dialog({ 
			width: args.width, 
			height: args.height,
			resizable: false,
			modal: args.isModal,
			close: args.closeFunc,
			buttons: btns,
			open: function(event, ui) { 
				$(".ui-dialog").css("z-index",9998);
				$(".ui-dialog-titlebar-close").hide();
				}
		}).parent().addClass(args.cssclass);
	$("#dialog-alert").dialog("open");
}


// Create Dialog & Load Content via URL
function createDialogWithContent(args){
	args = (typeof args != "undefined") ? args : {};
	args.winname = (typeof args.winname != "undefined") ? args.winname : 'content-dialog';
	args.title = (typeof args.title != "undefined") ? args.title : '';
	args.url = (typeof args.url != "undefined") ? unescape(args.url) : '';
	args.width = (typeof args.width != "undefined") ? args.width : 500;
	args.height = (typeof args.height != "undefined") ? args.height : 'auto';
	args.maxwidth = (typeof args.maxwidth != "undefined") ? args.maxwidth : args.width;
	args.maxheight = (typeof args.maxheight != "undefined") ? args.maxheight : args.height;
	args.resizable = (typeof args.resizable != "undefined") ? args.resizable : false;
	args.modal = (typeof args.modal != "undefined") ? args.modal : false;
	args.icon = (typeof args.icon != "undefined") ? args.icon : "/images/icons/png/information.png";
	args.buttons = (typeof args.buttons != "undefined") ? args.buttons : {};
	args.allowfloat = (typeof args.allowfloat != "undefined") ? args.allowfloat : false;
	args.close = (typeof args.close != "undefined") ? args.close : function(){};

	// Clear Any Existing Dialog
	if(!args.allowfloat){
		jqClearDialog(args.winname);
	}

	// Add Alert & Activate
	$("<div></div>").attr("id",args.winname).appendTo("body");
	$("#" + args.winname).attr("title",args.title);
	$("#" + args.winname).dialog({
			width: args.width,
			height: args.height,
			resizable: args.resizable,
			modal: args.modal,
			buttons: args.buttons,
			close: args.close,
			autoOpen: false,
			create: function( event, ui ) {
				$(this).css("maxWidth", args.maxwidth);
				$(this).css("maxHeight", args.maxheight);        
			},
			open: function(event, ui) { 
				$(".ui-dialog").css("z-index",9998);
				$(".ui-dialog-titlebar-close").hide();
				}
		}).load(args.url);
	$("#" + args.winname).dialog("open");

}


// Show Standard Infomational Alert
function msgAlert(args) {
	args = (typeof args != "undefined") ? args : {};
	msgOKDialog(args);
}


// Show Standard Error Message Box
function msgError(args) {
	args = (typeof args != "undefined") ? args : {};
//	args.cssclass = "ui-state-error";
//	args.csstextclass = "ui-state-error-text";
	args.cssclass = "ui-state-error-text";
	args.csstextclass = "ui-state-error-text";
	msgOKDialog(args);
}


// Show Standard Warning Message Box
function msgWarning(args) {
	args = (typeof args != "undefined") ? args : {};
	msgOKDialog(args);
}


// Show Standard 'More Info Required' Alert
function msgMoreInfo(args){
	args = (typeof args != "undefined") ? args : {};
	args.title = "More Information Required...";
	msgAlert(args);
}


// Default JS Error Handler
function stdErrorHandler(args){
	args = (typeof args != "undefined") ? args : {};
	args.title = (typeof args.title != "undefined") ? args.title : 'An Error Occurred...';
	args.text = (typeof args.text != "undefined") ? args.text : 'An unknown error occurred and no details were provided.';
	msgError(args);
	return false;
}


// Clear Specified jQuery Dialog
function jqClearDialog(dianame){
	if($("#" + dianame).length > 0){
		$("#" + dianame).dialog("close");
		$("#" + dianame).dialog("destroy");
		$("#" + dianame).remove();
	}
}


// Window Close / Use for Callbacks
function jsCloseWindow() {
	window.close();
}


// Get CF Session Var
function getCFSessionVar(varname,varscope) {
	varname = (typeof varname != "undefined") ? varname : '';
	varscope = (typeof varscope != "undefined") ? varscope : '';

	var objData = {};
	objData.varName = varname;
	objData.varScope = varscope;

	$.ajax({
		url: "/includes/cfc/utilities.cfc?method=getSessionVar&returnFormat=json",
		type: "get",
		dataType: "json",
		async: false,
		data: objData,

	success: function (result){
		return result;
	},

	error: function (xhr, textStatus, errorThrown){
		stdErrorHandler({text:'Unable to get ColdFusion scope variable value.'});
	}
	});
	
}

