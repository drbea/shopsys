/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.11-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: shopsysdb
-- ------------------------------------------------------
-- Server version	10.11.11-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES
(4,'Boisson'),
(2,'Cereale'),
(1,'Fruit'),
(20,'Numeric'),
(3,'Produit Laitier');
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produit`
--

DROP TABLE IF EXISTS `produit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `produit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prix` decimal(10,2) NOT NULL,
  `categorie` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `detail` text DEFAULT NULL,
  `image` varchar(512) DEFAULT NULL,
  `codebarre` varchar(255) DEFAULT NULL,
  `addedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_categorie` (`categorie`),
  CONSTRAINT `fk_categorie` FOREIGN KEY (`categorie`) REFERENCES `categorie` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produit`
--

LOCK TABLES `produit` WRITE;
/*!40000 ALTER TABLE `produit` DISABLE KEYS */;
INSERT INTO `produit` VALUES
(4,'Bretelle',6.99,2,100,NULL,'http://localhost:8008/media/1749488222109-paycard.png','8205987854850','2025-06-09 16:57:02'),
(5,'Legume Vert',150.00,2,4,NULL,'http://localhost:8008/media/1749516201992-im1 legume frais.jpg','8855987857478','2025-06-10 00:43:23'),
(6,'produit consommation',14.99,1,87,NULL,'http://localhost:8008/media/1749897600445-im3 conso resp.jpg','826597853811','2025-06-14 10:40:00'),
(8,'User MTN',12.99,1,8,NULL,'http://localhost:8008/media/mtn-momp-1750082742140.png','116394853811','2025-06-16 14:05:42'),
(9,'Test detail',1.00,1,10,'ceci est un test de détail','image.png','','2025-06-17 18:16:56'),
(11,'Wallpapper',35.00,20,12,'fond d\'ecrant pour pc','http://localhost:8008/media/match_case-1750286073896.png','234156734','2025-06-18 22:34:33'),
(12,'Wallpapper 22',15.99,20,32,'fond d\'ecrant pour pc','http://localhost:8008/media/capture-dcran-du-2025-04-10-05-00-20-1750288540768.png','12345678','2025-06-18 23:15:41');
/*!40000 ALTER TABLE `produit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prenom` varchar(100) DEFAULT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES
(1,'Luc','Dupont','luc@mail.com','test123'),
(2,'Jack','Bretelle','jack12@mail.gn','Shopsys123!'),
(3,'LEDUC','MAX','leduc@max.gn','maxleducgn'),
(4,'Super','Mario','mario@mail.gn','lemon@mar!'),
(5,'Adrian','Duc','adrian@lemon.gn','lemon@789!'),
(6,'local','User','local@user.com','$2b$10$XCM46NL5dUTbRDWQJCnoF.VddyIsx/R6Y16Es7L43/2ZCF/FDkiL6');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventes`
--

DROP TABLE IF EXISTS `ventes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventes` (
  `id_vente` int(11) NOT NULL AUTO_INCREMENT,
  `nom_produit` varchar(255) NOT NULL,
  `client` varchar(255) DEFAULT NULL,
  `ref_client` varchar(255) DEFAULT NULL,
  `quantite` int(11) NOT NULL,
  `prix_total` decimal(10,2) NOT NULL,
  `date_vente` datetime NOT NULL,
  PRIMARY KEY (`id_vente`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventes`
--

LOCK TABLES `ventes` WRITE;
/*!40000 ALTER TABLE `ventes` DISABLE KEYS */;
INSERT INTO `ventes` VALUES
(1,'Clavier Numerique','John Doe','JD-001',23,230.00,'2025-06-16 12:30:52'),
(2,'Smartphone Galaxy S24','Jean Dubois','JD-9867',2,1800.00,'2025-06-16 12:20:19'),
(11,'Smartphone Galaxy N10','Jack Kelvin','Jk-4867',2,1800.00,'2025-06-16 13:08:52'),
(12,'Smartphone Galaxy N10','Jack Kelvin','Jk-4867',2,1800.00,'2025-06-16 13:12:49'),
(13,'Smartphone Galaxy N10','Jack Kelvin','Jk-4867',2,1800.00,'2025-06-16 13:12:51'),
(14,'Smartphone Infinix N10','Jack Kelvin','Jk-4867',34,180.00,'2025-06-16 13:41:35'),
(15,'User MTN','Bea Maxime','BM-9098',1,120.00,'2025-06-16 14:23:55'),
(16,'mtnk fruit','Bea Maxime','BM-9098',2,240.00,'2025-06-16 14:23:55'),
(17,'Legume Vert','Bea Maxime','BM-9098',1,150.00,'2025-06-16 14:23:55'),
(18,'Lait Caillé','Bea Maxime','BM-9098',11,120.89,'2025-06-16 14:23:55'),
(19,'Lait Caillé','John Doe','JD-001',3,32.97,'2025-06-17 13:19:39'),
(20,'Legume Vert','John Doe','JD-007',5,750.00,'2025-06-17 13:24:18');
/*!40000 ALTER TABLE `ventes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-22  9:20:47
