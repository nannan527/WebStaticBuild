/**
 * Created by Dongyinan on 2016/2/2.28
 */
(function browserLayer(){
    if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[^0-9]/ig,"") <= 80){
        window.location.href='../html/browser.html';
    };
})();
