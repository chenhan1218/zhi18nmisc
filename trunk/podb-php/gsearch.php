<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
<body>
<a href="index.php">Go Back</a><p>
<?
include "config.php";

echo "<p>";
$cmd = "SELECT * FROM potb WHERE msgstr != \"\" and msgid like \"%" . $_GET['key'] . "%\" limit 500";
echo $cmd;

mysql_select_db("podb", $sql_server);
$ret = mysql_query($cmd, $sql_server);
?>
<table border=1 width="600">
<tr><td>計畫</td><td>檔案</td><td>msgid</td><td>msgstr</td></tr>
<?
while ($row = mysql_fetch_array($ret, MYSQL_NUM)) {
?>
<tr>
	<td><? echo $row[0] ; ?></td>
	<td><? echo $row[1] ; ?></td>
	<td><? echo htmlspecialchars($row[2]) ; ?></td>
	<td><? echo htmlspecialchars($row[3]) ; ?></td>
</tr>
<?  } ?>
</table>
</body>
</html>
