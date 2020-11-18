/* Directus v6.3.8 52d1c56dba708ecc999cd9bb93a9c44fee7bc705 */

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table comments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` int(11) NOT NULL DEFAULT '2',
  `content` text,
  `request_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table directus_columns
# ------------------------------------------------------------

DROP TABLE IF EXISTS `directus_columns`;

CREATE TABLE `directus_columns` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `data_type` varchar(64) DEFAULT NULL,
  `ui` varchar(64) DEFAULT NULL,
  `relationship_type` varchar(20) DEFAULT NULL,
  `related_table` varchar(64) DEFAULT NULL,
  `junction_table` varchar(64) DEFAULT NULL,
  `junction_key_left` varchar(64) DEFAULT NULL,
  `junction_key_right` varchar(64) DEFAULT NULL,
  `hidden_input` tinyint(1) NOT NULL DEFAULT '0',
  `hidden_list` tinyint(1) NOT NULL DEFAULT '0',
  `required` tinyint(1) NOT NULL DEFAULT '0',
  `sort` int(11) DEFAULT NULL,
  `comment` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `table-column` (`table_name`,`column_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `directus_columns` WRITE;
/*!40000 ALTER TABLE `directus_columns` DISABLE KEYS */;

INSERT INTO `directus_columns` (`id`, `table_name`, `column_name`, `data_type`, `ui`, `relationship_type`, `related_table`, `junction_table`, `junction_key_left`, `junction_key_right`, `hidden_input`, `hidden_list`, `required`, `sort`, `comment`)
VALUES
	(1,'directus_users','group',NULL,'many_to_one','MANYTOONE','directus_groups',NULL,NULL,'group_id',0,0,0,NULL,''),
	(2,'directus_users','avatar_file_id','INT','single_file','MANYTOONE','directus_files',NULL,NULL,'avatar_file_id',0,0,0,NULL,''),
	(3,'gh_users','username','VARCHAR','textinput',NULL,NULL,NULL,NULL,NULL,0,0,0,9999,''),
	(4,'gh_users','id',NULL,'numeric',NULL,NULL,NULL,NULL,NULL,0,0,1,1,''),
	(5,'gh_users','active',NULL,'numeric',NULL,NULL,NULL,NULL,NULL,0,0,0,2,''),
	(6,'requests','title','VARCHAR','textinput',NULL,NULL,NULL,NULL,NULL,0,0,0,3,''),
	(7,'requests','votes_offset','INT','numeric',NULL,NULL,NULL,NULL,NULL,0,0,0,4,''),
	(8,'requests','id',NULL,'numeric',NULL,NULL,NULL,NULL,NULL,0,0,1,0,''),
	(9,'requests','active',NULL,'numeric',NULL,NULL,NULL,NULL,NULL,0,0,0,1,''),
	(10,'votes','id',NULL,'numeric',NULL,NULL,NULL,NULL,NULL,0,0,1,1,''),
	(11,'votes','active',NULL,'numeric',NULL,NULL,NULL,NULL,NULL,0,0,0,2,''),
	(14,'votes','request_id','INT','numeric',NULL,NULL,NULL,NULL,NULL,0,0,0,9999,''),
	(16,'comments','content','TEXT','markdown',NULL,NULL,NULL,NULL,NULL,0,0,0,9999,''),
	(17,'comments','id',NULL,'numeric',NULL,NULL,NULL,NULL,NULL,0,0,1,1,''),
	(18,'comments','active',NULL,'numeric',NULL,NULL,NULL,NULL,NULL,0,0,0,2,''),
	(20,'comments','request_id',NULL,'numeric',NULL,NULL,NULL,NULL,NULL,0,0,0,9999,''),
	(21,'requests','comments','ALIAS','one_to_many','ONETOMANY','comments',NULL,NULL,'request_id',0,0,0,7,''),
	(22,'gh_users','voted_on','ALIAS','many_to_many','MANYTOMANY','requests','votes','gh_user_id','request_id',0,0,0,9999,''),
	(23,'comments','date','DATE','date',NULL,NULL,NULL,NULL,NULL,0,0,0,9999,''),
	(24,'requests','date','DATE','date',NULL,NULL,NULL,NULL,NULL,0,0,0,5,''),
	(26,'requests','closed','TINYINT','checkbox',NULL,NULL,NULL,NULL,NULL,0,0,0,2,''),
	(29,'comments','last_updated','DATE','date',NULL,NULL,NULL,NULL,NULL,0,0,0,9999,''),
	(30,'requests','last_updated','DATE','date',NULL,NULL,NULL,NULL,NULL,0,0,0,9999,''),
	(31,'requests','username','VARCHAR','textinput',NULL,NULL,NULL,NULL,NULL,0,0,0,9999,''),
	(32,'test','title','VARCHAR','textinput',NULL,NULL,NULL,NULL,NULL,0,0,0,9999,''),
	(33,'test','id',NULL,'numeric',NULL,NULL,NULL,NULL,NULL,0,0,1,1,''),
	(34,'test','active',NULL,'numeric',NULL,NULL,NULL,NULL,NULL,0,0,0,2,''),
	(35,'comments','username','VARCHAR','textinput',NULL,NULL,NULL,NULL,NULL,0,0,0,9999,''),
	(36,'votes','username','VARCHAR','textinput',NULL,NULL,NULL,NULL,NULL,0,0,0,9999,''),
	(37,'votes','value','TINYINT','numeric',NULL,NULL,NULL,NULL,NULL,0,0,0,9999,''),
	(38,'requests','votes','ALIAS','one_to_many','ONETOMANY','votes',NULL,NULL,'request_id',0,0,0,9999,'');

/*!40000 ALTER TABLE `directus_columns` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `directus_tables`;

CREATE TABLE `directus_tables` (
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `hidden` tinyint(1) NOT NULL DEFAULT '0',
  `single` tinyint(1) NOT NULL DEFAULT '0',
  `default_status` tinyint(1) NOT NULL DEFAULT '1',
  `footer` tinyint(1) DEFAULT '0',
  `list_view` varchar(200) DEFAULT NULL,
  `column_groupings` varchar(255) DEFAULT NULL,
  `primary_column` varchar(255) DEFAULT NULL,
  `user_create_column` varchar(64) DEFAULT NULL,
  `user_update_column` varchar(64) DEFAULT NULL,
  `date_create_column` varchar(64) DEFAULT NULL,
  `date_update_column` varchar(64) DEFAULT NULL,
  `filter_column_blacklist` text,
  PRIMARY KEY (`table_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `directus_tables` WRITE;
/*!40000 ALTER TABLE `directus_tables` DISABLE KEYS */;

INSERT INTO `directus_tables` (`table_name`, `hidden`, `single`, `default_status`, `footer`, `list_view`, `column_groupings`, `primary_column`, `user_create_column`, `user_update_column`, `date_create_column`, `date_update_column`, `filter_column_blacklist`)
VALUES
	('comments',0,0,1,0,NULL,NULL,'id',NULL,NULL,NULL,NULL,NULL),
	('directus_bookmarks',1,0,1,0,NULL,NULL,NULL,'user',NULL,NULL,NULL,NULL),
	('directus_files',1,0,1,0,NULL,NULL,NULL,'user',NULL,NULL,NULL,NULL),
	('directus_messages_recipients',1,0,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
	('directus_preferences',1,0,1,0,NULL,NULL,NULL,'user',NULL,NULL,NULL,NULL),
	('directus_users',1,0,1,0,NULL,NULL,NULL,'id',NULL,NULL,NULL,NULL),
	('requests',0,0,1,0,NULL,NULL,'id',NULL,NULL,NULL,NULL,NULL),
	('votes',0,0,1,0,NULL,NULL,'id',NULL,NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `directus_tables` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `directus_ui`;

CREATE TABLE `directus_ui` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `table_name` varchar(64) DEFAULT NULL,
  `column_name` varchar(64) DEFAULT NULL,
  `ui_name` varchar(200) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `value` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique` (`table_name`,`column_name`,`ui_name`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `directus_ui` WRITE;
/*!40000 ALTER TABLE `directus_ui` DISABLE KEYS */;

INSERT INTO `directus_ui` (`id`, `table_name`, `column_name`, `ui_name`, `name`, `value`)
VALUES
	(1,'directus_users','avatar_file_id','single_file','allowed_filetypes','image/*'),
	(11,'requests','comments','one_to_many','id','one_to_many'),
	(12,'requests','comments','one_to_many','visible_columns','content'),
	(13,'requests','comments','one_to_many','result_limit','100'),
	(14,'requests','comments','one_to_many','add_button','1'),
	(15,'requests','comments','one_to_many','choose_button','1'),
	(16,'requests','comments','one_to_many','remove_button','1'),
	(17,'requests','comments','one_to_many','only_unassigned','0'),
	(36,'comments','request_id','many_to_one','id','many_to_one'),
	(37,'comments','request_id','many_to_one','readonly','0'),
	(38,'comments','request_id','many_to_one','visible_column','title'),
	(39,'comments','request_id','many_to_one','visible_column_template','{{title}}'),
	(40,'comments','request_id','many_to_one','visible_status_ids','1'),
	(41,'comments','request_id','many_to_one','placeholder_text','Select request'),
	(42,'comments','request_id','many_to_one','allow_null','0'),
	(43,'comments','request_id','many_to_one','filter_type','dropdown'),
	(44,'comments','request_id','many_to_one','filter_column',''),
	(45,'comments','date','date','id','date'),
	(46,'comments','date','date','readonly','0'),
	(47,'comments','date','date','visible_column','title'),
	(48,'comments','date','date','visible_column_template','{{title}}'),
	(49,'comments','date','date','visible_status_ids','1'),
	(50,'comments','date','date','placeholder_text','Select request'),
	(51,'comments','date','date','allow_null','0'),
	(52,'comments','date','date','filter_type','dropdown'),
	(53,'comments','date','date','filter_column',''),
	(54,'comments','date','date','format',''),
	(55,'comments','date','date','contextual_date_in_listview','1'),
	(56,'comments','date','date','auto-populate_when_hidden_and_null','0'),
	(57,'comments','last_updated','date','id','date'),
	(58,'comments','last_updated','date','readonly','0'),
	(59,'comments','last_updated','date','visible_column','title'),
	(60,'comments','last_updated','date','visible_column_template','{{title}}'),
	(61,'comments','last_updated','date','visible_status_ids','1'),
	(62,'comments','last_updated','date','placeholder_text','Select request'),
	(63,'comments','last_updated','date','allow_null','0'),
	(64,'comments','last_updated','date','filter_type','dropdown'),
	(65,'comments','last_updated','date','filter_column',''),
	(66,'comments','last_updated','date','format','YYYY-MM-DD'),
	(67,'comments','last_updated','date','contextual_date_in_listview','1'),
	(68,'comments','last_updated','date','auto-populate_when_hidden_and_null','0'),
	(69,'requests','date','date','id','date'),
	(70,'requests','date','date','readonly','0'),
	(71,'requests','date','date','format',''),
	(72,'requests','date','date','contextual_date_in_listview','1'),
	(73,'requests','date','date','auto-populate_when_hidden_and_null','0'),
	(74,'requests','last_updated','date','id','date'),
	(75,'requests','last_updated','date','readonly','0'),
	(76,'requests','last_updated','date','visible_column','username'),
	(77,'requests','last_updated','date','visible_column_template','{{username}}'),
	(78,'requests','last_updated','date','visible_status_ids','1'),
	(79,'requests','last_updated','date','placeholder_text','Select user'),
	(80,'requests','last_updated','date','allow_null','0'),
	(81,'requests','last_updated','date','filter_type','dropdown'),
	(82,'requests','last_updated','date','filter_column',''),
	(83,'requests','last_updated','date','format',''),
	(84,'requests','last_updated','date','contextual_date_in_listview','1'),
	(85,'requests','last_updated','date','auto-populate_when_hidden_and_null','0'),
	(86,'requests','votes','one_to_many','id','one_to_many'),
	(87,'requests','votes','one_to_many','visible_columns','username,value'),
	(88,'requests','votes','one_to_many','result_limit','100'),
	(89,'requests','votes','one_to_many','add_button','0'),
	(90,'requests','votes','one_to_many','choose_button','1'),
	(91,'requests','votes','one_to_many','remove_button','1'),
	(92,'requests','votes','one_to_many','only_unassigned','0');

/*!40000 ALTER TABLE `directus_ui` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `requests`;

CREATE TABLE `requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` int(11) NOT NULL DEFAULT '2',
  `title` varchar(255) DEFAULT NULL,
  `votes_offset` int(11) DEFAULT '0',
  `date` datetime DEFAULT NULL,
  `closed` tinyint(4) DEFAULT '0',
  `last_updated` datetime DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `votes`;

CREATE TABLE `votes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `active` int(11) NOT NULL DEFAULT '2',
  `request_id` int(11) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `value` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
