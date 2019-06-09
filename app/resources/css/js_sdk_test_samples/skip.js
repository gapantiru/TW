var fso, ws, ts;
fso = new ActiveXObject('Scripting.FileSystemObject');
ws = WScript.CreateObject('WScript.Shell');

var ForWriting= 2;
ts = fso.OpenTextFile('current_time.txt', ForWriting, true);
ts.WriteLine(new Date().getTime());
ts.Close();

ws.Popup('Wrote to file!');

var ForReading= 1;
ts = fso.OpenTextFile('current_time.txt', ForReading, false);
var fileContents = ts.ReadLine();
ts.Close();

ws.Popup('The time is: ' + fileContents);

WScript.Quit();