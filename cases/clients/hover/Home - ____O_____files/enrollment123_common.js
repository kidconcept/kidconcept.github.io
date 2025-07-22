/*
Script Name..: enrollment123_common.js
Date Created.: Unknown
Copyright....: Enrollment123.com, 2016-present
Author.......: Enrollment123
Description..: Base E123 JavaScript functions.

Revision History:
04/02/2019 - ejacobs: SUPPORT-12325: Added billing searchform2 support in showsearch().
07/08/2018 -   steve: Added function FormatIDList which works just like ValidateIDList just without the validation
04/02/2018 - ejacobs: Updated quick search loading text to 'basic' search.
03/13/2018 - ejacobs: Added support for product search in slide-down panel in showsearch function.
03/09/2018 - ejacobs: Added support for member quick search in slide-down panel in showsearch function.
02/02/2018 - ejacobs: Added logic to showsearch to support redirect to member quick search page.
02/20/2018 - dhartman: added funtion called newInteractionPopup with some modifications.
11/29/2017 - ejacobs: Updated brokerSearch functions to support to check for cross-corp searches.
09/11/2017 - ejacobs: Updated validateIDField, validateIDList, validateDateField & validateANumber functions to remove tabs.
08/25/2017 - ejacobs: Updated validateIDList function to trim spaces.
07/26/2017 - ejacobs: Added function showToday to support of Picture of the Day in a dialog.
07/20/2017 - ejacobs: Added jsListDelete, brokerSearchPanelIDNameMulti, appendSearchIDName & deleteSearchIDName functions to support member assigned agents selection panel.
06/23/2017 - ejacobs: Added memberBrokerSearchPanel & memberBrokerSearchPanelAppend functions to support member finder.
06/09/2017 - ejacobs: Added viewVars function to view system variables in dialog.
06/08/2017 - ejacobs: Added validateIDList and validateANumber functions to validate ID list & number fields.
06/06/2017 - ejacobs: Added validateIDField, validateDateField and isAnInteger functions to support search form validation. Modified showSearch function to show progress when clicked.
04/19/2017 - ejacobs: Added jsListLen, jsListGetAt, jsListFind, leftTrim, rightTrim, allTrim utility functions.
04/05/2017 - ejacobs: Modified functions brokerSearchPanel & brokerSearchPanelAppend to support new finder.
04/05/2017 - ejacobs: Updated quickAddSubmit function to use pure jQuery Ajax submit instead of jquery.form plugin (to be removed from layout_top).
06/10/2019 - SUPPORT-14792- Tatsat : Fixed the date selector bug. Now the date selector for the field you updated previously will open without page refresh.

*/


// Init JS With Key corpTypeDisplay Vars
var ctdAgentLabel = "";
var ctdAgentLabelP = "";
var ctdMemberLabel = "";
var ctdMemberLabelP = "";
var ctdProductLabel = "";
var ctdProductLabelP = "";

function jsSetCorpTypeDisplay(args) {
	args = (typeof args != "undefined") ? args : {};
	ctdAgentLabel = (typeof args.agentLabel != "undefined") ? unescape(args.agentLabel) : "Agent";
	ctdAgentLabelP = (typeof args.agentLabelP != "undefined") ? unescape(args.agentLabelP) : "Agents";
	ctdMemberLabel = (typeof args.memberLabel != "undefined") ? unescape(args.memberLabel) : "Member";
	ctdMemberLabelP = (typeof args.memberLabelP != "undefined") ? unescape(args.memberLabelP) : "Members";
	ctdProductLabel = (typeof args.productLabel != "undefined") ? unescape(args.productLabel) : "Product";
	ctdProductLabelP = (typeof args.productLabelP != "undefined") ? unescape(args.productLabelP) : "Products";
}



// Display Today
function showToday(id,titleText) {
	var btns = {};
	btns["Close"] = function() {
			$( this ).dialog( "close" );
			return false;
	}
	createDialogWithContent({title:titleText,url:'/today.cfm?id=' + id,resizable:true,height:940,width:750,buttons:btns});
}


function setusr(usr,pwd) {
	document.force.username.value = usr;
	document.force.password.value = pwd;
	document.force.submit();
}

// ---------------------------------------------
// --- Name:    Easy DHTML Treeview           --
// --- Author:  D.D. de Kerf                  --
// --- Version: 0.1           Date: 6-6-2001  --
// ---------------------------------------------
function ToggleTree(id)
{
	img_element = returnObjById('img_' + id);
	div_element = returnObjById('div_' + id);

	// Unfold the branch if it isn't visible
	if (div_element.style.display == 'none') {
		img_element.src = "/images/administration/minus.gif";
		div_element.style.display = '';
	}
	// Collapse the branch if it IS visible
	else
	{
		// Change the image (if there is an image)
		img_element.src = "/images/administration/plus.gif";
		div_element.style.display = 'none';
	}
}

function toggle(id) {
	var targetElement = document.getElementById(id);
	var computedProp = window.getComputedStyle(targetElement).getPropertyValue("display")

	// console.log(computedProp);
		if (computedProp){
				if (computedProp != "none"){
						targetElement.style.visibility = "hidden";
						targetElement.style.display = "none";
					}else{
						targetElement.style.visibility = "visible";
						targetElement.style.display = "inherit";
					}
			}else{
				targetElement.style.visibility = "hidden";
				targetElement.style.display = "none";
			}
}

// **** OLD 'toggle()' function as of 2-2017
// function toggle(id) {
// 	var currentDisplay = document.getElementById(id).style.display;
// 	if (currentDisplay == "block") {
// 		document.getElementById(id).style.visibility = "hidden";
// 		document.getElementById(id).style.display = "none";
// 	} else {
// 		document.getElementById(id).style.visibility = "visible";
// 		document.getElementById(id).style.display = "block";
// 	}
//
// }
function hide(id) {
	document.getElementById(id).style.visibility = "hidden";
	document.getElementById(id).style.display = "none";
}
function show(id) {
	document.getElementById(id).style.visibility = "visible";
	document.getElementById(id).style.display = "block";
}
function showSaveSearchForm( e, t, a )
{
	$( '#' + e ).dialog
	(
		{
			closeOnEscape: true,
			resizeable: false,
			modal: true,
			title: t,
			width: 450,
			buttons:
			{
				'Cancel': function( )
				{
					$( '#' + e ).css( { 'visibility':'hidden', 'display':'none' } );
					$( this ).dialog( 'close' );
				},
				'Ok': function( )
				{
					var name = $( 'form[name=' + e + '] input[name=Name]' ).val();
					var qs = $( 'form[name=usersearchform]' ).serialize( );

					document.location = '/manage/savedlist/_act_initSave.cfm?t=' + new Date( ).getTime( ) + '&userType=' + a + '&name=' + name + '&' + qs;
				}
			},
			open: true
		}
	);

	$( '#' + e ).css( { 'visibility':'visible', 'display':'' } );
};
function popWindow(url, w, h, label) {
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	var winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',resizable=yes,scrollbars=yes';
	workingpop = window.open( url, label, winprops );
}
function returnObjById(id) {
    if (document.getElementById)
        var returnVar = document.getElementById(id);
    else if (document.all)
        var returnVar = document.all[id];
    else if (document.layers)
        var returnVar = document.layers[id];
    return returnVar;
}
function initTextAreaCounter(container, textarea , maxlength, total) {
	var oTA = returnObjById(textarea);
	var oCont = returnObjById(container);
	if (!oTA || !oCont) return;
	oTA.onkeydown = countStrokes; //updates as we type
	oTA.onkeyup = countStrokes;   // will also update as we release.... needed for deleting.
	oTA.maxlength = maxlength;
	oTA.outputLocation = oCont;
	oTA.countStrokes = countStrokes;
	oTA.total = total;
	oTA.countStrokes();
}
function countStrokes() {
	var numStrokes = this.value.length;
	if (numStrokes > this.maxlength  && this.maxlength > 0 ) {
		this.value = this.value.substr(0, this.maxlength) ;
		numStrokes = this.value.length;
	}
	this.outputLocation.innerHTML = (!this.total && this.maxlength) ? this.maxlength - numStrokes : numStrokes ;
}
function textAreaLimit(field, maxlimit) {
	if (field.value.length >= maxlimit) {
		field.value = field.value.substring(0, maxlimit);
	}
}

// Show & Load Searches
var useQuickSearch = 0;
function showsearch(type, qs) {

	// productsearch Div Included To Close Inline Div On Product List & Detail Pages
	var divs = [ 'membersearch','memberquicksearch','agentsearch','billingsearch','productsearchpanel','productsearch' ];

	switch(type) {
		case "memberQuick":
			div_name = "memberquicksearch";
			page_url = "/manage/users/searchFormQuick.cfm?timestamp=" + new Date().getTime();
			searchLabel = ctdMemberLabel + ' Basic Search';
			do_close = true;
			break;
		case "member":
			if(useQuickSearch != 0) {
				location.href="/manage/users/memberShortSearch.cfm";
			} else {
				div_name = "membersearch";
				page_url = "/manage/users/searchform.cfm?timestamp=" + new Date().getTime();
				searchLabel = ctdMemberLabel + ' Search Options';
				do_close = true;
			}
			break;
		case "agent":
			div_name = "agentsearch";
			page_url = "/manage/agents/searchform.cfm?timestamp=" + new Date().getTime();
			searchLabel = ctdAgentLabel + ' Search Options';
			do_close = true;
			break;
		case "billing":
			div_name = "billingsearch";
			page_url = "/manage/billing/searchform.cfm?timestamp=" + new Date().getTime();
			searchLabel = 'Billing Search Options';
			do_close = true;
			break;
		case "billingNEW":
			div_name = "billingsearch";
			page_url = "/manage/billing/searchform2.cfm?timestamp=" + new Date().getTime();
			searchLabel = 'NEW Billing Search';
			do_close = true;
			break;
		case "product":
			div_name = "productsearchpanel";
			page_url = "/includes/manage/search/products.cfm?timestamp=" + new Date().getTime();
			searchLabel = ctdProductLabel + ' Search Options';
			do_close = true;
			break;
		case "addform":
			div_name = "addform";
			page_url = "/manage/users/addform.cfm?timestamp=" + new Date().getTime();
			searchLabel = ctdMemberLabel + ' Short Form';
			do_close = false;
			break;
		case "myinformation":
			div_name = "myinformation";
			page_url = "/manage/agents/security/myinformation.cfm?timestamp=" + new Date().getTime();
			searchLabel = 'My Information';
			do_close = false;
			break;
	}


	if ($('#' + div_name).is(':visible')) {
		$('#' + div_name).slideUp(600);
	} else {
		var sUrl = ( qs.length == 0 ) ? page_url : page_url + "&" + qs;
		$('#' + div_name).html("<img src='/images/working.gif' border='0' alt=''> <span style='color:#336699;font-weight:bold'>Loading " + searchLabel + "...</span><br><br>");

		for( x = 0; x < divs.length; x++ )
		{
			if( divs[ x ] != div_name )
			{
				$('#' + divs[ x ]).slideUp(600);
			}
		}
		$('#' + div_name).slideDown(200);
		$('#' + div_name).load(sUrl);
	}
	window.scrollTo(0,0);

}

function viewHistoryData( d )
{
	// d: number of days in the past/future; 0 for today

	if( isNaN( parseInt( d ) ) ) d = 0;

	$( '#loading-history-pages' ).css( { "display" : "block", "visibility" : "visible" } );
	$( '#history-pages' ).css( { "display" : "none", "visibility" : "hidden" } );

	$.get
	(
		'/manage/agents/security/viewhistory.cfm?t=' + new Date().getTime() + '&NumberOfDays=' + d,
		{},
		function( response )
		{
			$( '#loading-history-pages' ).css( { "display" : "none", "visibility" : "hidden" } );
			$( '#history-pages' ).css( { "display" : "block", "visibility" : "visible" } );
			$( '#history-pages' ).html( response );
		}
	);
}
function LoadDashboardData( )
{
	var d = $( '#DateRange' ).val( );
	var b = $( '#BrokerID' ).val( );
	var t = ( $( '#IsTree:checked' ).val( ) == null ) ? 0 : 1;

	if( b == '' )
	{
		alert( 'Please supply a valid ID' );
		return;
	}

	$( '#dashboard' ).css( {"display" : "block", "visibility" : "visible" } );
	$( '#dashboard' ).html( 'Loading Data...' );

	$.get
	(
		'/manage/dashboard.cfm?t=' + new Date( ).getTime( ) + '&DateRange=' + d + '&BrokerID=' + b + '&IsTree=' + t,
		{},
		function( response )
		{
			$( '#dashboard' ).html( response );
		}
	)

	$( '#CloseDashboard' ).css( { "display":"inline", "visibility":"visible" } );
}
function CloseDashboardData( )
{
	$( '#dashboard' ).css( {"display" : "none", "visibility" : "hidden" } );
	$( '#CloseDashboard' ).css( { "display":"none", "visibility":"hidden" } );
}
function genericClearForm(sFormName) {
	var oForm = document.getElementById(sFormName);
	var oField, sFieldType;

	for(var c = oForm.length;c--;) {
		oField = oForm[c];
		sType = (new String(oField.type)).substring(0,5);
		sName = oField.name.toUpperCase();
		if (sName != 'PAGESIZE' && sName != 'REPORTID') {
			switch(sType) {
				case "selec":
					oField.selectedIndex = 0;
					break;
				case "check":
					if (oField[oField.size] == undefined) {
						oField.checked = false;
					} else if (oField.size == 0) {
						oField.checked = false;
					} else {
						for(var i = oField.size;i--;) {
							oField[i].checked = false;
						}
					}
					break;
				case "text":
					oField.value = "";
					break;
				case "texta":
					oField.value = "";
					break;
				case "radio":
					if (oField[oField.size] == undefined) {
						oField.checked = false;
					} else if (oField.size == 0) {
						oField.checked = false;
					} else {
						for(var i = oField.size;i--;) {
							oField[i].checked = false;
						}
					}
					break;
			}
		}
	}
}
// BEGIN RESIZEPANEL SUBCLASS //
YAHOO.widget.ResizePanel = function(el, userConfig) {
    if (arguments.length > 0) {
        YAHOO.widget.ResizePanel.superclass.constructor.call(this, el, userConfig);
    }
}
YAHOO.widget.ResizePanel.CSS_PANEL_RESIZE = "yui-resizepanel";
YAHOO.widget.ResizePanel.CSS_RESIZE_HANDLE = "resizehandle";
YAHOO.extend(YAHOO.widget.ResizePanel, YAHOO.widget.Panel, {
    init: function(el, userConfig) {
        YAHOO.widget.ResizePanel.superclass.init.call(this, el);
        this.beforeInitEvent.fire(YAHOO.widget.ResizePanel);
        var Dom = YAHOO.util.Dom,
            Event = YAHOO.util.Event,
            oInnerElement = this.innerElement,
            oResizeHandle = document.createElement("DIV"),
            sResizeHandleId = this.id + "_resizehandle";
         oResizeHandle.id = sResizeHandleId;
         oResizeHandle.className = YAHOO.widget.ResizePanel.CSS_RESIZE_HANDLE;
        Dom.addClass(oInnerElement, YAHOO.widget.ResizePanel.CSS_PANEL_RESIZE);
        this.resizeHandle = oResizeHandle;
        function initResizeFunctionality() {
            var me = this,
                oHeader = this.header,
                oBody = this.body,
                oFooter = this.footer,
                nStartWidth,
                nStartHeight,
                aStartPos,
                nBodyBorderTopWidth,
                nBodyBorderBottomWidth,
                nBodyTopPadding,
                nBodyBottomPadding,
                nBodyOffset;
            oInnerElement.appendChild(oResizeHandle);
            this.ddResize = new YAHOO.util.DragDrop(sResizeHandleId, this.id);
            this.ddResize.setHandleElId(sResizeHandleId);
            this.ddResize.onMouseDown = function(e) {
                nStartWidth = oInnerElement.offsetWidth;
                nStartHeight = oInnerElement.offsetHeight;
                if (YAHOO.env.ua.ie && document.compatMode == "BackCompat") {
                    nBodyOffset = 0;
                }
                else {
                    nBodyBorderTopWidth = parseInt(Dom.getStyle(oBody, "borderTopWidth"), 10),
                    nBodyBorderBottomWidth = parseInt(Dom.getStyle(oBody, "borderBottomWidth"), 10),
                    nBodyTopPadding = parseInt(Dom.getStyle(oBody, "paddingTop"), 10),
                    nBodyBottomPadding = parseInt(Dom.getStyle(oBody, "paddingBottom"), 10),
                    nBodyOffset = nBodyBorderTopWidth + nBodyBorderBottomWidth + nBodyTopPadding + nBodyBottomPadding;
                }
                me.cfg.setProperty("width", nStartWidth + "px");
                aStartPos = [Event.getPageX(e), Event.getPageY(e)];
            };
            this.ddResize.onDrag = function(e) {
                var aNewPos = [Event.getPageX(e), Event.getPageY(e)],
                    nOffsetX = aNewPos[0] - aStartPos[0],
                    nOffsetY = aNewPos[1] - aStartPos[1],
                    nNewWidth = Math.max(nStartWidth + nOffsetX, 10),
                    nNewHeight = Math.max(nStartHeight + nOffsetY, 10),
                    nBodyHeight = (nNewHeight - (oFooter.offsetHeight + oHeader.offsetHeight + nBodyOffset));
                me.cfg.setProperty("width", nNewWidth + "px");
                if (nBodyHeight < 0) {
                    nBodyHeight = 0;
                }
                oBody.style.height =  nBodyHeight + "px";
            };
        }

        function onBeforeShow() {
           initResizeFunctionality.call(this);
           this.unsubscribe("beforeShow", onBeforeShow);
        }

        function onBeforeRender() {
            if (!this.footer) {
                this.setFooter("");
            }
            if (this.cfg.getProperty("visible")) {
                initResizeFunctionality.call(this);
            }
            else {
                this.subscribe("beforeShow", onBeforeShow);
            }
            this.unsubscribe("beforeRender", onBeforeRender);
        }

        this.subscribe("beforeRender", onBeforeRender);
        if (userConfig) {
            this.cfg.applyConfig(userConfig, true);
        }
        this.initEvent.fire(YAHOO.widget.ResizePanel);
    },
    toString: function() {
        return "ResizePanel " + this.id;
    }
});

// END RESIZEPANEL SUBCLASS //
YAHOO.namespace("enrollment123.broker_search_panel");
YAHOO.enrollment123.broker_search_panel.togglePanel = function(fld,p,a) {
	var panel_obj_name = "o_" + p;

	if (a == undefined) {
		a = 'single';
	}

	var panel = new YAHOO.widget.Panel(p + "_panel", {
																context: [p,'tl','tl'],
																width:"400px",
																constraintoviewport:true,
																visible:false,
																draggable:true,
																close:true
	} );
	panel.setHeader('Search');
	panel.setBody('<div id="' + p + '_datatable"></div>');
	panel.setFooter('');
	panel.render(p);

	var resize = new YAHOO.util.Resize(p + "_panel");

	panel.show();

	var date = new Date();
	var timestamp = date.getTime();
	var sUrl = "/manage/agents/broker_functions.cfc?method=broker_list&returnFormat=JSON&t=" + timestamp;

	var myColumnDefs = [
		{key:"ID", label:'ID', sortable:true, resizeable:true},
		{key:"LABEL", label:'Label', sortable:true, resizeable:true},
		{key:"CITY", label:'City', sortable:true, resizeable:true},
		{key:"STATE", label:'State', sortable:true, resizeable:true}
	];
	var myDataSource = new YAHOO.util.DataSource(sUrl);
	myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSON;
	myDataSource.responseSchema = {
		resultsList: "DATA",
    	fields: [{key:'ID'},{key:'LABEL'},{key:'CITY'},{key:'STATE'}]
	};
	var oConfigs = {
		paginator:new YAHOO.widget.Paginator({
				rowsPerPage:20,
				rowsPerPageOptions : [25,50,100]
		}),
		selectionMode: "single",
		sortedBy:{key:"LABEL", dir:"asc"}
	};
	var myDataTable = new YAHOO.widget.DataTable(p + "_datatable", myColumnDefs, myDataSource, oConfigs);

	myDataTable.onEventSelectRow = function(oArgs) {
	    var evt = oArgs.event;
	    var elTarget = oArgs.target;
		var oRecord = this.getRecord(elTarget);
        var selectedID = oRecord.getData("ID");


		if (a == 'multiple') {
			YAHOO.enrollment123.broker_search_panel.selectRowActionMultiple(fld, selectedID);
		} else if (a == 'div') {
			YAHOO.enrollment123.broker_search_panel.selectRowActionDivAdd(fld, selectedID, oRecord.getData("LABEL"));
		} else {
			YAHOO.enrollment123.broker_search_panel.selectRowActionSingle(fld, selectedID);
		}

	    this.unselectAllRows();
	    panel.hide();
	    document.getElementById(fld).focus();
	};

	myDataTable.subscribe("rowMouseoverEvent", myDataTable.onEventHighlightRow);
    myDataTable.subscribe("rowMouseoutEvent", myDataTable.onEventUnhighlightRow);
    myDataTable.subscribe("rowClickEvent", myDataTable.onEventSelectRow);


}
YAHOO.enrollment123.broker_search_panel.selectRowActionSingle = function(fld, val) {
    document.getElementById(fld).value = val;
}
YAHOO.enrollment123.broker_search_panel.selectRowActionMultiple = function(fld, val) {
    var newval = document.getElementById(fld).value;
	if (newval.length > 0) {
		newval = newval + ',' + val;
	} else {
		newval = val;
	}
	document.getElementById(fld).value = newval;
}
YAHOO.enrollment123.broker_search_panel.selectRowActionDivAdd = function(fld, val, label) {
	var table = document.getElementById(fld + "_display");
	var tbody = table.getElementsByTagName("TBODY")[0];
    var newChildIndex = 0;
	var bDuplicate = false;
	if (table.rows.length > 0) {
		newChildIndex = table.rows.length;
		for (i=0; i < table.rows.length; i++) {
			if (table.rows[i].getElementsByTagName("TD")[0].innerHTML == val) {
				bDuplicate = true;
			}
		}

	}

	if (bDuplicate == false) {
		var row = document.createElement("TR");
		row.id = "assignedAgentIDs_display_" + val;
	    var td1 = document.createElement("TD");
		td1.className = "formName";
	    td1.appendChild(document.createTextNode(val));
		var td2 = document.createElement("TD");
		td2.className = "formName";
		td2.appendChild(document.createTextNode(label));
		var a = document.createElement('a');
		a.href = 'javascript: YAHOO.enrollment123.broker_search_panel.selectRowActionDivRemove(\'' + fld + '\',\'' + val + '\')';
		a.innerHTML = 'X';
		var td3 = document.createElement("TD");
		td3.className = "formName";
		td3.appendChild(a);
	    row.appendChild(td1);
	    row.appendChild(td2);
	    row.appendChild(td3);
	    tbody.appendChild(row);

		YAHOO.enrollment123.broker_search_panel.resetSelectedIDs(fld);
	}
}
YAHOO.enrollment123.broker_search_panel.selectRowActionDivRemove = function(fld, val) {
	var el_id = fld + '_display_' + val;
    var el = document.getElementById(el_id);
	el.parentNode.deleteRow(el.rowIndex);
	YAHOO.enrollment123.broker_search_panel.resetSelectedIDs(fld);
}
YAHOO.enrollment123.broker_search_panel.resetSelectedIDs = function(fld) {
	var parent_table_id = fld + '_display';
    var parent_table = document.getElementById(parent_table_id).getElementsByTagName("TBODY")[0];
	var newval = '';
	if (parent_table.rows.length > 0) {
		for (i=0; i < parent_table.rows.length; i++) {
			if (newval.length > 0) {
				newval = newval + ',';
			}
			newval = newval + parent_table.rows[i].getElementsByTagName("TD")[0].innerHTML;
		}
	}
	document.getElementById(fld).value = newval;
}

/* -------------------------------------------------------------------
* sortSelect(select_object)
* Pass this function a SELECT object and the options will be sorted
* by their text (display) values
* Author: Matt Kruse <matt@mattkruse.com>
* WWW: http://www.mattkruse.com/
* -------------------------------------------------------------------
*/
YAHOO.enrollment123.sortSelect = function(obj) {
	if (obj.options.length == undefined) {
		return;
	}
	var o = new Array();
	for (var i = 0; i < obj.options.length; i++) {
		o[o.length] = new Option(obj.options[i].text, obj.options[i].value, obj.options[i].defaultSelected, obj.options[i].selected) ;
		o[o.length-1].className = obj.options[i].className;
	}
	if (o.length == 0) { return; }
	o = o.sort(
		function(a,b) {
			if ((a.text + "") < (b.text + "")) { return -1; }
			if ((a.text + "") > (b.text + "")) { return 1; }
			return 0;
		}
	);
	for (var i = 0; i < o.length; i++) {
		obj.options[i] = new Option(o[i].text, o[i].value, o[i].defaultSelected, o[i].selected);
		obj.options[i].className = o[i].className;
	}
}


YAHOO.enrollment123.moveSelectOption = function(from, to) {
	var oFrom = document.getElementById(from);
	var oTo = document.getElementById(to);

	if (oFrom !== undefined && oTo !== undefined) {
		for (i = oFrom.length - 1; i>=0; i--) {
			if (oFrom.options[i].selected) {
				if (oFrom.options[i].value.length > 0) {
					oToOption = document.createElement('option');
					oToOption.text = oFrom.options[i].text;
					oToOption.value = oFrom.options[i].value;
					try {
						oTo.add(oToOption, null); // standards compliant; doesn't work in IE
					}
					catch(ex) {
						oTo.add(oToOption); // IE only
					}
					oFrom.remove(i);
				}
			}
		}
		YAHOO.enrollment123.sortSelect(oTo);
	}
}

YAHOO.enrollment123.flattenSelect = function(from, to) {
	var oFrom = document.getElementById(from);
	var oTo = document.getElementById(to);

	var lTo = "";
	for (i = oFrom.length - 1; i>=0; i--) {
		if (oFrom.options[i].value.length > 0) {
			if (lTo.length > 0) {
				lTo += ",";
			}
			lTo += oFrom.options[i].value;
		}
	}
	oTo.value = lTo;
}

YAHOO.namespace("enrollment123.panels");
YAHOO.enrollment123.panels.toggle = function(panel_id) {
	if (YAHOO.enrollment123.panels[panel_id] == undefined) {
		YAHOO.enrollment123.panels[panel_id] = new YAHOO.widget.ResizePanel(panel_id, { visible:true, draggable:true, close:true } );
		YAHOO.enrollment123.panels[panel_id].cfg.setProperty('visible', true);
		document.getElementById(panel_id).style.display = "block";
		YAHOO.enrollment123.panels[panel_id].render();
	} else {
		if (YAHOO.enrollment123.panels[panel_id].cfg.getProperty('visible') == true) {
			YAHOO.enrollment123.panels[panel_id].cfg.setProperty('visible', false);
			YAHOO.enrollment123.panels[panel_id].hide();
		} else {
			YAHOO.enrollment123.panels[panel_id].cfg.setProperty('visible', true);
			YAHOO.enrollment123.panels[panel_id].show();
		}
	}
}

YAHOO.namespace("enrollment123.user_trans_panel");
YAHOO.enrollment123.user_trans_panel.togglePanel = function(type, id, context1, context2) {
	var panel_parent_name = type + "_div_" + id;
	var panel_name = type + "_" + id;
	var panel_obj_name = "o" + type + "_" + id;
	var context_name = type + "_" + id + "_td";

	if (context1 == undefined) {
		context1 = "tr";
	}
	if (context2 == undefined) {
		context2 = "br";
	}
	if (YAHOO.enrollment123.user_trans_panel[panel_obj_name] == undefined) {
		var f = "get_trans_details";
		var sUrl = "/manage/billing/functions.cfm?f=" + f + "&v=" + id + "&v2=" + type;
		var aResponse;

		var handleResponse = function(o){
		   if(o.responseText !== undefined){
				a_panel_text = eval(o.responseText);
				YAHOO.enrollment123.user_trans_panel[panel_obj_name] = new YAHOO.widget.ResizePanel(panel_name, { context:[context_name, context1, context2], width:"300px", visible:false, draggable:true, close:true } );
				YAHOO.enrollment123.user_trans_panel[panel_obj_name].setHeader(a_panel_text[0]);
				YAHOO.enrollment123.user_trans_panel[panel_obj_name].setBody(a_panel_text[1]);
				YAHOO.enrollment123.user_trans_panel[panel_obj_name].setFooter(a_panel_text[2]);
				YAHOO.enrollment123.user_trans_panel[panel_obj_name].render(panel_parent_name);
				YAHOO.enrollment123.user_trans_panel[panel_obj_name].show();
			}
		}

		var callback =
		{
		   	success: handleResponse,
			failure: handleResponse
		};

		var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);

	} else {
		if (YAHOO.enrollment123.user_trans_panel[panel_obj_name].cfg.config.visible.value == true) {
			YAHOO.enrollment123.user_trans_panel[panel_obj_name].hide();
		} else {

			YAHOO.enrollment123.user_trans_panel[panel_obj_name].show();
		}
	}
}

YAHOO.enrollment123.togglePanel = function(panel_id, url, w) {
	var panel_parent_name = panel_id;
	var panel_name = panel_id + '_child';
	var oPanel = '';
	var sUrl = url;
	var aResponse;

	oPanel = new YAHOO.widget.ResizePanel(panel_name, { width:eval(w), visible:true, draggable:true, close:true } );
	var handleResponse = function(o){
	   if(o.responseText !== undefined){
			a_panel_text = eval(o.responseText);
			oPanel.setHeader(a_panel_text[0]);
			oPanel.setBody(a_panel_text[1]);
			oPanel.setFooter(a_panel_text[2]);
			oPanel.render(panel_parent_name);
			oPanel.show();
			document.getElementById(panel_name).style.display="block";
		}
	}

	var callback =
	{
	   	success: handleResponse,
		failure: handleResponse
	};

	if (url.length > 0) {
		var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
	} else {
		oPanel.render(panel_parent_name);
		oPanel.show();
		document.getElementById(panel_name).style.display="block";
	}
}



YAHOO.enrollment123.toggleToDoPanel =  function(div, id, bShowUserType, display) {
	var date = new Date();
	var timestamp = date.getTime();
	var todooPanel;

	var sUrl = "/manage/todo/display.cfm?id=" + id + "&" + timestamp;
	var aResponse;
	var handleResponse = function(o){
		if(o.responseText !== undefined){
			todooPanel = new YAHOO.widget.ResizePanel("todoEdit_" + id + "_panel", { context:["todoEdit_" + id + "_panel", "tl", "tl"], width:"400px", visible:false, close:true, constraintoviewport:true } );
			todooPanel.setHeader("ToDo Item");
			todooPanel.setBody(o.responseText);
			todooPanel.setFooter("");
			todooPanel.render(div);
			todooPanel.show();
		}
	}
	var callback =
	{
		success: handleResponse,
		failure: handleResponse
	};

	var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
}


YAHOO.enrollment123.findToDoUser = function(div, fld, c, a) {
		$('#'+div+'_panel').dialog( {closeOnEscape: true
										, height: "480"
										, width: "450"
										, title: "Finder"
									});
		$('#'+div+'list').jqGrid(
			{
				url:'/includes/cfc/todo.cfc?method=getUsers&c=' + c + '&a=' + a + '&' + timestamp, //CFC that will return the users
				datatype: 'json',
				colNames:['Username','ID','Label'],
				colModel :[
					{name:'username',index:'username', width:215, sorttype:"string"},
					{name:'bs_id',index:'ID', width:20, sorttype:"int"},
					{name:'label',index:'label', width:215, align:"left",sorttype:"string"}
				],
				pager: $('#'+fld+'pager'),
				rowNum:15,
				sortorder: "asc",
				sortname: "username",
				viewrecords: false,
				loadui : 'enable',
				gridview: true,
				height:"auto",
				width:"auto",
				recordtext: "",
				pgtext:'Page {0} of {1}',
				onSelectRow: function(id){
					$('#'+fld).val(id);
					$('#'+fld+'list').resetSelection();
					$('#'+fld+'div').dialog('close');
				},
				jsonReader: {
					root: "ROWS",
					page: "PAGE",
					total: "TOTAL",
					records:"RECORDS",
					cell: "",
					id: "0"
				}

			}
		);
		$('#'+fld+'div').dialog('open');

	var todo_user_panel = new YAHOO.widget.Panel(div + "_panel", {
																context: [div,'tl','tl'],
																width:"600px",
																constraintoviewport:true,
																visible:false,
																draggable:true,
																close:true
	} );

	todo_user_panel.setHeader('Users');
	todo_user_panel.setBody('<div id="broker_datatable"></div>');
	todo_user_panel.setFooter('');
	todo_user_panel.render(div);
	todo_user_panel.show();

	var date = new Date();
	var timestamp = date.getTime();
	var sUrl = "/includes/cfc/todo.cfc?method=getUsers&c=" + c + "&a=" + a + "&" + timestamp;

	var myColumnDefs = [
		{key:"username", sortable:true, resizeable:true},
		{key:"id", sortable:true, resizeable:true},
		{key:"label", sortable:true, resizeable:true}
	];
	var myDataSource = new YAHOO.util.DataSource(sUrl);
	myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSON;
	myDataSource.responseSchema = {
		resultsList: "records",
    	fields: ["username","id","label"]
	};
	var oConfigs = {
		paginated:true,
		paginator: {
			rowsPerPage: 20,
			pageLinks:5,
			pageLinksStart:1,
			dropdownOptions:[10,20,50,100,500,1000]
		},
		selectionMode: "single",
		sortedBy:{key:"id", dir:"asc"}
	};
	var myDataTable = new YAHOO.widget.DataTable("broker_datatable", myColumnDefs, myDataSource, oConfigs);

	myDataTable.onEventSelectRow = function(oArgs) {
		alert(elTarget.firstChild.innerHTML);
	    var evt = oArgs.event;
	    var elTarget = oArgs.target;
	    var selectedID = elTarget.firstChild.innerHTML;
	    document.getElementById(fld).value = selectedID;
	    this.unselectAllRows();
	    todo_user_panel.hide();
	    document.getElementById(fld).form.submit();
	};

	myDataTable.subscribe("rowMouseoverEvent", myDataTable.onEventHighlightRow);
    myDataTable.subscribe("rowMouseoutEvent", myDataTable.onEventUnhighlightRow);
    myDataTable.subscribe("rowClickEvent", myDataTable.onEventSelectRow);
}
YAHOO.enrollment123.markToDoCompleted =  function(id, bsid) {
	var date = new Date();
	var timestamp = date.getTime();
	var todooPanel;

	var sUrl = "/manage/todo/markComplete.cfm?u="+bsid+"&id=" + id + "&" + timestamp;
	var aResponse;
	var handleResponse = function(o){
		window.location.href = location.protocol+'//'+location.host+location.pathname+(location.search?location.search:"");
	}
	var callback =
	{
		success: handleResponse,
		failure: handleResponse
	};

	var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
}
YAHOO.namespace("enrollment123.calendars");
YAHOO.enrollment123.toggleCal = function(id, code) {
    /*if (document.getElementById(id) == undefined) {
		YAHOO.enrollment123.calInit(id);
	} else {
		if (YAHOO.util.Dom.getStyle(id+'Container', 'display') == 'none') {
			YAHOO.util.Dom.setStyle(id+'Container', 'display', 'block');
		} else {
			YAHOO.util.Dom.setStyle(id+'Container', 'display', 'none');
		}
	}*/
// 	if (YAHOO.enrollment123.calendars[id] == undefined) {
		YAHOO.namespace("YAHOO.enrollment123.calendars." + id);
		var myDate = new Date();
		myDate.setMonth(myDate.getMonth() - 1);

		YAHOO.enrollment123.calendars[id].id = id;
		YAHOO.enrollment123.calendars[id].code = code;
		YAHOO.enrollment123.calendars[id].cal = new YAHOO.widget.CalendarGroup(id+"_"+code+"_Cal", {pages:3, navigator:true, title:"Select a date:", close:true, pagedate:myDate});
		YAHOO.enrollment123.calendars[id].cal.selectEvent.subscribe(YAHOO.enrollment123.calSelect, YAHOO.enrollment123.calendars[id], true);
		YAHOO.enrollment123.calendars[id].cal.render();

// 	}
	YAHOO.enrollment123.calendars[id].cal.show();
}



YAHOO.enrollment123.calSelect = function(type,args,obj) {
	var dates = args[0];
	var date = dates[0];
	var theYear = date[0];
	var theMonth = date[1];
	var theDay = date[2];
	var theDate = theMonth + "/" + theDay + "/" + theYear;
	fld = document.getElementById(obj.id+"_"+obj.code);
	fld.value = theDate;

	obj.cal.hide();
}

YAHOO.enrollment123.worklistSetCurrent = function(wid, row, t) {
	var date = new Date();
	var timestamp = date.getTime();
	var sUrl = "/manage/agents/security/worklist.cfm?f=setrow&id=" + wid + "&row=" + row + "&" + timestamp;
	var aResponse;
	if(!t) t = 'user';

	var handleResponse = function(o){
		if(o.responseText !== undefined){
			var userid = o.responseText;
			if (userid.length > 0) {
				if(t == 'user')
					document.location = "/manage/users/detail.cfm?id=" + userid;

				if(t == 'broker')
					document.location = "/manage/agents/detail.cfm?id=" + userid;
			}
		}
	}

	var callback =
	{
	  success: handleResponse,
	  failure: handleResponse
	};

	var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
}
function logSearch(frm) {
	var date = new Date();
	var timestamp = date.getTime();
	var sUrl = "/manage/agents/security/searches.cfm?&" + timestamp;
	var aResponse;
	var handleResponse = function(o){
		frm.submit();
	}
	var callback =
	{
	  success: handleResponse,
	  failure: handleResponse
	};
	var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);

}
function worklistClear(id) {
	var date = new Date();
	var timestamp = date.getTime();
	var sUrl = "/manage/agents/security/worklist.cfm?f=clear&id=" + id + "&" + timestamp;
	var aResponse;
	var handleResponse = function(o){
		document.getElementById('myinformation').innerHTML = o.responseText;
		viewHistoryData( );
	}

	var callback =
	{
	  success: handleResponse,
	  failure: handleResponse
	};

	var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
}
function worklistSave() {
	var date = new Date();
	var timestamp = date.getTime();
	var sUrl = "/manage/agents/security/worklist.cfm?f=save&" + timestamp;
	var aResponse;
	var handleResponse = function(o){
		document.getElementById('myinformation').innerHTML = o.responseText;
		viewHistoryData( );
	}

	var callback =
	{
	  success: handleResponse,
	  failure: handleResponse
	};

	var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
}
function MyInfoTab(tab) {
	var date = new Date();
	var timestamp = date.getTime();
	var sUrl = "/manage/agents/security/myinfo_functions.cfm?f=lasttab&v1=" + tab + "&" + timestamp;
	var aResponse;
	var handleResponse = function(o){
		viewHistoryData( 0 )
	}

	var callback =
	{
	  success: handleResponse,
	  failure: handleResponse
	};

	var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
}
function MyInfoAlwaysOn(val) {
	var date = new Date();
	var timestamp = date.getTime();
	var sUrl = "/manage/agents/security/myinfo_functions.cfm?f=alwaysOn&v1=" + val + "&" + timestamp;
	var aResponse;
	var handleResponse = function(o){
	}

	var callback =
	{
	  success: handleResponse,
	  failure: handleResponse
	};

	var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
}
function saveNote(id) {
	var date = new Date();
	var timestamp = date.getTime();
	var noteLabel = document.getElementById("note_"+id+"_label").value;
	var noteText = document.getElementById("note_"+id+"_note").value;
	var sUrl = "/manage/agents/security/myinfo_functions.cfm?f=savenote&v1=" + id + "&" + timestamp;
	var aResponse;
	var handleResponse = function(o){
	}

	var callback =
	{
	  success: handleResponse,
	  failure: handleResponse
	};

	var postData = "label=" + noteLabel + "&note=" + noteText;
	var request = YAHOO.util.Connect.asyncRequest('POST', sUrl, callback, postData);
}
function viewAlert(id) {
	var date = new Date();
	var timestamp = date.getTime();
	var sUrl = "/manage/agents/security/myinfo_functions.cfm?f=viewalert&v1=" + id + "&" + timestamp;
	var aResponse;
	var handleResponse = function(o){
	}

	var callback =
	{
	  success: handleResponse,
	  failure: handleResponse
	};

	var request = YAHOO.util.Connect.asyncRequest('POST', sUrl, callback);
}
function openAlertForm(id) {

	var date = new Date();
	var timestamp = date.getTime();
	var sUrl = "/manage/agents/security/alert.cfm?id=" + id + "&" + timestamp;
	var aResponse;
	var handleResponse = function(o){
		if(o.responseText !== undefined){
			a_panel_text = o.responseText;
			panelAlertEdit = new YAHOO.widget.Panel("alertedit_ponel", { width:"400px", zIndex:"1", underlay:"shadow", constraintoviewport:true, fixedcenter:true, modal:true, visible:false, draggable:false, close:true } );
			panelAlertEdit.setHeader("Alert");
			panelAlertEdit.setBody(a_panel_text);
			panelAlertEdit.setFooter("");
			panelAlertEdit.render(document.body);
			panelAlertEdit.show();
		}
	}

	var callback =
	{
	  success: handleResponse,
	  failure: handleResponse
	};

	var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
}
function handleAlertCancel() {
	panelAlertEdit.hide();
}

function handleAlertSubmit() {
	var date = new Date();
	var timestamp = date.getTime();
	var sUrl = "/manage/agents/security/alert.cfm?m=a&id=" + id + "&" + timestamp;
	var aResponse;
	var handleResponse = function(o){
		panelAlertEdit.hide();
	}
	var callback =
	{
	  success: handleResponse,
	  failure: handleResponse
	};

	var sAssignTo = "";
	var ckAssignTo = document.getElementById("bAssignTo");
	for (i=0; i < ckAssignTo.length; i++) {
		if (ckAssignTo[i].checked == true) {
			if (sAssignTo.length > 0) {
				sAssignTo += ",";
			}
			sAssignTo += ckAssignTo[i].value;
		}
	}
	var postData = "label=" + document.getElementById("label").value;
		postData += "&body=" + document.getElementById("body").value;
		postData += "&dtStart=" + document.getElementById("dtStart").value;
		postData += "&dtEnd=" + document.getElementById("dtEnd").value;
		postData += "&brokerid=" + document.getElementById("brokerid").value;
		postData += "&assignTo=" + sAssignTo;
		postData += "&bTree=" + document.getElementById("bTree").value;
		postData += "&username=" + document.getElementById("username").value;
	var request = YAHOO.util.Connect.asyncRequest('POST', sUrl, callback, postData);

}

function quickAddSubmit(postAction){
	if ($('#broker_id_short option:selected').val().length > 0) {
		Modal('<div class=working>Updating...&nbsp;&nbsp;</div>');

		var objData = {};
		objData.formJSON = $('#quickAddForm').serialize();

		$.ajax({
			url: "/includes/cfc/members/utilities.cfc?method=acceptPost&returnFormat=json",
			type: "post",
			dataType: "json",
			async: false,
			data: objData.formJSON,

		success: function (result){

			if(result[0] != 0) {

				if (postAction == 'view') {
					window.location.href = '/manage/users/detail.cfm?id='+result[0];
				} else {
					CloseModal();
					$("#message_div").html("Add Completed - ID: "+result[1]+" - <a href='/manage/users/detail.cfm?id="+result[0]+"'>View</a>");
					$("#message_div").show();
				}
			} else {
				CloseModal();
				$("#message_div").html("An error occurred while trying to add this member.");
				$("#message_div").show();
			}
		},

		error: function (xhr, textStatus, errorThrown){
			CloseModal();
			$("#message_div").html("An error occurred while trying to add this member.");
			$("#message_div").show();
		}
		});

	} else {
		alert("Please select an Agent");
	}

}


var _IE6OrLess = 0; var _PrevHTMLColor = ''; var _PrevBodyColor = '';
function Modal(sHTML) {
    $('<div />').addClass('overlay').appendTo('body').show();
    if (_IE6OrLess) {
        _PrevHTMLColor = $('html').css('background-color');
        _PrevBodyColor = $('body').css('background-color');
        $('html').css('background-color','#444');
        $('body').css('background-color','#FFF');
    }
    $('<div />').html(sHTML).addClass('modal').appendTo('body').show();
}
function CloseModal() {
    $('.modal').fadeOut('normal',function() {
        $('.modal').remove();
        $('.overlay').remove();
        if (_IE6OrLess) {
            $('html').css('background-color',_PrevHTMLColor);
            $('body').css('background-color',_PrevBodyColor);
        }
    });
}
function panelByUrl(url, n, title) {
	$('#'+n).dialog( {closeOnEscape: true
							, height: "480"
							, width: "450"
							, title: title
						});
	$('#'+n).load(url);
}


// Member Finder Panel
function memberBrokerSearchPanel(fld,brokerid) {
	brokerid = (typeof brokerid != "undefined") ? brokerid : 0;

	if(brokerid == 0) {
		msgError({title:'Error',text:'A valid Broker ID is required.'});
		return false;
	}

	var btns = {};
	btns["Cancel"] = function() {
			$( this ).dialog( "close" );
			return false;
		}

	createDialogWithContent({winname:'searchMembers',title:'Find ' + ctdMemberLabelP,url:escape('/manage/users/findMembersPanel.cfm?fldname=' + fld + '&brokerid=' + brokerid),height:585,width:675,buttons:btns});

}


// Member Finder Panel Multi-Select
function memberBrokerSearchPanelAppend(fld,brokerid) {
	brokerid = (typeof brokerid != "undefined") ? brokerid : 0;

	if(brokerid == 0) {
		msgError({title:'Error',text:'A valid Broker ID is required.'});
		return false;
	}

	var btns = {};
	btns["Done"] = function() {
			$( this ).dialog( "close" );
			return false;
		}

	createDialogWithContent({winname:'searchMembers',title:'Find ' + ctdMemberLabelP,url:escape('/manage/users/findMembersPanel.cfm?fldname=' + fld + '&brokerid=' + brokerid + '&multiple=1'),height:585,width:675,buttons:btns});

}


// Agent Finder Panel
function brokerSearchPanel(fld,type) {

	var btns = {};
	btns["Cancel"] = function() {
			$( this ).dialog( "close" );
			return false;
		}

	createDialogWithContent({winname:'searchBrokers',title:'Find ' + ctdAgentLabelP,url:escape('/manage/agents/findBrokersPanel.cfm?fldname=' + fld),height:585,width:675,buttons:btns});

}


// Agent Finder Panel With ID & Name Display
function brokerSearchPanelIDName(fld,type) {

	var btns = {};
	btns["Cancel"] = function() {
			$( this ).dialog( "close" );
			return false;
		}

	createDialogWithContent({winname:'searchBrokers',title:'Find ' + ctdAgentLabelP,url:escape('/manage/agents/findBrokersPanel.cfm?fldname=' + fld + '&idname=1'),height:585,width:675,buttons:btns});

}


// Agent Finder Panel Multi-Select Set ID & Name Display List
function brokerSearchPanelIDNameMulti(fld,targetfld) {

	var btns = {};
	btns["Done"] = function() {
			$( this ).dialog( "close" );
			return false;
		}

	createDialogWithContent({winname:'searchBrokers',title:'Find ' + ctdAgentLabelP,url:escape('/manage/agents/findBrokersPanel.cfm?fldname=' + fld + '&multiple=1&idname=1&appendto=' + targetfld),height:585,width:675,buttons:btns});

}


// Append ID & Name To Table With Delete Icon
function appendSearchIDName(idfld,listfld,id,name) {

	// See If ID Already Selected
	var curIDList = $("#" + idfld).val();
	if(jsListFind(curIDList,id) >= 0) {
		return false;
	}

	// Set List Field & Append To List
	var rowID = listfld + "_" + id;
	var listRow = "<tr id='" + rowID + "'><td>" + id + "</td><td>" + name + "</td><td><a href='javascript:deleteSearchIDName(" + id + ",\"" + idfld + "\",\"" + rowID + "\")'>X</a></td></tr>";

	if(curIDList == "") {
		curIDList = id;
	} else {
		curIDList += "," + id;
	}
	$("#" + idfld).val(curIDList);
	$("#" + listfld + " tbody").append(listRow);

}


// Removed ID & Name From Table
function deleteSearchIDName(id,idfld,listfld) {
	var newList = jsListDelete($("#" + idfld).val(),id);
	$("#" + idfld).val(newList);
	$("#" + listfld).remove();
}



// Agent Finder Panel Multi-Select ID List
function brokerSearchPanelAppend(fld) {

	var btns = {};
	btns["Done"] = function() {
			$( this ).dialog( "close" );
			return false;
		}

	createDialogWithContent({winname:'searchBrokers',title:'Find ' + ctdAgentLabelP,url:escape('/manage/agents/findBrokersPanel.cfm?fldname=' + fld + '&multiple=1'),height:585,width:675,buttons:btns});

}

function brokerSecurityPanel(fld,type) {
	//alert($('#'+fld+'list').children()[0].innerHTML.length);
	if ($('#'+fld+'list').children().length > 0 && $('#'+fld+'list').children()[0].innerHTML.length > 0) {
		if ($('#'+fld+'div').dialog('isOpen')) {
			$('#'+fld+'div').dialog('close');
		} else {
			$('#'+fld+'div').dialog('open');
		}
	} else {
		switch(type) {
			case 'todo':
				selectFunction = function(ID){
					$('#'+fld+'list').resetSelection();
					$('#'+fld+'div').dialog('close');
					document.cal_userform.cal_user.value = ID;
					document.cal_userform.submit();
				};
				break;
		}
		$('#'+fld+'div').dialog( {closeOnEscape: true
										, height: 480
										, width: 685
										, title: "Finder"
									});
		$('#'+fld+'list').jqGrid(
			{
				url:'/includes/cfc/broker/utilities.cfc?method=GetBrokerSecurity&returnType=JSON', //CFC that will return the users
				datatype: 'json',
				colNames:['Username','ID','Label','First Name','Last Name'],
				colModel :[
					{name:'user',index:'user'},
					{name:'broker_id',index:'broker_id', width:60, sorttype:"int"},
					{name:'broker_label',index:'broker_label', width:200, sorttype:"string"},
					{name:'firstname',index:'firstname', width:100, align:"left",sorttype:"string"},
					{name:'lastname',index:'lastname', width:150, align:"left",sorttype:"string"}
				],
				pager: $('#'+fld+'pager'),
				rowNum:15,
				sortorder: "asc",
				sortname: "broker_id",
				viewrecords: false,
				loadui : 'enable',
				gridview: true,
				height: "auto",
				width: "auto",
				recordtext: "",
				pgtext:'Page {0} of {1}',
				onSelectRow: selectFunction,
				jsonReader: {
					root: "ROWS",
					page: "PAGE",
					total: "TOTAL",
					records:"RECORDS",
					cell: "",
					id: "0"
				}

			}
		);
		$('#'+fld+'div').dialog('open');
	}
}
function isLeap(yr) {
	if ((parseInt(yr)%4) == 0) {
		if (parseInt(yr)%100 == 0) {
			if (parseInt(yr)%400 != 0) {
				return false;
			}
			if (parseInt(yr)%400 == 0) {
				return true;
			}
		}
		if (parseInt(yr)%100 != 0) {
			return true;
		}
	}
	if ((parseInt(yr)%4) != 0) {
		return false;
	}
}

function isDate (value) {
	arrayofdaysinmonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	// find the delimeter
	// DASH or SLASH
	// - or /
	checkfordash = value.indexOf("-");
	checkforslash = value.indexOf("/");
	checkfordot = value.indexOf(".");
	if (checkfordash >= 0) {
		thedelimiter = "-";
	} else if (checkforslash >= 0) {
			thedelimiter = "/";
	} else if (checkfordot >= 0) {
			thedelimiter = ".";
	} else {
			return false;
	}

	arrayofvalues = value.split(thedelimiter);
	if (arrayofvalues.length != 3) {
		return false;
	}
	if (isNaN(arrayofvalues[0]) || isNaN(arrayofvalues[1]) || isNaN(arrayofvalues[2])) {
		return false;
	}
	if (arrayofvalues[0].length > 2 || arrayofvalues[1].length > 2 || arrayofvalues[2].length != 4) {
		if(arrayofvalues[0].length > 2 || arrayofvalues[1].length > 2 || arrayofvalues[2].length != 2){
			return false;
		}
	}
	if(arrayofvalues[2].length == 2){
		presentYear = new Date().getFullYear();
		arrayOfYear = (''+presentYear).split('');
		lastTwo = arrayOfYear.slice(2);
		lastTwo = parseInt(lastTwo[0]+lastTwo[1]);
		if (parseInt(arrayofvalues[2]) <= (lastTwo + 15 )){
			arrayofvalues[2] = ''+(parseInt(arrayofvalues[2])+ 2000);
		}else{
			arrayofvalues[2] = ''+(parseInt(arrayofvalues[2])+ 1900);
		}
	}
	if (arrayofvalues[0] == '0' || arrayofvalues[1] == '0' || arrayofvalues[2] == '0') {
		return false;
	}
	if (parseInt(arrayofvalues[0]) > 12 || parseInt(arrayofvalues[0]) < 1) {
		return false;
	}
	if (parseInt(arrayofvalues[0]) != 2) {
		if (parseInt(arrayofvalues[1]) > parseInt(arrayofdaysinmonth)) {
			return false;
		}
	} else {
		if (isLeap(arrayofvalues[2])) {
			if (parseInt(arrayofvalues[1]) > 29) {
				return false;
			}
		} else {
			if (parseInt(arrayofvalues[1]) > 28) {
				return false;
			}
		}
	}
	if (parseInt(arrayofvalues[2]) < 1900 || parseInt(arrayofvalues[2]) > 2100) {
		return false;
	}

	return true;
}

function checkadate(fld) {
	if (isDate(fld.value) == 0) {
		$(fld).css('background-color', 'red');
		alert('Invalid date');
		return false;
	} else {
		$(fld).css('background-color', '');
	}
}

function daterequired(e) {
	testdate = e.val();
	delimitererror=0;
	aDateParts = testdate.split("/");
	if(aDateParts.length != 3) {
		aDateParts = testdate.split("-");
		if(aDateParts.length != 3) {
			aDateParts = testdate.split(".");
			if(aDateParts.length != 3) {
				delimitererror=1;
			}
		}
	}
	dateparterror = 0;
	mm = '';
	dd = '';
	yy = '';
	yyyy = '';
	if(delimitererror == 0) {
		mm=aDateParts[0];
		dd=aDateParts[1];
		if(aDateParts[2].length == 4)
			yyyy=aDateParts[2];
		else
			yy=aDateParts[2];
	}
	else {
		if(testdate.length == 6) {
			mm=testdate.substr(0,2);
			dd=testdate.substr(2,2);
			yy=testdate.substr(4,2);
		}
		else {
			if(testdate.length == 8) {
				mm=testdate.substr(0,2);
				dd=testdate.substr(2,2);
				yyyy=testdate.substr(4,4);
			}
			else {
				dateparterror = 1;
			}
		}
	}

	if(dateparterror == 0) {
		mm = zerofill(mm,2);
		dd = zerofill(dd,2);
		yy = zerofill(yy,2);

		if(yyyy.length == 0) {
			if(yy.length > 0) {
				var now = new Date();
				yearsplit = String(now.getFullYear()+2);
				yearsplitlength = yearsplit.length;
				if(Number(yy) > Number(yearsplit.substring(yearsplitlength, yearsplitlength - 2)))
					yyyy = '19' + yy;
				else
					yyyy = '20' + yy;
			}
		}

		testdate = mm + '/' + dd + '/' + yyyy;
	}
	else
		testdate = e.val(); <!--- leave it alone --->

	if(isDate(testdate)) {
		e.val(testdate);
//				e.css( "backgroundColor", "white" );
	}
	else {
//				e.css( "backgroundColor", "##FEEFB3" );
	}
	return;
}

function zerofill (str, max) {
  str = str.toString();
  return str.length < max ? zerofill("0" + str, max) : str;
}


function cleanSearchForm(frm){
  searchform = jQuery("#"+frm);
  searchform.find(':input[value=""]').attr('disabled', true);
  searchform.submit();
}
/*
function activateSpinner(spinSpan){
		$('#' + spinSpan).next().css('display','inline');
}
*/

function verifyAddress( err, address1_val, address2_val, city_val, state_val, zipcode_val, address1_fld, address2_fld, city_fld, state_fld, zipcode_fld, county_fld ) {
// 	$('#' + err).next().css('display','inline')	
// 	activateSpinner(err);
	_update = 0; 
	if(arguments.length == 11) county_fld = '';
	if(arguments.length == 13) _update = arguments[12];
// 	console.log($.ajax);	 
	window.application.ajax({
		url: "/includes/cfc/api/AddressVerification.cfc",
		data: {
			method: 'Verify',
			t: new Date().getTime(),
			address1: address1_val,
			address2: address2_val,
			city: city_val,
			state: state_val,
			zip: zipcode_val,
			returnFormat: 'json'
		},
		async: false,
		normalizeJSON: true,
		success: function(response){
			if (response.success){
				if (response.data.error.length > 0) {
					var	errNode = $('#' + err);
					
					if (errNode.hasClass('check_out')){
						errNode.html(response.data.error + '<br>').addClass("fade-out");
						$('#' + err + '_replace').hide();

						window.setTimeout(function(){
							errNode.html('').removeClass('fade-out')
						}, 3100)
					}else{
						$('#' + err).html(response.data.error + '<br>');
						$('#' + err + '_replace').hide();
					}
				}
				else {
					$('#' + err + '_replace').show();
				}
				
				$( '#' + address1_fld ).html(response.data.address1);
				$( '#' + city_fld ).html(response.data.city);
				$( '#' + state_fld ).html(response.data.state);
				$( '#' + zipcode_fld ).html(response.data.zip);
				if (county_fld.length > 0) {
					$('#' + county_fld).html(response.data.county);
				}
				
				if(_update == 1)
				{
					if (err.indexOf('_Other_') > 0) 
					{
						$('input[name=Other_Address]').val(response.data.address1);
						$('input[name=Other_city]').val(response.data.city);
						$('select[name=Other_state]').val(response.data.state);
						$('input[name=Other_zipcode]').val((response.data.zip.length >= 5) ? response.data.zip.substring(0, 5) : '');
						if (county_fld.length > 0) {
							$('input[name=Other_county]').val(response.data.county);
						}
					}
					else 
					{
						$('input[name=address]').val(response.data.address1);
						$('input[name=city]').val(response.data.city);
						$('select[name=state]').val(response.data.state);
						$('input[name=zipcode]').val((response.data.zip.length >= 5) ? response.data.zip.substring(0, 5) : '');
						if (county_fld.length > 0) {
							$('input[name=county]').val(response.data.county);
						}
					}
				}
			} else {
				alert(response.errors[0].message);
			}
		}
	});
};
function verifyEmail( err, email_val, email_fld ) {
	_update = 0;

	if (email_val.length > 0) {
		window.application.ajax({
			url: "/includes/cfc/api/AddressVerification.cfc",
			data: {
				method: 'VerifyEmail',
				t: new Date().getTime(),
				email: email_val,
				returnFormat: 'json'
			},
			async: false,
			normalizeJSON: true,
			success: function(response)
			{
				if(response.success)
				{
					$('#' + err).html(response.data.error);
					$('#' + email_fld).html(response.data.result);
					$('#' + email_fld).dialog({
						title: email_val,
						autoOpen: false,
						modal: false,
						resizable: false
					});
					$('#' + email_fld).dialog('open');
				} else
					alert(response.errors[0].message);
			}
		});
	}
};
function verifyBIN( bin, id, fld ) {
	_update = 0;

	if (bin.length > 0 || id.length > 0) {
		window.application.ajax({
			url: "/includes/cfc/api/AddressVerification.cfc",
			data: {
				method: 'VerifyBIN',
				t: new Date().getTime(),
				id: id,
				bin: bin,
				returnFormat: 'json'
			},
			async: false,
			normalizeJSON: true,
			success: function(response)
			{
				if(response.success) $('#' + fld).html(response.data);
				else alert(response.errors[0].message);
			}
		});
	}
};
function verifyPhone( err, phone_fld, phone_val, phone_index, userid ) {
	_update = 0;

	if (phone_val.length > 0) {
		window.application.ajax({
			url: "/includes/cfc/api/AddressVerification.cfc",
			data: {
				method: 'VerifyPhone',
				t: new Date().getTime(),
				id: userid,
				phone: phone_val,
				phoneIndex: phone_index,
				returnFormat: 'json'
			},
			async: false,
			normalizeJSON: true,
			success: function(response)
			{
				if(response.success)
				{
					$('#' + phone_fld).html(response.data.linetype);
					$('#' + phone_fld).show();
				} else
					alert(response.errors[0].message);
			}
		});
	}
};


// Get List Length
function jsListLen(list,delim){
	list = (typeof list != "undefined") ? list : '';
	delim = (typeof delim != "undefined") ? delim : ',';
	list = unescape(list);

	var aList = list.split(delim);
	return aList.length;
}


// Get List Value At Index (zero-based list)
function jsListGetAt(list,pos,delim){
	list = (typeof list != "undefined") ? list : '';
	pos = (typeof pos != "undefined") ? pos : 0;
	delim = (typeof delim != "undefined") ? delim : ',';
	list = unescape(list);

	var aList = list.split(delim);
	if(aList.length == 0 || pos >= aList.length){
		return 0;
	}
	return aList[pos];
}


// Find Element In List (zero-based list)
function jsListFind(list,findval,delim){
	list = (typeof list != "undefined") ? list : '';
	findval = (typeof findval != "undefined") ? findval : 0;
	delim = (typeof delim != "undefined") ? delim : ',';
	list = unescape(list);

	var aList = list.split(delim);
	if(aList.length == 0){
		return -1;
	}
	iRetVal = -1;
	for(i = 0;i < aList.length;i++){
		if(aList[i] == findval){
			iRetVal = i;
			break;
		}
	}
	return iRetVal;
}


// Delete Specified Element In List (zero-based list)
function jsListDelete(list,findval,delim) {
	list = (typeof list != "undefined") ? list : '';
	findval = (typeof findval != "undefined") ? findval : 0;
	delim = (typeof delim != "undefined") ? delim : ',';
	list = unescape(list);

	var elemPos = jsListFind(list,findval,delim);

	// Return List If Value Not In List
	if(elemPos < 0) {
		return list;
	}

	// Remove From List
	var aList = list.split(delim);
	aList.splice(elemPos,1);

	// Return Value
	if(aList.length > 0) {
		return aList.join(delim);
	} else {
		return "";
	}
}


// Trim Leading Spaces
function leftTrim(lString){
	if(lString == null) {
		return '';
	}
	while (lString.substring(0,1) == ' '){
		lString = lString.substring(1, lString.length);
	}
	return lString;
}


// Trim Trailing Spaces
function rightTrim(rString){
	if(rString == null) {
		return '';
	}
	while (rString.substring(rString.length-1, rString.length) == ' '){
		rString = rString.substring(0,rString.length-1);
	}
	return rString;
}


// Trim Leading & Trailing Spaces
function allTrim(sString){
	// Trim Leading Spaces
	sString = leftTrim(sString);

	// Trim Trailing Spaces
	sString = rightTrim(sString);
	return sString;
}


// Validate ID Fields
function validateIDField(fld,value) {

	var tmpValue = allTrim(value.replace(/\t+/g, ""));

	// Check If Not Blank
	if(tmpValue != "") {
		if(!isAnInteger(tmpValue)){
			
			var clsFunc = function() {
				$("#" + fld).focus();
			}
			msgError({title:'Invalid ID',text:'<strong>' + tmpValue + '</strong> is not a valid ID.',closeFunc:clsFunc});
			return false;
		}
		// Set Field With Trimmed Value
		$("#" + fld).val(tmpValue);
	}
	return true;
}


// Format Comma List ID Field
function formatIDList(fld,value) {

	// Trim & Replace Returns With Commas
	var tmpValue = allTrim(value.replace(/\t+/g, ""));
	tmpValue = tmpValue.replace(/\r?\n|\r/g, ",");
	tmpValue = tmpValue.replace(/,+/g,",");

	// Check If Not Blank
	if(tmpValue != "") {
		var clsFunc = function() {
			$("#" + fld).focus();
		}
		var lBadIDs = "";
		var lFormattedIDs = "";
		for(i = 0;i < jsListLen(tmpValue,",");i++) {
			var chkValue = allTrim(jsListGetAt(tmpValue,i,","));
			if(chkValue != "") {
				lFormattedIDs = lFormattedIDs + "," + chkValue;
			}
		}
		// Set Field With Trimmed & Formatted Value
		if(lFormattedIDs.length > 0) {
			lFormattedIDs = lFormattedIDs.substring(1);
			$("#" + fld).val(lFormattedIDs);
		}
	}
	return true;
}

// Validate Comma List ID Field
function validateIDList(fld,value) {

	// Trim & Replace Returns With Commas
	var tmpValue = allTrim(value.replace(/\t+/g, ""));
	tmpValue = tmpValue.replace(/\r?\n|\r/g, ",");
	tmpValue = tmpValue.replace(/,+/g,",");

	// Check If Not Blank
	if(tmpValue != "") {
		var clsFunc = function() {
			$("#" + fld).focus();
		}
		var lBadIDs = "";
		var lFormattedIDs = "";
		for(i = 0;i < jsListLen(tmpValue,",");i++) {
			var chkValue = allTrim(jsListGetAt(tmpValue,i,","));
			if(chkValue != "") {
				if(!isAnInteger(chkValue)) {
					lBadIDs = lBadIDs + ", " + chkValue;
				}
				lFormattedIDs = lFormattedIDs + "," + chkValue;
			}
		}
		// Set Field With Trimmed & Formatted Value
		if(lFormattedIDs.length > 0) {
			lFormattedIDs = lFormattedIDs.substring(1);
			$("#" + fld).val(lFormattedIDs);
		}
		if(lBadIDs.length > 0) {
			lBadIDs = lBadIDs.substring(2);
			var clsFunc = function() {
				$("#" + fld).focus();
			}
			msgError({title:'Invalid ID',text:'The following IDs are not valid:<br><br><strong>' + lBadIDs + '</strong>',closeFunc:clsFunc});
			return false;
		}
	}
	return true;
}


// Validate Date (with or without keywords)
function validateDateField(fld,value,kw) {
	kw = (typeof kw != "undefined") ? kw : 0;		// Check Keywords
	
	var tmpValue = "";
	if (typeof value != 'undefined')
		 tmpValue = allTrim(value.replace(/\t+/g, ""));

	// Return If Blank
	if(tmpValue == "") {
		return true;
	}

	// Set Field With Trimmed Value
	$("#" + fld).val(tmpValue);

	// Set On Close Function
	var clsFunc = function() {
		$("#" + fld).focus();
	}

	// Check Keywords
	if(kw == 1) {
		var kwList = "today,yesterday,tomorrow,thisweek,lastweek,nextweek,thismonth,nextmonth,lastmonth,thisyear,lastyear,nextyear";
		var kwNextLastList = "lastweek,nextweek,nextmonth,lastmonth,lastyear,nextyear";
		if(jsListFind(kwList,tmpValue.toLowerCase()) >= 0) {
			return true;
		} else {
			// Check last#days & next#days
			if(tmpValue.toLowerCase().substring(0,4) == "next" || tmpValue.toLowerCase().substring(0,4) == "last") {

				if(jsListFind(kwNextLastList,tmpValue.toLowerCase()) < 0) {

					var daysChunk = allTrim(tmpValue.substring(4).toLowerCase());
					var daysPos = daysChunk.indexOf('days');
					var numDays = "";
					if(daysPos >= 0) {
						numDays = daysChunk.substring(0,daysPos);
					} else {
						msgError({title:"Invalid Keyword",text:"Next#Days and Last#Days keywords require the word 'days'.",width:400,closeFunc:clsFunc});
						return false;		
					}
					if(numDays == "") {
						msgError({title:"Invalid Keyword",text:"'<strong>" + tmpValue + "</strong>' keyword is missing the number of days.",width:400,closeFunc:clsFunc});
						return false;		
					}
					if(!isAnInteger(numDays)) {
						msgError({title:"Invalid Keyword",text:"'<strong>" + tmpValue + "</strong>' number of days is not valid.",width:400,closeFunc:clsFunc});
						return false;		
					}
				}
				return true;
			}
		} 
	}

	if(!isDate(tmpValue)) {
		var kwMsg = "";
		if(kw != 0) {
			kwMsg = " or keyword";
		}
		msgError({title:"Invalid Date",text:"'<strong>" + tmpValue + "</strong>' is not a valid date" + kwMsg + ".",width:400,closeFunc:clsFunc});
		return false;		
	}
	return true;
}


// Validate A Number
function validateANumber(fld,value) {
	var tmpValue = allTrim(value.replace(/\t+/g, ""));

	// Return If Blank
	if(tmpValue == "") {
		return true;
	}

	if(!isAnInteger(tmpValue)){
		var clsFunc = function() {
			$("#" + fld).focus();
		}
		msgError({title:'Invalid Number',text:'<strong>' + tmpValue + '</strong> is not a valid number.',closeFunc:clsFunc});
		return false;
	}	
	return true;
}


// Validate Is An Integer
function isAnInteger(i) {
	
	try {

		if(i == null) {
			i = '';
		}

		if(i.match(/^[0-9]+$/)) {
			var tmpVal = parseInt(i,10);
			if(tmpVal < parseInt(2147483647)) {
				return true;
			}
		}

	} catch(e) {
		return false;
	}
	return false;
}


// View System Variables
function viewVars(issup) {
	issup = (typeof issup != "undefined") ? issup : 0;

	if(issup == 0) {
		msgError({title:'Unauthorized',text:'You are not authorized for this function.'});
		return false;
	}
	
	// Set Button
	var btns = {};
	btns["Close"] = function() {
			$( this ).dialog( "close" );
			return false;
		}

	createDialogWithContent({winname:'suViewVars',title:'View Variables (SU Only)',url:'/manage/global/corp/viewVariables.cfm',height:800,width:800,buttons:btns,resizable:true,modal:false,allowfloat:true});	
}

// Interactions Popup Window
	var winInteractionsName
function newInteractionPopup(winid,url) {
	if (!winInteractionsName || winInteractionsName.closed){
		winInteractionsName = window.open(url,winid,'height=800,width=580,left=0,top=0,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no');
	}

	setTimeout("winInteractionsName.focus()", 500);		// IE Hack To Focus Window
}

// ToDo Popup Window
	var winToDoName
function newToDoPopup(winid,url) {
	if (!winToDoName || winToDoName.closed){
		winToDoName = window.open(url,winid,'height=825,width=700,left=0,top=0,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no');
	}
	setTimeout("winToDoName.focus()", 500);		// IE Hack To Focus Window
}