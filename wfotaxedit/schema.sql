-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: wfo_list
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `author_lookup`
--

DROP TABLE IF EXISTS `author_lookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author_lookup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `abbreviation` varchar(45) NOT NULL,
  `label` varchar(100) DEFAULT NULL,
  `uri` varchar(100) DEFAULT NULL,
  `image_uri` varchar(500) DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `death` datetime DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `abbreviation_UNIQUE` (`abbreviation`)
) ENGINE=InnoDB AUTO_INCREMENT=31899 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `citations`
--

DROP TABLE IF EXISTS `citations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wfo_id` varchar(45) NOT NULL,
  `publication_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wfo_id` varchar(16) DEFAULT NULL,
  `rank` enum('order','family','section','phylum','subgenus','genus','species','subspecies','variety','form') DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `genus` varchar(45) DEFAULT NULL,
  `species` varchar(45) DEFAULT NULL,
  `author_text` varchar(200) DEFAULT NULL,
  `protologue_text` varchar(200) DEFAULT NULL,
  `basionym_wfo_id` varchar(45) DEFAULT NULL,
  `parent_wfo_id` varchar(16) DEFAULT NULL,
  `accepted_wfo_id` varchar(16) DEFAULT NULL,
  `status` enum('checked','unchecked','doubtful') DEFAULT NULL,
  `comments` varchar(45) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ipni_name_id` varchar(45) DEFAULT NULL,
  `legacy_references` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wfo_id_UNIQUE` (`wfo_id`),
  KEY `parentage` (`parent_wfo_id`) USING BTREE,
  KEY `accepted` (`accepted_wfo_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1317721 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `items_log`
--

DROP TABLE IF EXISTS `items_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_log` (
  `id` int NOT NULL DEFAULT '0',
  `wfo_id` varchar(16) DEFAULT NULL,
  `rank` enum('order','family','section','phylum','subgenus','genus','species','subspecies','variety','form') DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `genus` varchar(45) DEFAULT NULL,
  `species` varchar(45) DEFAULT NULL,
  `author_text` varchar(200) DEFAULT NULL,
  `protologue_text` varchar(200) DEFAULT NULL,
  `basionym_wfo_id` varchar(45) DEFAULT NULL,
  `parent_wfo_id` varchar(16) DEFAULT NULL,
  `accepted_wfo_id` varchar(16) DEFAULT NULL,
  `status` enum('checked','unchecked','doubtful') DEFAULT NULL,
  `comments` varchar(45) DEFAULT NULL,
  `created` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ipni_name_id` varchar(45) DEFAULT NULL,
  `legacy_references` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `publications`
--

DROP TABLE IF EXISTS `publications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ipni_id` varchar(45) NOT NULL,
  `abbreviation` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-21 23:14:53
