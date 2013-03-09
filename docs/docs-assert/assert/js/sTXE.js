
/* ===================================================
*	sTXE - HTML Rich Text editor
*	Copyright 2012 shakthydoss.com
*	
*	sTXE  is a simple HTML Rich Text editor writter by shakthydoss.
*	users of this sTXE  is a simple HTML Rich Text editor are allowed 
*	to make copy or modify FILE for the custom end user experience.
*
*	Please drop a mail at shakthydoss@gmail.com for reporting bug and enhancement.
*	For more information http://shakthydoss.com
* ========================================================== */

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

 String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };

function loadEditorPlane(editorPlaneName , controlPanel ,wh) {
	var ifm = createIframeEditor(editorPlaneName);

	var contrls = "";
	if(controlPanel===undefined){
	    contrls = loadControlPanel(editorPlaneName );
	}else{
	    contrls = loadControlPanel(editorPlaneName ,controlPanel);
	}	
	var box = editorPlaneName+"Box";	
	document.getElementById(editorPlaneName).id = box ;
	document.getElementById(box).className += 'box';
	
	var w = "680px";
	var h = "220px";
	if(wh !== undefined){
		if(wh.width){
		 w = wh.width+"px";
		}  
		if(wh.height){
		 h = wh.height+"px";
		}   
		if(wh.alignment === 'left'){
			document.getElementById(box).className += ' boxLeftAlignment';
		}
		if(wh.alignment === 'right'){
			document.getElementById(box).className += ' boxRightAlignment';
		}
	}     
	var tem = "<div class='controlPanel' style='width:100%;'>" + contrls +"</div>" +ifm;

	// resize 
	if(wh !== undefined && wh.resize ){
		tem = "<div class='editorPlanelwrapper editorResize' style='width:"+w+";height:"+h+";'>" + tem + "</div>";
	}else{
		tem = "<div class='editorPlanelwrapper' style='width:"+w+";height:"+h+";'>" + tem + "</div>";
	}
	 var popupBox1 = getHTMLForInsertImge(editorPlaneName);
	 var popupBox2 = getHTMLForUploadImge(editorPlaneName);
         tem = tem + popupBox1;
	  tem = tem + popupBox2;
        document.getElementById(box).innerHTML = tem ;
		getIFrameDocument(editorPlaneName).open();
		// optionally write content here
		getIFrameDocument(editorPlaneName).close();
		getIFrameDocument(editorPlaneName).designMode = "On";
	
}

function getIFrameDocument(docID){
  if (document.getElementById(docID).contentDocument){
	// alert("Hi this is mozila");
    return document.getElementById(docID).contentDocument;
  } else {
	//	alert("Not mozila");
    return document.frames[docID].document;
  }
}


function applyChange(editorPlaneName,aName,aArg)
{
	 getIFrameDocument(editorPlaneName).execCommand(aName,false, aArg);
 	 document.getElementById(editorPlaneName).contentWindow.focus()
}


function getHtmlContent(editorPlaneName) {
	var content = getIFrameDocument(editorPlaneName).body.innerHTML;
	alert(content);
}

function getHyperLink(editorPlaneName){

 var link = window.prompt("Please enter the url","http://shakthydoss.com");
 applyChange(editorPlaneName,'CreateLink',link);

}

function getforeColor(editorPlaneName){
	colorObj = document.getElementById("color");
	var color = colorObj[colorObj.selectedIndex].value
	if(color==-1){
		color = window.prompt("Please enter the color or color code","#FFFFF");
	}
	
     applyChange(editorPlaneName ,'ForeColor',color)
}


function insertSymbols(editorPlaneName , action, value){

	if(value==-1){
		value = window.prompt("Please enter html symbol codes","&#171;");
	}
	applyChange(editorPlaneName ,action,value)
}

function showAuthorDetail(){
	var auth = "sTXE - HTML Rich Text editor is written by shakthydoss. For more information please visit  http://shakthydoss.com";	
	alert(auth);
}


function loadControlPanel(editorPlaneName , controlPanel) {
    var atleastOnebutton = false;
    var contorlbuttons = "";
    
    if(controlPanel === undefined){
	controlPanel = {
	    bold : true,
	    italic:true,
	    underline:true,
	    align_left:true,
	    align_center:true,
	    align_right:true,
	    align_justify:true,
	    unordered_list:true,
	    ordered_list:true,
	    indent:true,
	    outdent:true,
	    superscript:true,
	    subscript:true,
	    insert_link:true,
	    remove_link:true,
	    fonts:true,
	    fonts_size:true,
	    fonts_color:true,
	    symbols:true,
	    remove_formate:true,
	    getHtml:true,
	    author:true,
	    image:true
	};
    } 
     
    if(controlPanel.bold === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'bold', 'bold', 'Bold'.capitalize(),'icon-bold' );
	contorlbuttons = contorlbuttons + "\n";
	  atleastOnebutton = true;
    }
    
    if(controlPanel.italic === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'italic', 'italic', 'Italic'.capitalize(),'icon-italic' );
	contorlbuttons = contorlbuttons + "\n";
        atleastOnebutton = true;
    }

    if(controlPanel.underline === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'underline', 'underline', 'underline'.capitalize(),'icon-text-width' );
	contorlbuttons = contorlbuttons + "\n";        
	atleastOnebutton = true;
    }
    
    if(controlPanel.align_left === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'align_left', 'JustifyLeft', 'Align Left'.capitalize(),'icon-align-left' );
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    if(controlPanel.align_center === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'align_center', 'JustifyCenter', 'Align Center'.capitalize(),'icon-align-center' );
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    
    if(controlPanel.align_right === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'align_right', 'JustifyRight', 'Align Right'.capitalize(),'icon-align-right' );
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    
    if(controlPanel.align_justify === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'align_justify', 'JustifyFull', 'Justify'.capitalize(),'icon-align-justify' );
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    if(controlPanel.unordered_list === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'insert_orderedlist', 'insertorderedlist', 'Ordered List'.capitalize(),'icon-th-list' );
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    if(controlPanel.ordered_list === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'insert_unorderedlist', 'insertunorderedlist', 'unordered List'.capitalize(),'icon-tasks' );
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    
    if(controlPanel.indent === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'indent', 'indent', 'indent'.capitalize(),'icon-indent-left' );
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    if(controlPanel.outdent === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'outdent', 'outdent', 'outdent'.capitalize(),'icon-indent-right' );
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    if(controlPanel.superscript === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'superscript', 'superscript', 'superscript'.capitalize(),'icon-chevron-up' );
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    if( controlPanel.subscript === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'subscript', 'subscript', 'subscript'.capitalize(),'icon-chevron-down' );
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    if(controlPanel.insert_link === true){
      contorlbuttons = contorlbuttons + "<a href='#' title='Insert Link' class='insert_link' onClick=\"getHyperLink('"+editorPlaneName+"')\"><i class='icon-globe'></i></a>";
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    if(controlPanel.remove_link === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'Unlink', 'Unlink', 'Remove Link'.capitalize(),'icon-remove-circle' );
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }

    if(controlPanel.image === true){
        contorlbuttons = contorlbuttons + "<a href='#'  class='img_icon' title='Image' onClick=\"openpopup('"+editorPlaneName+"popup1')\" > <i class='icon-picture'></i></a>";
	contorlbuttons = contorlbuttons + "\n";   

 contorlbuttons = contorlbuttons + "<a href='#'  class='img_icon_upload' title='Upload Image' onClick=\"openpopup('"+editorPlaneName+"popup2')\" > <i class=' icon-circle-arrow-up'></i></a>";
	contorlbuttons = contorlbuttons + "\n"; 

        atleastOnebutton = true;
	
    }    

    if(controlPanel.fonts === true){

	var font = "<select id='fonts' onChange=\"applyChange('"+editorPlaneName+"', 'fontname',this[this.selectedIndex].value)\">";
	font = font +"<option value='Arial'>Arial</option>" ;
        font = font +"<option value='Comic Sans MS'>Comic Sans MS</option>" ;
	font = font +"<option value='Courier New'>Courier New</option>" ;
        font = font +"<option value='Monotype Corsiva'>Monotype</option>" ;
	font = font +"<option value='Tahoma'>Tahoma</option>" ;
        font = font +"<option value='Times'>Times</option>" ;
        font = font +"</select>" ;
	contorlbuttons = contorlbuttons + font;
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    if(controlPanel.fonts_size === true){

	var font_si = 	"<select id='size' onChange=\"applyChange('"+editorPlaneName+"','fontsize',this[this.selectedIndex].value)\">";
	font_si = font_si + "<option value='1'>1</option>";
	font_si = font_si + "<option value='2'>2</option>";
	font_si = font_si + "<option value='3'>3</option>";
	font_si = font_si + " <option value='4'>4</option>";
	font_si = font_si + " <option value='5'>5</option>";
	font_si = font_si + "</select>";
	contorlbuttons = contorlbuttons + font_si;
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }

   if(controlPanel.fonts_color === true){
	var font_col = "<select id='color' onChange=\"getforeColor('"+editorPlaneName+"')\">";
        font_col = font_col + " <option value='black'>black</option>"; 
        font_col = font_col + "<option style='color:red;' value='red'>red</option>"; 
        font_col = font_col + " <option style='color:blue;' value='blue'>blue</option>"; 
        font_col = font_col + "<option style='color:green;' value='green'>green</option>"; 
        font_col = font_col + "<option style='color:pink;' value='pink'>pink</option>"; 
        font_col = font_col + " <option  value='-1'>others</option>"; 
        font_col = font_col + "</select>"; 

        contorlbuttons = contorlbuttons + font_col;
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }    

    if(controlPanel.symbols === true){
        var sys = "<select id='symbols' title='Symbols' onChange=\"insertSymbols('"+editorPlaneName+"', 'insertHTML',this[this.selectedIndex].value)\">";
	sys = sys + "<option value='&amp;'>&amp;</option>";   
	sys = sys + "<option value='&cent;'>&cent;</option>	"; 
	sys = sys + "<option value='&copy;'>&copy;</option>"; 
	sys = sys + "<option value='&micro;'>&micro;</option>"; 
	sys = sys + "<option value='&euro;'>&euro;</option>"; 
	sys = sys + "<option value='&pound;'>&pound;</option>"; 
	sys = sys + "<option value='&reg;'>&reg;</option>"; 
	sys = sys + "<option value='&trade;'>&trade;</option>"; 
	sys = sys + "<option value='&yen;'>&yen;</option>";   
	sys = sys + "<option value='&#2352;'>&#2352;</option>";  
        sys = sys + " <option  value='-1'>others</option>";    
	sys = sys + "</select>";  
	contorlbuttons = contorlbuttons + sys;   
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    if(controlPanel.remove_formate === true){
        contorlbuttons = contorlbuttons + createContorlButton(editorPlaneName,'RemoveFormat', 'RemoveFormat', 'Remove Format'.capitalize(),'icon-remove');
	contorlbuttons = contorlbuttons + "\n";          
	 atleastOnebutton = true;
    }
    
    if(controlPanel.getHtml === true){
        contorlbuttons = contorlbuttons + "<a href='#' class='get_html' title='Get Html Source' onClick=\"getHtmlContent('"+editorPlaneName+"')\"><i class='icon-list-alt'></i></a>";
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }
    
    if(controlPanel.author === true){
        contorlbuttons = contorlbuttons + "<a href='#'  class='get_author' title='About sTXE' onClick='showAuthorDetail()' ><i class='icon-user'></i></a>";
	contorlbuttons = contorlbuttons + "\n";   
        atleastOnebutton = true;
    }

    
    if(!atleastOnebutton){
        alert("sTXE - Control Panel is not configured");
	return ;
    }
   return contorlbuttons;
}


function createContorlButton(editorPlaneName, buttonName, controlName, title , iconName){
    var button = "<a href='#' class='"+buttonName+"' title='"+title+"' onClick=\"applyChange('"+editorPlaneName+"','"+controlName+"')\"><i class='"+iconName+"'></i></a>";
    return button;
}

function createIframeEditor(editorPlaneName){
  var ifrm = "<iframe id='"+editorPlaneName+"'  class='editorPlane' style='width:100%;height:84%'></iframe>";
 return ifrm;
}

function getEditorContent(editorPlaneName) {
	var content = getIFrameDocument(editorPlaneName).body.innerHTML;
	return content;
}


function getInsertImgtype(editorPlaneName , editorPlaneNamePopupId){
	
        var w = document.getElementById(editorPlaneNamePopupId+"width").value; 
        var h = document.getElementById(editorPlaneNamePopupId+"height").value; 
        var imgurl =  document.getElementById(editorPlaneNamePopupId+"weburl").value;  
        var e = document.getElementById(editorPlaneNamePopupId+"align");
        var ali = e.options[e.selectedIndex].value;
        var altx =  document.getElementById(editorPlaneNamePopupId+"alt").value;  
	applyChange(editorPlaneName ,'InsertImage',imgurl);
	if(imgurl.trim()===""){
		alert("Image path is required..");
		return ;
	}
        closepopup(editorPlaneNamePopupId);

		

	var target = getElementsByAttributeName('editorPlanelContainer','img', 'src', imgurl);
	target.width = w;
	target.height = h;
	target.align = ali;
	target.alt = altx;
	
}	

function getuploadImgtype(editorPlaneName , editorPlaneNamePopupId){

}

function getHTMLForInsertImge(editorPlaneName){
   var htmlInsertImage = "<div id='"+editorPlaneName+"popup1' class='popup'> ";
   htmlInsertImage = htmlInsertImage +"<p><Strong>Insert Img by path:</Strong>";
   htmlInsertImage = htmlInsertImage + "<span id='"+editorPlaneName+"popup1imgPath' >";
   htmlInsertImage = htmlInsertImage + "<p>Img Path : <input type='text' id= '"+editorPlaneName+"popup1weburl' value='' style='width:122px;border:1' >&nbsp;Eg: C:\\picture\\me.jpg" ;
   htmlInsertImage = htmlInsertImage + "<p><span>Width : <input type='text' id= '"+editorPlaneName+"popup1width' value='180' style='width:40px;border:1;'></input>px</span>";
   htmlInsertImage = htmlInsertImage + "&nbsp;<span>Height : <input type='text' id= '"+editorPlaneName+"popup1height' value='120' style='width:40px;border:1;'></input>px </span>";
   htmlInsertImage = htmlInsertImage + "<p><span>Alt : &nbsp;&nbsp;<input type='text' id= '"+editorPlaneName+"popup1alt' value='Downloading...' style='width:132px;border:1' ></input></span>";
   htmlInsertImage = htmlInsertImage + "<p>Align : <select id= '"+editorPlaneName+"popup1align'>";
   htmlInsertImage = htmlInsertImage + "<option value='default'>Default</option>";
   htmlInsertImage = htmlInsertImage + "<option value='left'>Left</option>";
   htmlInsertImage = htmlInsertImage + "<option value='right'>Right</option>"; 
   htmlInsertImage = htmlInsertImage + "</select>";
   htmlInsertImage = htmlInsertImage + "<input type='button' onClick=\"getInsertImgtype('"+editorPlaneName+"' , '"+editorPlaneName+"popup1')\" value='Insert'></input> </span>";
   htmlInsertImage = htmlInsertImage + "</div><div id='bg' class='popup_bg'></div> ";
  return htmlInsertImage;
}
	

function getHTMLForUploadImge(editorPlaneName){
   var htmlInsertImage = "<div id='"+editorPlaneName+"popup2' class='popup'> ";
   htmlInsertImage = htmlInsertImage +"<p><Strong>Upload Img:</Strong>";
   htmlInsertImage = htmlInsertImage + "<p><span id='"+editorPlaneName+"popup1imgPath' >";
   htmlInsertImage = htmlInsertImage + "<p><span>Width : <input type='text' id= '"+editorPlaneName+"popup2width' value='180' style='width:40px;border:1;'></input>px</span>";
   htmlInsertImage = htmlInsertImage + "&nbsp;<span>Height : <input type='text' id= '"+editorPlaneName+"popup2height' value='120' style='width:40px;border:1;'></input>px </span>";
   htmlInsertImage = htmlInsertImage + "<p><span>Alt : &nbsp;&nbsp;<input type='text' id= '"+editorPlaneName+"popup2alt' value='Downloading...' style='width:132px;border:1' ></input></span>";
   htmlInsertImage = htmlInsertImage + "<p>Align : <select id= '"+editorPlaneName+"popup2align'>";
   htmlInsertImage = htmlInsertImage + "<option value='default'>Default</option>";
   htmlInsertImage = htmlInsertImage + "<option value='left'>Left</option>";
   htmlInsertImage = htmlInsertImage + "<option value='right'>Right</option>"; 
   htmlInsertImage = htmlInsertImage + "</select>";
   fileId = editorPlaneName+"file";
   htmlInsertImage = htmlInsertImage + "<p><input type='file' id='"+fileId+"' name='files[]' onchange=\"handleFileSelect('"+fileId+"' , '"+editorPlaneName+"' , '"+editorPlaneName+"popup2');\"  multiple />";
   htmlInsertImage = htmlInsertImage + " </span>";
  
  return htmlInsertImage;
}


function openpopup(id){
      //Calculate Page width and height 
      var pageWidth = window.innerWidth; 
      var pageHeight = window.innerHeight; 
      if (typeof pageWidth != "number"){ 
      if (document.compatMode == "CSS1Compat"){ 
            pageWidth = document.documentElement.clientWidth; 
            pageHeight = document.documentElement.clientHeight; 
      } else { 
            pageWidth = document.body.clientWidth; 
            pageHeight = document.body.clientHeight; 
      } 
      } 
      //Make the background div tag visible...
      var divbg = document.getElementById('bg'); 
      divbg.style.visibility = "visible"; 
        
      var divobj = document.getElementById(id); 
      divobj.style.visibility = "visible"; 
      if (navigator.appName=="Microsoft Internet Explorer") 
      computedStyle = divobj.currentStyle; 
      else computedStyle = document.defaultView.getComputedStyle(divobj, null); 
      //Get Div width and height from StyleSheet 
      var divWidth = computedStyle.width.replace('px', ''); 
      var divHeight = computedStyle.height.replace('px', ''); 
      var divLeft = (pageWidth - divWidth) / 2; 
      var divTop = (pageHeight - divHeight) / 2; 
      //Set Left and top coordinates for the div tag 
      divobj.style.left = divLeft + "px"; 
      divobj.style.top = divTop + "px"; 
      //Put a Close button for closing the popped up Div tag 
      if(divobj.innerHTML.indexOf("closepopup('" + id +"')") < 0 ) 
      divobj.innerHTML = "<a href=\"#\" onclick=\"closepopup('" + id +"')\"><span class=\"close_button\">X</span></a>" + divobj.innerHTML; 
}
function closepopup(id){
      var divbg = document.getElementById('bg'); 
      divbg.style.visibility = "hidden"; 
      var divobj = document.getElementById(id); 
      divobj.style.visibility = "hidden"; 
}


function getElementsByAttributeName(docID,tagName, attributeName, attributeValue) {
var stuff = document.getElementsByTagName('iframe');
var imgs = stuff[0].contentWindow.document.getElementsByTagName('img')
var targetImg;
for (var i = 0; i < imgs.length; i++) {
	if(imgs[i].src.endsWith(attributeValue)){
        targetImg = imgs[i];
	break;
	}
}
return targetImg;
}


function handleFileSelect(fileToUploaderID ,editorPlaneName , editorPlaneNamePopupId){
   f = document.getElementById(fileToUploaderID).files[0];
   closepopup(editorPlaneNamePopupId);
    uploadImg(f,editorPlaneName , editorPlaneNamePopupId);
 }



function uploadImg(file ,editorPlaneName , editorPlaneNamePopupId ) {
   imgpath = "";
   var fd = new FormData();
   fd.append("image", file); 
   fd.append("key", "1fcec1bd67c15a82b44988216ecf021d"); 
	var xhr;
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xhr=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xhr=new ActiveXObject("Microsoft.XMLHTTP");
	  }

	   xhr.open("POST", "http://api.imgur.com/2/upload.json"); // Boooom!
	   xhr.onload = function() {
	   JSON.parse(xhr.responseText).upload.links.imgur_page;
	   imgpath = JSON.parse(xhr.responseText).upload.links.original;
	   var w = document.getElementById(editorPlaneNamePopupId+"width").value; 
	   var h = document.getElementById(editorPlaneNamePopupId+"height").value; 
	   var e = document.getElementById(editorPlaneNamePopupId+"align");
	   var ali = e.options[e.selectedIndex].value;
	   var altx =  document.getElementById(editorPlaneNamePopupId+"alt").value;  
	   applyChange(editorPlaneName ,'InsertImage',imgpath);
	   var target = getElementsByAttributeName('editorPlanelContainer','img', 'src', imgpath);
	   target.width = w;
	   target.height = h;
	   target.align = ali;
	   target.alt = altx;
      
   }
   xhr.send(fd);
   
}
