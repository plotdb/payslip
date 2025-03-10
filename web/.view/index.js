 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_attrs(t,r){var a="";for(var s in t)if(pug_has_own_property.call(t,s)){var u=t[s];if("class"===s){u=pug_classes(u),a=pug_attr(s,u,!1,r)+a;continue}"style"===s&&(u=pug_style(u)),a+=pug_attr(s,u,!1,r)}return a}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_merge(e,r){if(1===arguments.length){for(var t=e[0],g=1;g<e.length;g++)t=pug_merge(t,e[g]);return t}for(var l in r)if("class"===l){var n=e[l]||[];e[l]=(Array.isArray(n)?n:[n]).concat(r[l]||[])}else if("style"===l){var n=pug_style(e[l]);n=n&&";"!==n[n.length-1]?n+";":n;var a=pug_style(r[l]);a=a&&";"!==a[a.length-1]?a+";":a,e[l]=n+a}else e[l]=r[l];return e}
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;
    var locals_for_with = (locals || {});
    
    (function (Array, JSON, b64img, blockLoader, c, cssLoader, decache, defer, escape, hashfile, libLoader, md5, scriptLoader, url, version) {
      pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
if(!libLoader) {
  libLoader = {
    js: {url: {}},
    css: {url: {}},
    root: function(r) { libLoader._r = r; },
    _r: "/assets/lib",
    _v: "",
    version: function(v) { libLoader._v = (v ? "?v=" + v : ""); }
  }
  if(version) { libLoader.version(version); }
}

pug_mixins["script"] = pug_interp = function(os,cfg){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var str = '', urls = [];
if(!Array.isArray(os)) { os = [os]; }
// iterate os
;(function(){
  var $$obj = os;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var o = $$obj[pug_index0];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.js"); }
if (!libLoader.js.url[url]) {
libLoader.js.url[url] = true;
defer = (typeof(c.defer) == "undefined" ? true : !!c.defer);
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + libLoader._v, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var o = $$obj[pug_index0];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.js"); }
if (!libLoader.js.url[url]) {
libLoader.js.url[url] = true;
defer = (typeof(c.defer) == "undefined" ? true : !!c.defer);
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + libLoader._v, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
    }
  }
}).call(this);

if (cfg && cfg.pack) {
var name = md5(str);
//var filename = "/js/pack/" + name + "." + (typeof(cfg.min) == "undefined" || cfg.min ? "min" : "") + ".js";
var fn = "/assets/bundle/" + name + "." + (typeof(cfg.min) == "undefined" || cfg.min ? "min" : "") + ".js";
hashfile({type: "js", name: name, files: urls, src: locals.filename});
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", fn + libLoader._v, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
};
pug_mixins["css"] = pug_interp = function(os,cfg){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var str = '', urls = [];
if(!Array.isArray(os)) { os = [os]; }
// iterate os
;(function(){
  var $$obj = os;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var o = $$obj[pug_index1];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.css"); }
if (!libLoader.css.url[url]) {
libLoader.css.url[url] = true;
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url, true, true)) + "\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + libLoader._v, true, true)) + "\u003E";
}
}
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var o = $$obj[pug_index1];
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.css"); }
if (!libLoader.css.url[url]) {
libLoader.css.url[url] = true;
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url, true, true)) + "\u003E";
}
else
if (cfg && cfg.pack) {
str = str + ';' + url;
urls.push(url);
}
else {
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + libLoader._v, true, true)) + "\u003E";
}
}
    }
  }
}).call(this);

if (cfg && cfg.pack) {
var name = md5(str);
//var filename = "/css/pack/" + name + "." + (typeof(cfg.min) == "undefined" || cfg.min ? "min" : "") + ".css";
var fn = "/assets/bundle/" + name + "." + (typeof(cfg.min) == "undefined" || cfg.min ? "min" : "") + ".css";
hashfile({type: "css", name: name, files: urls, src: locals.filename});
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", fn + libLoader._v, true, true)) + "\u003E";
}
};
pug_html = pug_html + "\u003Chtml\u003E";
if (!(libLoader || scriptLoader)) {
if(!scriptLoader) { scriptLoader = {url: {}, config: {}}; }
if(!decache) { decache = (version? "?v=" + version : ""); }
pug_mixins["script"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
scriptLoader.config = (config ? config : {});
if (!scriptLoader.url[url]) {
scriptLoader.url[url] = true;
if (/^https?:\/\/./.exec(url)) {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else {
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + decache, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
};
if(!cssLoader) { cssLoader = {url: {}}; }
pug_mixins["css"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
cssLoader.config = (config ? config : {});
if (!cssLoader.url[url]) {
cssLoader.url[url] = true;
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + decache, true, true)) + "\u003E";
}
};
if(!blockLoader) { blockLoader = {name: {}, config: {}}; }







}
var escjson = function(obj) { return 'JSON.parse(unescape("' + escape(JSON.stringify(obj)) + '"))'; };
var eschtml = (function() { var MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&#34;', "'": '&#39;' }; var repl = function(c) { return MAP[c]; }; return function(s) { return s.replace(/[&<>'"]/g, repl); }; })();
function ellipsis(str, len) {
  return ((str || '').substring(0, len || 200) + (((str || '').length > (len || 200)) ? '...' : ''));
}

pug_mixins["nbr"] = pug_interp = function(count){
var block = (this && this.block), attributes = (this && this.attributes) || {};
for (var i = 0; i < count; i++)
{
pug_html = pug_html + "\u003Cbr\u003E";
}
};






var b64img = {};
b64img.px1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAIA"
var loremtext = {
  zh: "料何緊許團人受間口語日是藝一選去，得系目、再驗現表爸示片球法中轉國想我樹我，色生早都沒方上情精一廣發！能生運想毒一生人一身德接地，說張在未安人、否臺重壓車亞是我！終力邊技的大因全見起？切問去火極性現中府會行多他千時，來管表前理不開走於展長因，現多上我，工行他眼。總務離子方區面人話同下，這國當非視後得父能民觀基作影輕印度民雖主他是一，星月死較以太就而開後現：國這作有，他你地象的則，引管戰照十都是與行求證來亞電上地言裡先保。大去形上樹。計太風何不先歡的送但假河線己綠？計像因在……初人快政爭連合多考超的得麼此是間不跟代光離制不主政重造的想高據的意臺月飛可成可有時情乎為灣臺我養家小，叫轉於可！錢因其他節，物如盡男府我西上事是似個過孩而過要海？更神施一關王野久沒玩動一趣庭顧倒足要集我民雲能信爸合以物頭容戰度系士我多學一、區作一，過業手：大不結獨星科表小黨上千法值之兒聲價女去大著把己。",
  en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};













pug_html = pug_html + "\u003Chead\u003E\u003Cmeta charset=\"utf-8\"\u003E";
pug_mixins["css"]([
      {name: "bootstrap", version: "main", path: "dist/css/bootstrap.min.css"},
      {name: "@loadingio/bootstrap.ext"},
      {url: "css/index.css"}
    ]);
pug_html = pug_html + "\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Cdiv class=\"w-1024 rwd m-auto\"\u003E\u003Cdiv class=\"text-muted my-4 d-flex align-items-center\"\u003E\u003Cspan\u003E注意：公式 \u002F 級距表版本為\u003C\u002Fspan\u003E\u003Cselect class=\"form-control form-control-sm mx-2\" data-var=\"year\" style=\"width:5em\"\u003E\u003Coption value=\"114\"\u003E114\u003C\u002Foption\u003E\u003Coption value=\"113\"\u003E113\u003C\u002Foption\u003E\u003Coption value=\"112\"\u003E112\u003C\u002Foption\u003E\u003Coption value=\"111\"\u003E111\u003C\u002Foption\u003E\u003Coption value=\"110\"\u003E110\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003Cspan\u003E年版\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-sm-4\"\u003E\u003Cdiv class=\"card info mb-2\"\u003E\u003Cdiv class=\"card-body\"\u003E\u003Ch3\u003E員工資訊\u003C\u002Fh3\u003E\u003Chr\u003E\u003Cdiv class=\"form\"\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E薪資 \u003Csmall class=\"text-secondary\"\u003E \u002F 跟員工說會給的數字\u003C\u002Fsmall\u003E\u003C\u002Flabel\u003E\u003Cinput class=\"form-control\" placeholder=\"2022年起最低薪資為 25,250 NTD\" data-var=\"salary\" value=\"25250\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E眷口數 \u003Csmall class=\"text-secondary\"\u003E \u002F 除自己外，多少人跟自己一起報健保?\u003C\u002Fsmall\u003E\u003C\u002Flabel\u003E\u003Cselect class=\"form-control\" data-var=\"family-count\"\u003E\u003Coption value=\"0\"\u003E僅自己\u003C\u002Foption\u003E\u003Coption value=\"1\"\u003E自己 + 1 眷口\u003C\u002Foption\u003E\u003Coption value=\"2\"\u003E自己 + 2 眷口\u003C\u002Foption\u003E\u003Coption value=\"3\"\u003E自己 + 3 眷口\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-check\"\u003E\u003Cinput class=\"form-check-input\" type=\"checkbox\" data-var=\"is-boss\"\u003E\u003Clabel class=\"form-check-label\"\u003E是雇主\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Chr\u003E\u003Cdiv class=\"form\"\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E實領 \u003Csmall class=\"text-secondary\"\u003E \u002F 應發給員工的金額 = 薪資 - 個人負擔\u003C\u002Fsmall\u003E\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"pay\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"card\"\u003E\u003Cdiv class=\"card-body\"\u003E\u003Ch3\u003E公司資訊\u003C\u002Fh3\u003E\u003Chr\u003E\u003Cdiv class=\"form\"\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E職災費率 \u003Csmall class=\"text-muted\"\u003E \u002F 各行業不同, 可至勞保投保系統查\u003C\u002Fsmall\u003E\u003C\u002Flabel\u003E\u003Cinput class=\"form-control\" data-var=\"disaster-rate\" value=\"0.17\"\u003E\u003C\u002Fdiv\u003E\u003Chr\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E帳單數字 \u003Csmall class=\"text-muted\"\u003E \u002F 勞保、工資墊償、勞退、健保等\u003C\u002Fsmall\u003E\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"bill-total\" value=\"\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Chr\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm-4\"\u003E\u003Cdiv class=\"card info\"\u003E\u003Cdiv class=\"card-body\"\u003E\u003Ch3\u003E勞保\u002F勞退\u003C\u002Fh3\u003E\u003Chr\u003E\u003Cdiv class=\"form\"\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E個人負擔\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"bli-idv\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E單位負擔\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"bli-com\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Chr\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E工資墊償基金 \u003Cspan class=\"text-muted text-sm\"\u003E\u002F 單位全額負擔\u003C\u002Fspan\u003E\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"bli-salary\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E合計\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"bli\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Chr\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E勞退 ( 單位提撥 )\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"bli-ret\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-sm-4\"\u003E\u003Cdiv class=\"card info\"\u003E\u003Cdiv class=\"card-body\"\u003E\u003Cdiv class=\"d-flex justify-content-between align-items-center mb-3\"\u003E\u003Ch3 class=\"mb-0\"\u003E健保\u003C\u002Fh3\u003E\u003Cdiv class=\"text-sm d-none\" ld=\"nhi-boss-salary-mod\"\u003E雇主薪資以 \u003Cspan ld=\"nhi-salary\"\u003E\u003C\u002Fspan\u003E 計\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Chr\u003E\u003Cdiv class=\"form\"\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E個人負擔\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"nhi-idv\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E單位負擔\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"nhi-com\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Chr\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E合計\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"nhi\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E\u003Chr\u003E\u003Cdiv class=\"w-1024 rwd m-auto\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-sm-8\"\u003E\u003Cdiv class=\"card info\"\u003E\u003Cdiv class=\"card-body\"\u003E\u003Ch3\u003E獎金\u003C\u002Fh3\u003E\u003Cul class=\"text-muted pl-3\"\u003E\u003Cli\u003E所得稅: 稅額 2000 以上，代扣 5% 。(無條件捨去)\u003C\u002Fli\u003E\u003Cli\u003E二代健保(獎金): 全年超出四倍薪資部份, 2.11% (四捨五入, 從獎金中扣除)\u003C\u002Fli\u003E\u003Cli\u003E二代健保(薪資): 公司另繳總發薪 - 投保薪(不計雇主) 的 2.11%. (四捨五入)\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003Chr\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E獎金金額\u003C\u002Flabel\u003E\u003Cinput class=\"form-control\" data-var=\"prize\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E受獎人之健保投保薪資 \u003Cspan class=\"text-muted text-sm\"\u003E\u002F 注意, 獎金累加超過四倍此值後都需計入二代健保\u003C\u002Fspan\u003E\u003C\u002Flabel\u003E\u003Cinput class=\"form-control\" data-var=\"prize-minus\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E代扣所得稅\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"prize-pretax\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Cdiv class=\"d-flex justify-content-between\"\u003E\u003Clabel\u003E二代健保(獎金部份) \u003Cspan class=\"text-muted text-sm\"\u003E\u002F 個人負擔\u003C\u002Fspan\u003E\u003C\u002Flabel\u003E\u003Cdiv class=\"form-check align-items-center mb-2\"\u003E\u003Clabel class=\"form-check-label text-sm\"\u003E\u003Cinput class=\"form-check-input clickable\" type=\"checkbox\" data-var=\"bonus-4timed\" style=\"margin-top:.25em\"\u003E\u003Cdiv class=\"clickable no-select\"\u003E先前已有獎金超過投保金額四倍，不需再次扣除\u003C\u002Fdiv\u003E\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"prize-nhi1\""+pug_attr("disabled", true, true, true)) + "\u003E\u003Cspan class=\"text-danger text-sm\"\u003E* 負責人亦同雇員，應扣除超過投保金額四倍部份\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E二代健保(薪資部份) \u003Cspan class=\"text-muted text-sm\"\u003E\u002F 公司負擔\u003C\u002Fspan\u003E\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"prize-nhi2\""+pug_attr("disabled", true, true, true)) + "\u003E\u003Cspan class=\"text-danger text-sm\"\u003E* 實際金額尚需計入其它如雇主薪資部份\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E實領獎金\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"prize-real\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"form-group\"\u003E\u003Clabel\u003E公司實際花費\u003C\u002Flabel\u003E\u003Cinput" + (" class=\"form-control\""+" data-var=\"prize-spend\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
pug_mixins["nbr"](3);
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
pug_mixins["script"]([
    {name: "papaparse", version: "main", path: "papaparse.min.js"},
    {name: "@loadingio/ldquery"},
    {url: "js/index.js"}
  ]);
pug_html = pug_html + "\u003C\u002Fhtml\u003E";
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "b64img" in locals_for_with ?
        locals_for_with.b64img :
        typeof b64img !== 'undefined' ? b64img : undefined, "blockLoader" in locals_for_with ?
        locals_for_with.blockLoader :
        typeof blockLoader !== 'undefined' ? blockLoader : undefined, "c" in locals_for_with ?
        locals_for_with.c :
        typeof c !== 'undefined' ? c : undefined, "cssLoader" in locals_for_with ?
        locals_for_with.cssLoader :
        typeof cssLoader !== 'undefined' ? cssLoader : undefined, "decache" in locals_for_with ?
        locals_for_with.decache :
        typeof decache !== 'undefined' ? decache : undefined, "defer" in locals_for_with ?
        locals_for_with.defer :
        typeof defer !== 'undefined' ? defer : undefined, "escape" in locals_for_with ?
        locals_for_with.escape :
        typeof escape !== 'undefined' ? escape : undefined, "hashfile" in locals_for_with ?
        locals_for_with.hashfile :
        typeof hashfile !== 'undefined' ? hashfile : undefined, "libLoader" in locals_for_with ?
        locals_for_with.libLoader :
        typeof libLoader !== 'undefined' ? libLoader : undefined, "md5" in locals_for_with ?
        locals_for_with.md5 :
        typeof md5 !== 'undefined' ? md5 : undefined, "scriptLoader" in locals_for_with ?
        locals_for_with.scriptLoader :
        typeof scriptLoader !== 'undefined' ? scriptLoader : undefined, "url" in locals_for_with ?
        locals_for_with.url :
        typeof url !== 'undefined' ? url : undefined, "version" in locals_for_with ?
        locals_for_with.version :
        typeof version !== 'undefined' ? version : undefined));
    ;;return pug_html;}; module.exports = template; })() 