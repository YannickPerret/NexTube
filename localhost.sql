-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 21, 2022 at 07:44 PM
-- Server version: 5.7.33
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nextube`
--
DROP DATABASE IF EXISTS `nextube`;
CREATE DATABASE IF NOT EXISTS `nextube` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `nextube`;

-- --------------------------------------------------------

--
-- Table structure for table `infovideo`
--

CREATE TABLE `infovideo` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `isEdit` int(1) NOT NULL,
  `url` varchar(100) NOT NULL,
  `idPlateforme` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `infovideo`
--

INSERT INTO `infovideo` (`id`, `title`, `isEdit`, `url`, `idPlateforme`) VALUES
(1, 'L\'Atomic Design pour découper son projet en composants réutilisables de la', 1, 'NC5N5n8wJxI', 1),
(2, 'LES COULISSES DE LA #ZLAN2022 (Aftermovie)', 0, 'G59LM47DR8E', 1);

-- --------------------------------------------------------

--
-- Table structure for table `plateforme`
--

CREATE TABLE `plateforme` (
  `idPlateforme` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `color` varchar(10) DEFAULT NULL,
  `suffixUrl` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `plateforme`
--

INSERT INTO `plateforme` (`idPlateforme`, `name`, `color`, `suffixUrl`) VALUES
(1, 'Youtube', '#00ade1', 'https://www.youtube.com/watch?v=');

-- --------------------------------------------------------

--
-- Table structure for table `skip`
--

CREATE TABLE `skip` (
  `idSkip` int(11) NOT NULL,
  `urlVideo` varchar(50) NOT NULL,
  `idUser` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `dataSet` json NOT NULL,
  `approuved` int(1) NOT NULL,
  `numberLike` int(255) DEFAULT NULL,
  `numberDislike` int(255) DEFAULT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateUpdate` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `skip`
--

INSERT INTO `skip` (`idSkip`, `urlVideo`, `idUser`, `title`, `dataSet`, `approuved`, `numberLike`, `numberDislike`, `dateCreated`, `dateUpdate`) VALUES
(1, 'NC5N5n8wJxI', 1, 'Cut video de Yannick', '[{\"end\": 30, \"type\": 1, \"begin\": 15, \"title\": \"Intro de la vidéo\"}, {\"end\": 119, \"type\": 2, \"begin\": 45, \"title\": \"moment chiant\"}, {\"end\": 145, \"type\": 2, \"begin\": 125, \"title\": \"ca j\'ai pas envie de voir\"}, {\"end\": 152, \"type\": 2, \"begin\": 150, \"title\": \"Je fais un petit test ici\"}, {\"end\": 120, \"begin\": 80}, {\"end\": 327, \"begin\": 320}, {\"end\": 280, \"begin\": 240}, {\"end\": 120, \"begin\": 80}, {\"end\": 327, \"begin\": 320}, {\"end\": 280, \"begin\": 240}]', 1, 250, 1, '2022-03-30 16:42:08', NULL),
(2, 'NC5N5n8wJxI', 1, 'Cut video de FrozenCrystal', '[{\"end\": 180, \"type\": 1, \"begin\": 150, \"title\": \"Intro2 de la vidéo\"}, {\"end\": 250, \"type\": 2, \"begin\": 200, \"title\": \"moment2 chiant\"}]', 1, 10, 15, '2022-03-30 16:42:08', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `infovideo`
--
ALTER TABLE `infovideo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `url` (`url`);

--
-- Indexes for table `plateforme`
--
ALTER TABLE `plateforme`
  ADD PRIMARY KEY (`idPlateforme`);

--
-- Indexes for table `skip`
--
ALTER TABLE `skip`
  ADD PRIMARY KEY (`idSkip`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `infovideo`
--
ALTER TABLE `infovideo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `plateforme`
--
ALTER TABLE `plateforme`
  MODIFY `idPlateforme` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `skip`
--
ALTER TABLE `skip`
  MODIFY `idSkip` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
