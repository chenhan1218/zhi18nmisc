<!-- JavaScript begin here...
//
// Copyright by Chih-Wei Huang <cwhuang@linux.org.tw>
//
//         August 31, 1998
//
//         Revisited: January 28, 1998
//     Last Modified: December 15, 1999
//
// All right reserved
//
// This script can only be redistributed as a part of CLDP documents
// Any other modification and derived work must be granted by the author
//

path="";
filename="";
bdclr="#000080";
bgclr="#FFEEEE";
bg2clr="#FFFFC0";
idclr="#EEFFEE";
noidx=0;

depth=0;
i_menu=0;
i_item=0;


if (parseInt(getCookie("CLDP_MENU")) == 2)
	noidx=2;
else if (parseInt(getCookie("CLDP_NOIDX")) == 1)
	noidx=1;

var file, item, subfile, subitem;

// Main Menu
function DefineMenu()
{

file=new Array(11);
item=new Array(11);
subfile=new Array(11);
subitem=new Array(11);


subfile[0]=new Array(0), file[0]="", item[0]="首 页";
subfile[1]=new Array(0), file[1]="news.html", item[1]="最新消息";
subfile[2]=new Array(5), file[2]="summary.html", item[2]="中译文件";
subfile[3]=new Array(0), file[3]="search.html", item[3]="搜寻引擎";
subfile[4]=new Array(0), file[4]="doc/", item[4]="其它中文文件";
subfile[5]=new Array(4), file[5]="about.html", item[5]="关於本计划";
subfile[6]=new Array(0), file[6]="glossary.html", item[6]="翻译小辞典";
subfile[7]=new Array(2), file[7]="mailing.html", item[7]="通信论坛";
subfile[8]=new Array(0), file[8]="HOWTO-INDEX-3.html", item[8]="英文 HOWTOs";
subfile[9]=new Array(0), file[9]="links.html", item[9]="网站连结";
subfile[10]=new Array(0), file[10]="mirrors.html", item[10]="映射站台";

// Sub menus 2
subitem[2]=new Array(5)
subfile[2][0]=true;
subfile[2][1]="HOWTOs.html", subitem[2][1]="HOWTOs";
subfile[2][2]="mini/", subitem[2][2]="mini HOWTOs";
subfile[2][3]="assigned.html", subitem[2][3]="翻译中文件";
subfile[2][4]="unassigned.html", subitem[2][4]="未翻译文件";

// Sub menus 5
subitem[5]=new Array(5)
subfile[5][0]=false;
subfile[5][1]="manifesto.html", subitem[5][1]="声 明";
subfile[5][2]="join.html", subitem[5][2]="参与计划";
subfile[5][3]="faq.html", subitem[5][3]="FAQ";

// Sub menus 7
subitem[7]=new Array(2)
subfile[7][0]=false;
subfile[7][1]="http://www.linux.org.tw/mail-archie/ldp-trans/", subitem[7][1]="信件收集";
//subfile[7][1]="http://cle.linux.org.tw/~mailer/linux-ldp/",  subitem[7][1]="信件收集";

// Sub menus 8
subitem[8]=new Array(3)
subfile[8][0]=false;
subfile[8][1]="HOWTO-INDEX-3.html#ss3.1", subitem[8][1]="HOWTOs";
subfile[8][2]="HOWTO-INDEX-3.html#ss3.2", subitem[8][2]="mini HOWTOs";

}

function BeginPage(_depth, _menu, _item)
{
	if (noidx == 2)
		return;

	depth=_depth, i_menu=_menu, i_item=_item;
	title=CheckHash();

    DrawHead(title);
    with (document) {
		write("<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0 WIDTH=100%><TR>");
		if (noidx == 0) {
			DrawLine();
			DrawCurve(idclr, "TOP", "LEFT", "img/bcurve1.gif");
			DrawCurve(idclr, "TOP", "RIGHT", "img/bcurve2.gif");
		}
		DrawLine();
		DrawCurve(bgclr, "TOP", "LEFT", "img/bcurve1.gif");
		write("<TD BGCOLOR="+bgclr+"><FONT SIZE=-3><A HREF=#bottom> BOTTOM</A></FONT></TD>");
		DrawCurve(bgclr, "TOP", "RIGHT", "img/bcurve2.gif");
		DrawLine();
		writeln("</TR><TR>");
		if (noidx == 0)
			DrawMenu();
		writeln("<TD BGCOLOR="+bgclr+"><BR></TD><TD BGCOLOR="+bgclr+" VALIGN=TOP>");
	}
}

function EndPage()
{
	if (noidx == 2)
		return;

    with (document) {
        write("<A NAME=bottom></TD><TD BGCOLOR="+bgclr+"><BR></TD></TR><TR>");
		if (noidx == 0) {
	        DrawCurve(idclr, "BOTTOM", "LEFT", "img/bcurve3.gif");
	        DrawCurve(idclr, "BOTTOM", "RIGHT", "img/bcurve4.gif");
		}
        DrawCurve(bgclr, "BOTTOM", "LEFT", "img/bcurve3.gif");
		write("<TD BGCOLOR="+bgclr+"><FONT SIZE=-3><A HREF=#top> TOP</A></FONT></TD>");
        DrawCurve(bgclr, "BOTTOM", "RIGHT", "img/bcurve4.gif");
	    write("</TR><TR><TD BGCOLOR="+bdclr+" COLSPAN="+((noidx==0)?4:1)+"><BR></TD>");
		write("<TD COLSPAN=4 BGCOLOR="+bdclr+"><TABLE><TR><TD>");
		if (noidx != 0) {
            write("</TD><TH BGCOLOR="+idclr+"> ");
            DrawLink("显示索引");
            write(" </TH><TD>");
        }
		write("  </B><FONT COLOR=#EEDDCC SIZE=-1>&copy; 修改日期: "+lastModified);
		writeln("</FONT></TD></TR></TABLE></TD></TR></TABLE>");
	}
}

function ToggleMenu()
{
	if (path == "")
	    setCookie("CLDP_NOIDX", (noidx != 1 ? "1" : "0"), null);
    location.replace((path == "") ? location.pathname : path+"template.html#CLDP="+filename);
}

function CheckHash()
{
	pathname=location.pathname;
	li=pathname.lastIndexOf("/");
	for (d=depth; d>0; d--) {
		path+="../";
		li=pathname.lastIndexOf("/", li-1);
	}
	filename=pathname.substring(li+1, pathname.length);
	hash=location.hash;
	if (hash.indexOf("CLDP=") == 1) {
	    setCookie("CLDP_NOIDX", (noidx != 1 ? "1" : "0"), null);
		setTimeout('location.replace(hash.substring(6, hash.length))', 700);
	}
	if (filename == "HOWTO-INDEX-3.html")
		i_menu=8, i_item=0;

	return (pathname.indexOf("/HOWTO/") != -1) ? "Linux HOWTOs Online" : "Linux 中文文件计划";
}

function DrawHead(header)
{
    with (document) {
        write("<A NAME=top><TABLE BORDER=0 CELLPADDING=0 CELLSPACING=0 WIDTH=100%>");
        write("<TR><TH BGCOLOR="+bdclr+" VALIGN=BOTTOM>");
//      write("<IMG SRC=\"\" BORDER=0 WIDTH=600 HEIGHT=50 VSPACE=0 HSPACE=0>");
        write("<H1><FONT COLOR=YELLOW><I>CLDP</I>  --  "+header+"</FONT></H1>");
        write("</TH></TR></TABLE>");
    }
}

function DrawMenu()
{
	DefineMenu();
    with (document) {
        writeln("<TH BGCOLOR="+idclr+" VALIGN=TOP COLSPAN=2><TABLE BORDER=0 CELLPADDING=0 CELLSPACING=5>");
		for (i=0; i<file.length; i++) { 
			DrawItem(i, 0);
			if (subfile[i].length > 0 && (i_menu==i || subfile[i][0]==true)) {
				for (j=1; j<subfile[i].length; j++)
					if (i!=2 || i_menu==2 || j<=2)
						DrawItem(i, j);
			}
		}
        write("<TR><TD COLSPAN=3 HEIGHT=20></TD></TR>");
        write("<TR><TD><IMG SRC="+path+"img/green-dot.gif></TD><TD NOWRAP COLSPAN=2>");

        big5=(pathname.indexOf("gb") == -1);
        bgp=(big5 ? "" : "../");
        if (i_menu == 2 && i_item == 5) 
            DrawToggle("英文版", bgp+"HOWTO/", filename);
        else if (i_menu == 2 && i_item == 6) 
            DrawToggle("英文版", bgp+"../HOWTO/", filename);
        else if (i_menu == 8 && i_item == 1) 
            DrawToggle("中文版", "../", filename.substring(6, filename.length));
        else if (i_menu == 8 && i_item == 2) 
            DrawToggle("中文版", "../../", filename.substring(6, filename.length));
      
        DrawLink("关闭索引");
        if (i_menu == 0 && i_item == 0) {
			enc=(big5 ? "GB 码".link("gb/") : "BIG5 码".link("../")).bold();
	        write("</TD></TR><TR><TD COLSPAN=3 HEIGHT=10></TD></TR>");
	        write("<TR><TD><IMG SRC=img/green-dot.gif></TD><TD NOWRAP COLSPAN=2>"+enc);
		}
        writeln("</TD></TR></TABLE></TH>");
    }
}

function DrawToggle(msg, pp, ff)
{
     with (document) {
         link=(msg.link(pp+ff)).bold();
         write(link+"</TD></TR><TR><TD COLSPAN=3 HEIGHT=20></TD></TR>");
         write("<TR><TD><IMG SRC="+path+"img/green-dot.gif></TD><TD NOWRAP COLSPAN=2>");
     }
}

function DrawItem(_m, _i)
{
	link="<TR>";
	if (_i == 0)
		msg=item[_m], url=file[_m], col=2;
	else 
		msg=subitem[_m][_i], url=subfile[_m][_i], col=1, link+="<TD></TD>";
	link+="<TD><IMG SRC="+path+"img/green-dot.gif></TD><TD NOWRAP COLSPAN="+col;
	link+=((_m == i_menu && _i == i_item) 
		? (" BGCOLOR=RED><B>"+msg.fontcolor('yellow')) 
                : ("><B>"+msg.link(((url.indexOf("http://")==-1) ? path : "") +url)));
	link+="</B></TD></TR><TR><TD COLSPAN=3></TD></TR>";
	document.writeln(link);
}

function DrawLine()
{
    document.write("<TD BGCOLOR="+bdclr+" ROWSPAN=3><IMG SRC="+path+"img/dot.gif WIDTH=5 HEIGHT=5 HSPACE=0 VSPACE=0></TD>");
}

function DrawCurve(cr, an, lr, img)
{
    document.write("<TD BGCOLOR="+cr+" VALIGN="+an+" ALIGN="+lr+">");
	document.write("<IMG SRC="+path+img+" WIDTH=15 HEIGHT=15 HSPACE=0 VSPACE=0></TD>");
//	document.write("<FONT SIZE=-3>"+img.fontcolor(bdclr)+"</FONT></TD>");
}

function DrawLink(msg)
{
    document.write("<A HREF=\"javascript:ToggleMenu()\" onMouseOver=\"window.status='"+location+"';return true;\" onMouseOut=\"window.status='';return true;\"><B>"+msg+"</B></A>");
}

// Cookies utilities
function setCookie(name, value, expire)
{
    document.cookie = name + "=" + escape(value)
        + ((expire == null) ? "" : ("; expires=" + expire.toGMTString()));
}

function getCookie(Name)
{
    search = Name + "=";
    if (document.cookie.length > 0) { // if there are any cookies
            offset = document.cookie.indexOf(search);
        if (offset != -1) { // if cookie exists
            offset += search.length;
            // set index of beginning of value
            end = document.cookie.indexOf(";", offset);
            // set index of end of cookie value
            if (end == -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        }
    }
}    

// -->
