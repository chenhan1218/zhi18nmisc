
//rdfInfo 資料格式，儲存 RDF 內容
//getInfo() 方法可取得 Description 元素
function rdfInfo(about,title,desc,format,lang)
{
  this.about = about;
  this.title = title;
  this.desc = desc;
  this.format = format;
  this.lang = lang;
  this.getInfo = getInfo;
}

//getInfo() 方法的細節
//doc 是某個 XML 文件
function getInfo(doc)
{
  var descElems = doc.getElementsByTagName("Description");
  var num = descElems.length;
  var ran = Math.random()*num*100;
  var ranNum = Math.floor(ran/100);
  var elem = descElems[ranNum];
  var NS = document.createNSResolver(doc.documentElement);
     this.about = elem.getAttribute("about");
     this.title = document.evaluate("descendant::dc:title/child::text()",elem,NS,0,null).iterateNext().nodeValue;
  this.desc = document.evaluate("descendant::dc:description/child::text()",elem,NS,0,null).iterateNext().nodeValue;
    this.format  = document.evaluate("descendant::dc:format/child::text()",elem,NS,0,null).iterateNext().nodeValue;
   this.lang = document.evaluate("descendant::dc:language/child::text()",elem,NS,0,null).iterateNext().nodeValue;
 return this;
}
