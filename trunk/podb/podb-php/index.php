<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=big5"></head>
<body>

KDE PO File Search v.0.2:
<p>
Input a word you wanna know how other people translate it.
<p>
The Database is imported from KDE CVS on Dec 19, 2004.
<p>
<?
$lang = array("zh_TW", "zh_CN",
"af", "ar", "az", "be", "bg", "bn", "bo", "br", "bs", "ca", "cs", "cy", "da", "de", "el", "en_GB", "eo", "es", "et", "eu", "fa", "fi", "fo", "fr", "ga", "gl", "he", "hi", "hr", "hsb", "hu", "id", "is", "it", "ja", "ko", "ku", "lo", "lt", "lv", "mi", "mk", "mn", "ms", "mt", "nl", "nb", "nso", "nn", "oc", "pl", "pt", "pt_BR", "ro", "ru", "se", "sk", "sl", "sq", "sr", "ss", "sv", "ta", "tg", "th", "tr", "uk", "ven", "vi", "wa", "xh", "zu")
?>

Form: Use Mysql "like", 500 records at most:
<form action="gsearch.php">
Language: 
<?
foreach ($lang as $i => $value) {
	if ($i == 0) {
		echo '<input type="radio" name="lang" value="',  $lang[0], '" checked>' , $lang[0];
	} else {

		echo '<input type="radio" name="lang" value="',  $lang[$i], '">' , $lang[$i];
	}
}
?>
<p>
Word to lookup: <input name=key><br>
<input type=submit>
</form>
<p>

Form: Use Mysql Full Text Search:
<form action="search.php">
Language: 
<?
foreach ($lang as $i => $value) {
	if ($i == 0) {
		echo '<input type="radio" name="lang" value="',  $lang[0], '" checked>' , $lang[0];
	} else {

		echo '<input type="radio" name="lang" value="',  $lang[$i], '">' , $lang[$i];
	}
}
?>
<p>
Word to lookup: <input name=key><br>
<input type=submit>
</form>
<p>

Author: Y.C Cheng / ycheng @ slat . org<p>

請愛用 <a href="http://words.2share.net/">翻譯字辭大全</a><p>
作者: 鄭原真 ycheng @ slat . org<p>
最後修改: 2004 年 12 月 11 日
</body>
</html>
