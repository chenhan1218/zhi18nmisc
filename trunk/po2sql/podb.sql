-- MySQL dump 9.11
--
-- Table structure for table `potb`
--

CREATE TABLE potb (
  project varchar(14) NOT NULL default '',
  fpath varchar(50) NOT NULL default '',
  msgid text NOT NULL,
  msgstr text NOT NULL,
  FULLTEXT KEY msgid (msgid)
) TYPE=MyISAM;

