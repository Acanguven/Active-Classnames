(function() {
    var classList = [];
    var btn = document.createElement('button');
    btn.innerText = 'ClassList';
    btn.style.position = 'fixed';
    btn.style.top = '0px';
    btn.style.left = '0px';
    btn.style.zIndex = '99999999999999';
    btn.onclick = generateClassList;
    
    init();
    
    function init(){
        appendBlobSaver();
        document.body.appendChild(btn);
        setInterval(fetchClassList, 1000);
    }

    function appendBlobSaver(){
        var script = document.createElement('script');
        script.src = "https://raw.githubusercontent.com/eligrey/FileSaver.js/master/FileSaver.js";
        document.getElementsByTagName('head')[0].appendChild(script);   
    }
        
    function generateClassList(){
        download((location.hash+'-classList.txt').replace(/\//g,'').replace(/#/g,'').replace(/\!/g,''), classList.join('\r\n'));
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
                        }
                    }
                }
            }
        }
    }

    function download(filename, text) {
        var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
    }
})();