CREATE DATABASE  IF NOT EXISTS `videojuegofinal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `videojuegofinal`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: videojuegofinal
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contraseña` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Region` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Pais` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Rol` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `usuario` (`usuario`),
  UNIQUE KEY `telefono` (`telefono`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (22,'luis1715','c410f86637378d41e739f8a6e70d070b0bb292c5f4c30ec6b29e4d50fce3c5e1','Luis Balderas','1969-12-31','luis_1715@outlook.com','Estado de México','Mexico','5551075981','UsuarioNormal'),(23,'admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','admin',NULL,'admin@gmail.com','Ciudad de Mexico','Mexico',NULL,NULL),(24,'jesus1','461d7a1b4cd6f184844f52f43c445cb42b793971862935516816ab5d220db918','jesus','1985-06-12','jesus@gmail.com','Nuevo León','Mexico','5551075982','Agricultor'),(25,'jose','1ec4ed037766aa181d8840ad04b9fc6e195fd37dedc04c98a5767a67d3758ece','jose','1974-10-19','jose@gmail.com','Tlaxcala','Mexico','5551075983','Inversor'),(26,'sebas','ceef825134d22576b496c17f8429406ab6b753124a2fa15a76cb76f7eea1209b','sebas','1983-11-24','sebas@gmail.com','Nayarit','Mexico','5551075984','UsuarioNormal'),(27,'pepito','c8cdf720db5562a039be5d81c51a07c5120eaf0bf142b2144f1a1eb7a95678d3','pepito','1986-01-02','pepito@gmail.com','Guanajuato','Mexico','5551075985','Inversor');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jugador`
--

DROP TABLE IF EXISTS `jugador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jugador` (
  `IdJugador` int NOT NULL AUTO_INCREMENT,
  `idCliente` int NOT NULL,
  `dinero` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `financiamento` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `preguntasCorrectas` int DEFAULT NULL,
  `preguntasIncorrectas` int DEFAULT NULL,
  `cultivo` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Wins` int DEFAULT NULL,
  `loses` int DEFAULT NULL,
  PRIMARY KEY (`IdJugador`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `jugador_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jugador`
--

LOCK TABLES `jugador` WRITE;
/*!40000 ALTER TABLE `jugador` DISABLE KEYS */;
INSERT INTO `jugador` VALUES (4,22,'-40.040000915527344','Verqor',0,1,'Regenerativo',NULL,1),(6,24,'-112.5','Coyote',0,4,'Regenerativo',NULL,2),(7,25,'-951.1600341796875','Tradicional',6,1,'Regenerativo',NULL,1),(8,26,'-18.459991455078125','Verqor',2,1,'Tradicional',NULL,1),(9,27,'94619.8828125','Tradicional',11,6,'Regenerativo',1,NULL);
/*!40000 ALTER TABLE `jugador` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-02 11:35:14
