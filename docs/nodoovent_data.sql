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

--
-- Dumping data for table `author`
--

INSERT INTO `author` (`aut_id`, `aut_name`) VALUES
(1, 'G4llic4'),
(2, 'Néochok');

--
-- Dumping data for table `element`
--

INSERT INTO `element` (`ele_id`, `ele_name`, `ele_content`, `ele_date_creation`, `category_cat_id`) VALUES
(1, 'Stage', 'Faire sa mission de stage', '2012-03-31 17:04:59', 0),
(2, 'Voyage', 'Penser à prendre l''avion !', '2012-03-31 07:21:07', 0),
(3, 'Voter', 'Il est impératif de faire valoir ses droits', '2012-03-31 07:21:07', 0),
(4, 'Courses', 'Acheter du pain', '2012-03-31 05:07:42', 0),
(5, 'Courses', 'Acheter du beurre', '2012-03-31 05:07:42', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
