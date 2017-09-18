// ==UserScript==
// @name         Class List Generator
// @namespace    https://github.com/Acanguven/Active-Classnames
// @version      1.1
// @description  Downloads all classnames on dom
// @author       ACG
// @match        *
// @grant        none
// ==/UserScript==

(function() {
    var classList = [];
    var outputList = [];
    var btn = document.createElement('button');
    btn.innerText = 'ClassList';
    btn.style.position = 'fixed';
    btn.style.top = '0px';
    btn.style.left = '0px';
    btn.style.zIndex = '99999999999999';
    btn.onclick = generateClassList;
    document.body.appendChild(btn);
    
	init();
     
    function init(){
        appendBlobSaver();
    }
 
    function appendBlobSaver(){
        var script = document.createElement('script');
        script.src = location.protocol == 'https:' ? "https://cdn.rawgit.com/eligrey/FileSaver.js/master/FileSaver.js" : "http://cdn.rawgit.com/eligrey/FileSaver.js/master/FileSaver.js"
		script.onload = function(){
			document.body.appendChild(btn);
			setInterval(fetchClassList, 1000);
		}
        document.getElementsByTagName('head')[0].appendChild(script);   
    }
        
    function generateClassList(){
        download((location.hash+'-classList.txt').replace(/\//g,'').replace(/#/g,'').replace(/\!/g,''), outputList.join('\r\n'));
    }
    
    function fetchClassList(){
        var all = document.getElementsByTagName("*");
        for (var i=0, max=all.length; i < max; i++) {
            if(all[i].className.length > 0){
                var elementClassList = all[i].className.split(' ');
                for(var z = 0, lenz = elementClassList.length; z < lenz; z++){
                    if(classList.indexOf(elementClassList[z]) == -1){
                        if(elementClassList[z].length > 0){
                            classList.push(elementClassList[z]);
                            var data = getStyle(elementClassList[z]);
                            if(data && data.length > 0){
                                outputList.push(data);
                            }
                        }
                    }
                }
            }
        }
    }
    
    function getStyle(className) {
        for(var z = 0, lenz = document.styleSheets.length; z < lenz; z++){
            var classes = document.styleSheets[z].rules || document.styleSheets[z].cssRules;
			if(classes){
				for (var x = 0, lenx = classes.length; x < lenx; x++) {
					if (classes[x].selectorText && classes[x].selectorText.indexOf(className) > -1) {
						var classDetail = classes[x].cssText ? classes[x].cssText : classes[x].style.cssText;
						return classDetail;
					}
				}
			}
        }
        return null;
    }

    function download(filename, text) {
        var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
    }
})();