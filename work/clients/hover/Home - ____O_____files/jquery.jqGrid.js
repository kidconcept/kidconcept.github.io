//This file should be used if you want to debug and develop
function jqGridInclude()
{
    var pathtojsfiles = "/_scripts/jqGrid/"; // need to be ajusted
    // set include to false if you do not want some modules to be included
    var modules = [
        { include: true, incfile:'i18n/grid.locale-en.js'}, // jqGrid translation
        { include: true, incfile:'grid.base.js'}, // jqGrid base
        { include: true, incfile:'grid.common.js'}, // jqGrid common for editing
        { include: false, incfile:'grid.formedit.js'}, // jqGrid Form editing
        { include: false, incfile:'grid.inlinedit.js'}, // jqGrid inline editing
        { include: false, incfile:'grid.celledit.js'}, // jqGrid cell editing
        { include: false, incfile:'grid.subgrid.js'}, //jqGrid subgrid
        { include: false, incfile:'grid.treegrid.js'}, //jqGrid treegrid
        { include: false, incfile:'grid.custom.js'}, //jqGrid custom 
        { include: false, incfile:'grid.postext.js'}, //jqGrid postext
        { include: false, incfile:'grid.tbltogrid.js'}, //jqGrid table to grid 
        { include: false, incfile:'grid.setcolumns.js'}, //jqGrid setcolumns
        { include: false, incfile:'grid.import.js'}, //jqGrid import
        { include: true, incfile:'jquery.fmatter.js'}, //jqGrid formater
        { include: true, incfile:'JsonXml.js'}, //xmljson utils
        { include: false, incfile:'jquery.searchFilter.js'} // search Plugin
    ];
    var filename;
    for(var i=0;i<modules.length; i++)
    {
        if(modules[i].include === true) {
        	
        	filename = pathtojsfiles+modules[i].incfile;
       		if(jQuery.browser.safari) {
       			jQuery.ajax({url:filename,dataType:'script', async:false, cache: true});
       		} else {
       			IncludeJavaScript(filename);
       		}
        }
    }
    function IncludeJavaScript(jsFile)
    {
        var oHead = document.getElementsByTagName('head')[0];
        var oScript = document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.charset = 'utf-8';
        oScript.src = jsFile;
        oHead.appendChild(oScript);        
    };
};
jqGridInclude();
