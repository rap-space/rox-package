import Version from './version';
import { isWeex } from './env';

let ua = navigator.userAgent;
let match = ua.match(/AliApp\(([^\/]+)\/([\d\.]+)\)/i);

let os = {
  name: '',
  version: null,
  android: false,
  ios: false,
};

let rIOS = isWeex ?
  /ios\/([\w\.]+)*/i :
  /ip[honead]+(?:.*os\s([\w]+)*\slike\smac|;\sopera)/i;

let rAndroid = /android[\/\s-]?([\w\.]+)*/i;

// iPhone8,2(iOS/10.1.1) AliApp(QN/5.5.0) Weex/0.9.1 1242x2208
// Mozilla/5.0 (iPhone; CPU iPhone OS 8_1_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12B466 AliApp(QN/3.2.1)  QNIOS/201200@tbsellerworkbench_iphone_1.0.0
// Opera/9.80 (iPhone; Opera Mini/7.1.32694/27.1407; U; en) Presto/2.8.119 Version/11.10
// Mozilla/5.0 (Linux; U; Android 4.2.1; zh-cn; ZP980 Build/JOP40D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30 AliApp(QN/3.2) QNANDROID/700145@tbsellerworkbench_android_1.3.2

if (match = ua.match(rIOS)) {
  os.name = 'iOS';
  os.ios = true;
  if (match[1]) match[1] = match[1].replace(/_/g, '.');
} else if (match = ua.match(rAndroid)) {
  os.name = 'Android';
  os.android = true;
}
let isIOS = false;
let isAndroid = false;


export default {
  isIOS: isIOS,
  isAndroid: isAndroid,
  version: new Version(match ? match[2] : ''),
  // osVersion: new Version(match ? match[2] : ''),
  ua: navigator.userAgent
};
