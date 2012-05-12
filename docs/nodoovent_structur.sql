-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 11, 2012 at 12:59 PM
-- Server version: 5.5.20
-- PHP Version: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nodoovent`
--

-- --------------------------------------------------------

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
CREATE TABLE IF NOT EXISTS `author` (
  `aut_id` int(11) NOT NULL AUTO_INCREMENT,
  `aut_name` varchar(64) NOT NULL,
  PRIMARY KEY (`aut_id`),
  UNIQUE KEY `aut_id_UNIQUE` (`aut_id`),
  UNIQUE KEY `aut_name_UNIQUE` (`aut_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Table structure for table `author_has_element`
--

DROP TABLE IF EXISTS `author_has_element`;
CREATE TABLE IF NOT EXISTS `author_has_element` (
  `author_aut_id` int(11) NOT NULL,
  `element_ele_id` int(11) NOT NULL,
  PRIMARY KEY (`author_aut_id`,`element_ele_id`),
  KEY `fk_author_has_element_element1` (`element_ele_id`),
  KEY `fk_author_has_element_author1` (`author_aut_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(64) DEFAULT NULL,
  `cat_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cat_id`),
  UNIQUE KEY `cat_id_UNIQUE` (`cat_id`),
  UNIQUE KEY `cat_name_UNIQUE` (`cat_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `element`
--

DROP TABLE IF EXISTS `element`;
CREATE TABLE IF NOT EXISTS `element` (
  `ele_id` int(11) NOT NULL AUTO_INCREMENT,
  `ele_name` varchar(64) DEFAULT NULL,
  `ele_content` longtext,
  `ele_date_creation` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_cat_id` int(11) NOT NULL,
  PRIMARY KEY (`ele_id`),
  UNIQUE KEY `element_if_UNIQUE` (`ele_id`),
  KEY `fk_element_category1` (`category_cat_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Table structure for table `element_has_tag`
--

DROP TABLE IF EXISTS `element_has_tag`;
CREATE TABLE IF NOT EXISTS `element_has_tag` (
  `element_ele_id` int(11) NOT NULL,
  `tag_tag_id` int(11) NOT NULL,
  PRIMARY KEY (`element_ele_id`,`tag_tag_id`),
  KEY `fk_element_has_tag_tag1` (`tag_tag_id`),
  KEY `fk_element_has_tag_element1` (`element_ele_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `tag_id_UNIQUE` (`tag_id`),
  UNIQUE KEY `tag_name_UNIQUE` (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `author_has_element`
--
ALTER TABLE `author_has_element`
  ADD CONSTRAINT `fk_author_has_element_author1` FOREIGN KEY (`author_aut_id`) REFERENCES `author` (`aut_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_author_has_element_element1` FOREIGN KEY (`element_ele_id`) REFERENCES `element` (`ele_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `element`
--
ALTER TABLE `element`
  ADD CONSTRAINT `fk_element_category1` FOREIGN KEY (`category_cat_id`) REFERENCES `category` (`cat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `element_has_tag`
--
ALTER TABLE `element_has_tag`
  ADD CONSTRAINT `fk_element_has_tag_element1` FOREIGN KEY (`element_ele_id`) REFERENCES `element` (`ele_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_element_has_tag_tag1` FOREIGN KEY (`tag_tag_id`) REFERENCES `tag` (`tag_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
