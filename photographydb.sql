-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2016 at 04:37 PM
-- Server version: 5.5.25
-- PHP Version: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `photographydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE IF NOT EXISTS `contacts` (
  `email` varchar(255) NOT NULL,
  `googlePlus` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `pinterest` varchar(255) DEFAULT NULL,
  `vkontakte` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`email`, `googlePlus`, `instagram`, `pinterest`, `vkontakte`, `facebook`, `twitter`) VALUES
('dm.sopin@epam.com', 'googlePlus	', NULL, NULL, 'vk.com/123', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE IF NOT EXISTS `countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `international` varchar(255) NOT NULL,
  `cover` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `international`, `cover`) VALUES
(1, 'Бутан', 'Bhutan', 'Bhutan/D71_5187_1a.jpg'),
(2, 'Кавказ', 'Caucasus', 'Caucasus/1_D71_0747_1300.jpg'),
(3, 'Куба', 'Cuba', 'Cuba/D71_2851_1a.jpg'),
(4, 'Франция', 'France', 'France/1_D71_2602_1300.jpg'),
(5, 'Индия', 'India', 'India/D71_2851_1a.jpg'),
(6, 'Израиль', 'Israel', 'Israel/1_D72_1179_1300.jpg'),
(7, 'Италия', 'Italy', 'Italy/1_DSC_6816_1300.jpg'),
(8, 'Марокко', 'Marocco', 'Marocco/1_DSC_2941_1300.jpg'),
(9, 'Мьянма', 'Myanmar', 'Myanmar/1_D72_5640_1300.jpg'),
(10, 'Намибия', 'Namibia', 'Namibia/DC4_0681_1300_1300.jpg'),
(11, 'Непал', 'Nepal', 'Nepal/80652544_1300_1300.jpg'),
(12, 'Тибет', 'Tibet', 'ibet/10_DSC_6008_1300.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE IF NOT EXISTS `feedbacks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `feedback` text NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `name`, `email`, `feedback`, `date`) VALUES
(1, 'Дмитрий', 'dmytro_sopin@epam.com', 'Cool design!', '2016-04-19 13:04:10'),
(2, '2', 'sdimas-best@mail.ru', '4', '0000-00-00 00:00:00'),
(3, '2', 'sdimas-best@mail.ru', '4', '2016-04-19 13:18:51'),
(4, 'Вешкин', 'vesh@univer.com', 'Классный сайт!', '2016-04-19 13:20:57'),
(5, '1', 'dmytro_sopin@epam.com', '324', '2016-04-19 13:22:27'),
(6, 'Dmytro', 'dmytro_sopin@epam.com', 'pppp', '2016-04-19 13:23:31'),
(7, 'fd', 'fdfdf@ikljkljnh.nj', 'fdf', '2016-04-19 13:24:00'),
(8, 'des', 'dmytro_sopin@epam.com', 'd', '2016-04-19 13:24:51'),
(9, 'Dmytro', 'dmytro_sopin@epam.com', 'fan', '2016-04-19 13:26:08'),
(10, '', '', '', '2016-04-19 16:47:42'),
(11, 'Тест', 'dmytro_sopin@epam.com', 'Тест', '2016-04-19 18:04:00'),
(12, 'hgh', 'sdimas-best@mail.ru', 'fdf', '2016-04-20 13:54:54');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE IF NOT EXISTS `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `src` varchar(255) NOT NULL,
  `country_id` int(11) NOT NULL,
  `is_best` tinyint(1) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `desc` text,
  PRIMARY KEY (`id`),
  KEY `Photos_fk0` (`country_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=557 ;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `src`, `country_id`, `is_best`, `title`, `desc`) VALUES
(1, 'Bhutan/D71_5187_1a.jpg', 1, 0, '', ''),
(2, 'Bhutan/D71_5201_1a.jpg', 1, 0, '', ''),
(3, 'Bhutan/D71_5213_1a.jpg', 1, 0, '', ''),
(4, 'Bhutan/D71_5242_1a.jpg', 1, 0, '', ''),
(5, 'Bhutan/D71_5885_2a.jpg', 1, 0, '', ''),
(6, 'Bhutan/D71_5941_3a.jpg', 1, 0, '', ''),
(7, 'Bhutan/D71_6168_1b.jpg', 1, 0, '', ''),
(8, 'Bhutan/D72_0591_1a.jpg', 1, 0, '', ''),
(9, 'Bhutan/D72_0934_1a.jpg', 1, 0, '', ''),
(10, 'Bhutan/D72_1579_2a.jpg', 1, 0, '', ''),
(11, 'Caucasus/1_D71_0747_1300.jpg', 2, 0, '', ''),
(12, 'Caucasus/1_D71_9573_1300.jpg', 2, 0, '', ''),
(13, 'Caucasus/1_DC4_2935_1300.jpg', 2, 0, '', ''),
(14, 'Caucasus/10_D71_1251_1300.jpg', 2, 0, '', ''),
(15, 'Caucasus/10_DC4_2618_1300.jpg', 2, 0, '', ''),
(16, 'Caucasus/10_DSC_7351_1300.jpg', 2, 0, '', ''),
(17, 'Caucasus/11_CF004552_1300.jpg', 2, 0, '', ''),
(18, 'Caucasus/11_DSC_7434_1300.jpg', 2, 0, '', ''),
(19, 'Caucasus/11_DSC_7690_1300.jpg', 2, 0, '', ''),
(20, 'Caucasus/12_D71_6571_1300.jpg', 2, 0, '', ''),
(21, 'Caucasus/12_D71_8932-42_1300.jpg', 2, 0, '', ''),
(22, 'Caucasus/12_DSC_7527_1300.jpg', 2, 0, '', ''),
(23, 'Caucasus/13_D71_6363_1300.jpg', 2, 0, '', ''),
(24, 'Caucasus/13_DSC_7544_1300.jpg', 2, 0, '', ''),
(25, 'Caucasus/14_D71_9717-19_1300.jpg', 2, 0, '', ''),
(26, 'Caucasus/14_DSC_7586_1300.jpg', 2, 0, '', ''),
(27, 'Caucasus/15_DSC_7625_1300.jpg', 2, 0, '', ''),
(28, 'Caucasus/16_DSC_7666_1300.jpg', 2, 0, '', ''),
(29, 'Caucasus/17_DSC_0226_1300.jpg', 2, 0, '', ''),
(30, 'Caucasus/18_DSC_7118_1300.jpg', 2, 0, '', ''),
(31, 'Caucasus/19_DSC_7148_1300.jpg', 2, 0, '', ''),
(32, 'Caucasus/2_D71_0882_1300.jpg', 2, 0, '', ''),
(33, 'Caucasus/2_D71_9577_1300.jpg', 2, 0, '', ''),
(34, 'Caucasus/2_DSC_7592_1300.jpg', 2, 0, '', ''),
(35, 'Caucasus/20_DSC_7130_1300.jpg', 2, 0, '', ''),
(36, 'Caucasus/3_D71_0021_1300.jpg', 2, 0, '', ''),
(37, 'Caucasus/3_D71_9563_1300.jpg', 2, 0, '', ''),
(38, 'Caucasus/3_DSC_7217_1300.jpg', 2, 0, '', ''),
(39, 'Caucasus/4_D71_8010_1300.jpg', 2, 0, '', ''),
(40, 'Caucasus/4_D71_9541_1300.jpg', 2, 0, '', ''),
(41, 'Caucasus/4_DSC_7472_1300.jpg', 2, 0, '', ''),
(42, 'Caucasus/5_D71_7104_1300.jpg', 2, 0, '', ''),
(43, 'Caucasus/5_DSC_7492_1300.jpg', 2, 0, '', ''),
(44, 'Caucasus/5_DSC_7748_1300.jpg', 2, 0, '', ''),
(45, 'Caucasus/6_D71_7348_1300.jpg', 2, 0, '', ''),
(46, 'Caucasus/6_D71_9826_1300.jpg', 2, 0, '', ''),
(47, 'Caucasus/6_DSC_7154_1300.jpg', 2, 0, '', ''),
(48, 'Caucasus/7_D71_7470_1300.jpg', 2, 0, '', ''),
(49, 'Caucasus/7_DSC_6974_1300.jpg', 2, 0, '', ''),
(50, 'Caucasus/7_DSC_7232_1300.jpg', 2, 0, '', ''),
(51, 'Caucasus/8_D71_7547_1300.jpg', 2, 0, '', ''),
(52, 'Caucasus/8_DSC_6916_1300.jpg', 2, 0, '', ''),
(53, 'Caucasus/8_DSC_7275_1300.jpg', 2, 0, '', ''),
(54, 'Caucasus/9_D71_7475_1300.jpg', 2, 0, '', ''),
(55, 'Caucasus/9_D71_9955_1300.jpg', 2, 0, '', ''),
(56, 'Caucasus/9_DSC_7310_1300.jpg', 2, 0, '', ''),
(57, 'Cuba/D71_2851_1a.jpg', 3, 0, '', ''),
(58, 'Cuba/D71_2925_1a.jpg', 3, 0, '', ''),
(59, 'Cuba/DSC_1309_1a.jpg', 3, 0, '', ''),
(60, 'Cuba/DSC_2408_1a.jpg', 3, 0, '', ''),
(61, 'Cuba/DSC_4081_1a.jpg', 3, 0, '', ''),
(62, 'Cuba/DSC_5626_1a.jpg', 3, 0, '', ''),
(63, 'France/1_D71_2602_1300.jpg', 4, 1, '', ''),
(64, 'France/1_DC8_3147_1300.jpg', 4, 1, '', ''),
(65, 'France/1_DC8_3895_1300.jpg', 4, 1, '', ''),
(66, 'France/1_DC8_4649_1300.jpg', 4, 1, '', ''),
(67, 'France/10_D71_1835_1300.jpg', 4, 1, '', ''),
(68, 'France/10_D71_1973_1300.jpg', 4, 1, '', ''),
(69, 'France/11_D71_1980_1300.jpg', 4, 1, '', ''),
(70, 'France/11_D71_2219_1300.jpg', 4, 1, '', ''),
(71, 'France/12_D71_2001_1300.jpg', 4, 1, '', ''),
(72, 'France/12_D71_2158_1300.jpg', 4, 1, '', ''),
(73, 'France/13_D71_1870_1300.jpg', 4, 1, '', ''),
(74, 'France/13_D71_1997_1300.jpg', 4, 1, '', ''),
(75, 'France/14_D71_2308_1300.jpg', 4, 1, '', ''),
(76, 'France/14_D71_2366_1300.jpg', 4, 1, '', ''),
(77, 'France/15_D71_2318_1300.jpg', 4, 1, '', ''),
(78, 'France/15_D71_2699_1300.jpg', 4, 1, '', ''),
(79, 'France/16_D71_2509_1300.jpg', 4, 1, '', ''),
(80, 'France/16_D71_2725_1300.jpg', 4, 1, '', ''),
(81, 'France/17_D71_2044_1300.jpg', 4, 1, '', ''),
(82, 'France/17_D71_2397_1300.jpg', 4, 1, '', ''),
(83, 'France/18_D71_2049_1300.jpg', 4, 1, '', ''),
(84, 'France/18_D71_2377_1300.jpg', 4, 1, '', ''),
(85, 'France/19_D71_2050_1300.jpg', 4, 1, '', ''),
(86, 'France/19_D71_2589_1300.jpg', 4, 1, '', ''),
(87, 'France/2_DC8_3599_1300.jpg', 4, 1, '', ''),
(88, 'France/2_DC8_4645_1300.jpg', 4, 1, '', ''),
(89, 'France/2_DC8_4935_1300.jpg', 4, 1, '', ''),
(90, 'France/2_DSC06159_1300.jpg', 4, 1, '', ''),
(91, 'France/20_D71_2594_1300.jpg', 4, 1, '', ''),
(92, 'France/20_DSC_0068_1300.jpg', 4, 1, '', ''),
(93, 'France/21_D71_2622_1300.jpg', 4, 1, '', ''),
(94, 'France/21_DSC_0098_1300.jpg', 4, 1, '', ''),
(95, 'France/22_D71_2332_1300.jpg', 4, 1, '', ''),
(96, 'France/22_D71_2654_1300.jpg', 4, 1, '', ''),
(97, 'France/23_D71_2355_1300.jpg', 4, 1, '', ''),
(98, 'France/23_DC8_4746_1300.jpg', 4, 1, '', ''),
(99, 'France/24_DC8_4772_1300.jpg', 4, 1, '', ''),
(100, 'France/3_D71_2747-2755_1300.jpg', 4, 1, '', ''),
(101, 'France/3_D71_2793-LR-Edit_1300.jpg', 4, 1, '', ''),
(102, 'France/3_DC8_2613_1300.jpg', 4, 1, '', ''),
(103, 'France/3_DC8_3733_1300.jpg', 4, 1, '', ''),
(104, 'France/4_D71_1555_1300.jpg', 4, 1, '', ''),
(105, 'France/4_D71_1722_1300.jpg', 4, 1, '', ''),
(106, 'France/4_DC8_4453_1300.jpg', 4, 1, '', ''),
(107, 'France/4_DSC06467_1300.jpg', 4, 1, '', ''),
(108, 'France/5_D71_1644_1300.jpg', 4, 1, '', ''),
(109, 'France/5_D71_1730_1300.jpg', 4, 1, '', ''),
(110, 'France/5_DC8_4538_1300.jpg', 4, 1, '', ''),
(111, 'France/5_DSC05527_1300.jpg', 4, 1, '', ''),
(112, 'France/6_D71_1702_1300.jpg', 4, 1, '', ''),
(113, 'France/6_D71_1855_1300.jpg', 4, 1, '', ''),
(114, 'France/6_DSC06777_1300.jpg', 4, 1, '', ''),
(115, 'France/7_D71_1742_1300.jpg', 4, 1, '', ''),
(116, 'France/7_D71_1939_1300.jpg', 4, 1, '', ''),
(117, 'France/8_D71_1845_1300.jpg', 4, 1, '', ''),
(118, 'France/8_D71_1953_1300.jpg', 4, 1, '', ''),
(119, 'France/9_D71_1966_1300.jpg', 4, 1, '', ''),
(120, 'France/9_D71_2076_1300.jpg', 4, 1, '', ''),
(121, 'India/D71_2851_1a.jpg', 5, 0, '', ''),
(122, 'India/D71_8982_1a.jpg', 5, 0, '', ''),
(123, 'India/D71_9084_1a.jpg', 5, 0, '', ''),
(124, 'India/D71_9368_1a.jpg', 5, 0, '', ''),
(125, 'India/D71_9793_1a.jpg', 5, 0, '', ''),
(126, 'India/DSC_7972_1b.jpg', 5, 0, '', ''),
(127, 'India/DSC_7989_1b.jpg', 5, 0, '', ''),
(128, 'India/SAM_0507_950_1a.jpg', 5, 0, '', ''),
(129, 'Israel/1_D71_5731_1300.jpg', 6, 0, '', ''),
(130, 'Israel/1_D72_1179_1300.jpg', 6, 0, '', ''),
(131, 'Israel/10_D71_5285_1300.jpg', 6, 0, '', ''),
(132, 'Israel/11_D71_4010_1300.jpg', 6, 0, '', ''),
(133, 'Israel/2_D71_3406_1300.jpg', 6, 0, '', ''),
(134, 'Israel/2_D71_6980_1300.jpg', 6, 0, '', ''),
(135, 'Israel/3_D71_7254_1300.jpg', 6, 0, '', ''),
(136, 'Israel/3_D72_3152_1300.jpg', 6, 0, '', ''),
(137, 'Israel/4_D71_5237_1300.jpg', 6, 0, '', ''),
(138, 'Israel/4_DC8_6433_1300.jpg', 6, 0, '', ''),
(139, 'Israel/5_DC8_6450_1300.jpg', 6, 0, '', ''),
(140, 'Israel/6_D72_0079_1300.jpg', 6, 0, '', ''),
(141, 'Israel/7_D71_3979_1300.jpg', 6, 0, '', ''),
(142, 'Israel/8_D71_3974_1300.jpg', 6, 0, '', ''),
(143, 'Israel/9_D71_5303_1300.jpg', 6, 0, '', ''),
(144, 'Italy/1_DC8_4168_1300.jpg', 7, 1, '', ''),
(145, 'Italy/1_DSC_6425_1300.jpg', 7, 1, '', ''),
(146, 'Italy/1_DSC_6816_1300.jpg', 7, 1, '', ''),
(147, 'Italy/1_DSC06822_1300.jpg', 7, 1, '', ''),
(148, 'Italy/10_DC8_4037_1300.jpg', 7, 1, '', ''),
(149, 'Italy/10_DSC_6156_1300.jpg', 7, 1, '', ''),
(150, 'Italy/10_DSC04959_1300.jpg', 7, 1, '', ''),
(151, 'Italy/11_DC8_4058_1300.jpg', 7, 1, '', ''),
(152, 'Italy/11_DSC_6267_1300.jpg', 7, 1, '', ''),
(153, 'Italy/12_DC8_4087_1300.jpg', 7, 1, '', ''),
(154, 'Italy/12_DSC_6293_1300.jpg', 7, 1, '', ''),
(155, 'Italy/13_DC8_4118_1300.jpg', 7, 1, '', ''),
(156, 'Italy/13_DSC_6413_1300.jpg', 7, 1, '', ''),
(157, 'Italy/14_DC8_4132_1300.jpg', 7, 1, '', ''),
(158, 'Italy/14_DSC04635_1300.jpg', 7, 1, '', ''),
(159, 'Italy/15_DC8_4183_1300.jpg', 7, 1, '', ''),
(160, 'Italy/15_DSC04729_1300.jpg', 7, 1, '', ''),
(161, 'Italy/16_DC8_4221_1300.jpg', 7, 1, '', ''),
(162, 'Italy/16_DSC04665_1300.jpg', 7, 1, '', ''),
(163, 'Italy/17_DSC04676_1300.jpg', 7, 1, '', ''),
(164, 'Italy/18_DSC04680_1300.jpg', 7, 1, '', ''),
(165, 'Italy/19_DSC04723_1300.jpg', 7, 1, '', ''),
(166, 'Italy/2_DC8_3924_1300.jpg', 7, 1, '', ''),
(167, 'Italy/2_DSC_6444_1300.jpg', 7, 1, '', ''),
(168, 'Italy/2_DSC_6716_1300.jpg', 7, 1, '', ''),
(169, 'Italy/2_DSC06830_1300.jpg', 7, 1, '', ''),
(170, 'Italy/20_DSC04746_1300.jpg', 7, 1, '', ''),
(171, 'Italy/21_DSC04806_1300.jpg', 7, 1, '', ''),
(172, 'Italy/22_DSC05249_1300.jpg', 7, 1, '', ''),
(173, 'Italy/23_DSC05255_1300.jpg', 7, 1, '', ''),
(174, 'Italy/24_DSC05319_1300.jpg', 7, 1, '', ''),
(175, 'Italy/25_DSC_0025_1300.jpg', 7, 1, '', ''),
(176, 'Italy/26_DSC04589_1300.jpg', 7, 1, '', ''),
(177, 'Italy/3_DC8_3939_1300.jpg', 7, 1, '', ''),
(178, 'Italy/3_DSC_6454_1300.jpg', 7, 1, '', ''),
(179, 'Italy/3_DSC_6724_1300.jpg', 7, 1, '', ''),
(180, 'Italy/3_DSC06835_1300.jpg', 7, 1, '', ''),
(181, 'Italy/4_DC8_3959_1300.jpg', 7, 1, '', ''),
(182, 'Italy/4_DSC_3970_1300.jpg', 7, 1, '', ''),
(183, 'Italy/4_DSC_6639_1300.jpg', 7, 1, '', ''),
(184, 'Italy/4_DSC04591_1300.jpg', 7, 1, '', ''),
(185, 'Italy/5_DC8_3960_1300.jpg', 7, 1, '', ''),
(186, 'Italy/5_DSC_6663_1300.jpg', 7, 1, '', ''),
(187, 'Italy/5_DSC04621_1300.jpg', 7, 1, '', ''),
(188, 'Italy/6_DC8_3969_1300.jpg', 7, 1, '', ''),
(189, 'Italy/6_DSC04593_1300.jpg', 7, 1, '', ''),
(190, 'Italy/6_DSC04892_1300.jpg', 7, 1, '', ''),
(191, 'Italy/7_DC8_4018_1300.jpg', 7, 1, '', ''),
(192, 'Italy/7_DSC_6375_1300.jpg', 7, 1, '', ''),
(193, 'Italy/7_DSC04895_1300.jpg', 7, 1, '', ''),
(194, 'Italy/8_DC8_4027_1300.jpg', 7, 1, '', ''),
(195, 'Italy/8_DSC_6398_1300.jpg', 7, 1, '', ''),
(196, 'Italy/8_DSC04926_1300.jpg', 7, 1, '', ''),
(197, 'Italy/9_DC8_4029_1300.jpg', 7, 1, '', ''),
(198, 'Italy/9_DSC04821_1300.jpg', 7, 1, '', ''),
(199, 'Italy/9_DSC04950_1300.jpg', 7, 1, '', ''),
(200, 'Italy/IMG_0095.jpg', 7, 1, '', ''),
(201, 'Marocco/1_DSC_2941_1300.jpg', 8, 0, '', ''),
(202, 'Marocco/10_DC4_5435_1300.jpg', 8, 0, '', ''),
(203, 'Marocco/11_DSC_3726_1300.jpg', 8, 0, '', ''),
(204, 'Marocco/12_DSC_3661_1300.jpg', 8, 0, '', ''),
(205, 'Marocco/13_DC4_5774_1300.jpg', 8, 0, '', ''),
(206, 'Marocco/14_DC8_9460_1300.jpg', 8, 0, '', ''),
(207, 'Marocco/15_DSC_8397_1300.jpg', 8, 0, '', ''),
(208, 'Marocco/16_DC8_8367_1300.jpg', 8, 0, '', ''),
(209, 'Marocco/17_DC4_1717_1300.jpg', 8, 0, '', ''),
(210, 'Marocco/18_DSC_3293_1300.jpg', 8, 0, '', ''),
(211, 'Marocco/19_DC4_5669_1300.jpg', 8, 0, '', ''),
(212, 'Marocco/2_DSC_2466_1300.jpg', 8, 0, '', ''),
(213, 'Marocco/20_DC4_5678_1300.jpg', 8, 0, '', ''),
(214, 'Marocco/21_DSC_7650_1300.jpg', 8, 0, '', ''),
(215, 'Marocco/22_DC4_1211_1300.jpg', 8, 0, '', ''),
(216, 'Marocco/24_DC8_8583_1300.jpg', 8, 0, '', ''),
(217, 'Marocco/25_DC8_8539_1300.jpg', 8, 0, '', ''),
(218, 'Marocco/26_DC8_8662_1300.jpg', 8, 0, '', ''),
(219, 'Marocco/27_DSC_3237_1300.jpg', 8, 0, '', ''),
(220, 'Marocco/3_DSC_3059_1300.jpg', 8, 0, '', ''),
(221, 'Marocco/4_DC4_7421_1300.jpg', 8, 0, '', ''),
(222, 'Marocco/5_DC4_5306_1300.jpg', 8, 0, '', ''),
(223, 'Marocco/6_DC4_5219_1300.jpg', 8, 0, '', ''),
(224, 'Marocco/7_DC8_8760_1300.jpg', 8, 0, '', ''),
(225, 'Marocco/8_DC8_8688_1300.jpg', 8, 0, '', ''),
(226, 'Marocco/9_DC8_6452_1300.jpg', 8, 0, '', ''),
(227, 'Myanmar/1_D72_5640_1300.jpg', 9, 0, '', ''),
(228, 'Myanmar/1_D72_5803_1300.jpg', 9, 0, '', ''),
(229, 'Myanmar/1_D72_7637_1300.jpg', 9, 0, '', ''),
(230, 'Myanmar/1_DC4_8261_1300.jpg', 9, 0, '', ''),
(231, 'Myanmar/1_DSC_6006_1300.jpg', 9, 0, '', ''),
(232, 'Myanmar/1_DSC_8746_1300.jpg', 9, 0, '', ''),
(233, 'Myanmar/10_D71_0718_1300.jpg', 9, 0, '', ''),
(234, 'Myanmar/10_DSC_0992_1300.jpg', 9, 0, '', ''),
(235, 'Myanmar/11_D71_0735_1300.jpg', 9, 0, '', ''),
(236, 'Myanmar/11_DSC_9922_1300.jpg', 9, 0, '', ''),
(237, 'Myanmar/12_D72_5746_1300.jpg', 9, 0, '', ''),
(238, 'Myanmar/12_DC8_8112_1300.jpg', 9, 0, '', ''),
(239, 'Myanmar/13_D71_0678_1300.jpg', 9, 0, '', ''),
(240, 'Myanmar/13_D71_1691_1300.jpg', 9, 0, '', ''),
(241, 'Myanmar/14_D71_7695_1300.jpg', 9, 0, '', ''),
(242, 'Myanmar/14_DC8_8098_1300.jpg', 9, 0, '', ''),
(243, 'Myanmar/15_D71_0626_1300.jpg', 9, 0, '', ''),
(244, 'Myanmar/15_D71_7697_1300.jpg', 9, 0, '', ''),
(245, 'Myanmar/16_DSC_1737_1300.jpg', 9, 0, '', ''),
(246, 'Myanmar/17_DSC_1823_1300.jpg', 9, 0, '', ''),
(247, 'Myanmar/2_D71_9651_1300.jpg', 9, 0, '', ''),
(248, 'Myanmar/2_DC8_6105_1300.jpg', 9, 0, '', ''),
(249, 'Myanmar/2_DC8_8037_1300.jpg', 9, 0, '', ''),
(250, 'Myanmar/2_DSC_7553_1300.jpg', 9, 0, '', ''),
(251, 'Myanmar/2_DSC_8859_1300.jpg', 9, 0, '', ''),
(252, 'Myanmar/2_DSC_9088_1300.jpg', 9, 0, '', ''),
(253, 'Myanmar/3_D71_9662_1300.jpg', 9, 0, '', ''),
(254, 'Myanmar/3_DC4_6784_1300.jpg', 9, 0, '', ''),
(255, 'Myanmar/3_DSC_5947_1300.jpg', 9, 0, '', ''),
(256, 'Myanmar/3_DSC_8812_1300.jpg', 9, 0, '', ''),
(257, 'Myanmar/3_DSC_9369_1300.jpg', 9, 0, '', ''),
(258, 'Myanmar/3_DSC_9781_1300.jpg', 9, 0, '', ''),
(259, 'Myanmar/4_D71_9846_1300.jpg', 9, 0, '', ''),
(260, 'Myanmar/4_DC4_6818_1300.jpg', 9, 0, '', ''),
(261, 'Myanmar/4_DC4_7328_1300.jpg', 9, 0, '', ''),
(262, 'Myanmar/4_DSC_0411_1300.jpg', 9, 0, '', ''),
(263, 'Myanmar/4_DSC_0844_1300.jpg', 9, 0, '', ''),
(264, 'Myanmar/4_DSC_5988_1300.jpg', 9, 0, '', ''),
(265, 'Myanmar/5_D71_0676_1300.jpg', 9, 0, '', ''),
(266, 'Myanmar/5_D71_9853_1300.jpg', 9, 0, '', ''),
(267, 'Myanmar/5_DC4_6823_1300.jpg', 9, 0, '', ''),
(268, 'Myanmar/5_DC4_7329_1300.jpg', 9, 0, '', ''),
(269, 'Myanmar/5_DSC_6119_1300.jpg', 9, 0, '', ''),
(270, 'Myanmar/5_DSC_9557_1300.jpg', 9, 0, '', ''),
(271, 'Myanmar/6_D71_0592_1300.jpg', 9, 0, '', ''),
(272, 'Myanmar/6_D71_1344_1300.jpg', 9, 0, '', ''),
(273, 'Myanmar/6_D71_9887_1300.jpg', 9, 0, '', ''),
(274, 'Myanmar/6_DC4_6788_1300.jpg', 9, 0, '', ''),
(275, 'Myanmar/6_DSC_0589_1300.jpg', 9, 0, '', ''),
(276, 'Myanmar/6_DSC_6124_1300.jpg', 9, 0, '', ''),
(277, 'Myanmar/7_D71_1355_1300.jpg', 9, 0, '', ''),
(278, 'Myanmar/7_D71_9909_1300.jpg', 9, 0, '', ''),
(279, 'Myanmar/7_DSC_0566_1300.jpg', 9, 0, '', ''),
(280, 'Myanmar/7_DSC_6157_1300.jpg', 9, 0, '', ''),
(281, 'Myanmar/7_DSC_7907_1300.jpg', 9, 0, '', ''),
(282, 'Myanmar/8_D71_1385_1300.jpg', 9, 0, '', ''),
(283, 'Myanmar/8_DSC_0694_1300.jpg', 9, 0, '', ''),
(284, 'Myanmar/8_DSC_5628_1300.jpg', 9, 0, '', ''),
(285, 'Myanmar/8_DSC_9475_1300.jpg', 9, 0, '', ''),
(286, 'Myanmar/9_D71_0766_1300.jpg', 9, 0, '', ''),
(287, 'Myanmar/9_DSC_5664_1300.jpg', 9, 0, '', ''),
(288, 'Myanmar/9_DSC_9071_1300.jpg', 9, 0, '', ''),
(289, 'Myanmar/9_DSC_9512_1300.jpg', 9, 0, '', ''),
(290, 'Namibia/DC4_0681_1300_1300.jpg', 10, 0, '', ''),
(291, 'Namibia/DC4_0697_1300_1300.jpg', 10, 0, '', ''),
(292, 'Namibia/DC4_0737_1300_1300.jpg', 10, 0, '', ''),
(293, 'Namibia/DC4_0881_1300_1300.jpg', 10, 0, '', ''),
(294, 'Namibia/DC4_0890_1300_1300.jpg', 10, 0, '', ''),
(295, 'Namibia/DC4_0890-Zoom_1300_1300.jpg', 10, 0, '', ''),
(296, 'Namibia/DC4_0986_1300_1300.jpg', 10, 0, '', ''),
(297, 'Namibia/DC4_1257_1300_1300.jpg', 10, 0, '', ''),
(298, 'Namibia/DC4_1258_1300_1300.jpg', 10, 0, '', ''),
(299, 'Namibia/DC4_1259_1300_1300.jpg', 10, 0, '', ''),
(300, 'Namibia/DC4_1534_3_1300_1300.jpg', 10, 0, '', ''),
(301, 'Namibia/DC4_1771_1300_1300.jpg', 10, 0, '', ''),
(302, 'Namibia/DC4_2039_1300_1300.jpg', 10, 0, '', ''),
(303, 'Namibia/DC4_2065_1300_1300.jpg', 10, 0, '', ''),
(304, 'Namibia/DC4_2085_1300_1300.jpg', 10, 0, '', ''),
(305, 'Namibia/DC4_2095_1300_1300.jpg', 10, 0, '', ''),
(306, 'Namibia/DC4_8693_1300_1300.jpg', 10, 0, '', ''),
(307, 'Namibia/DC4_8923_1300_1300.jpg', 10, 0, '', ''),
(308, 'Namibia/DC4_8998_1300_1300.jpg', 10, 0, '', ''),
(309, 'Namibia/DC4_9233_1300_1300.jpg', 10, 0, '', ''),
(310, 'Namibia/DC4_9926_1300_1300.jpg', 10, 0, '', ''),
(311, 'Namibia/DC8_0146_1300_1300.jpg', 10, 0, '', ''),
(312, 'Namibia/DC8_0165_1300_1300.jpg', 10, 0, '', ''),
(313, 'Namibia/DC8_0194_1300_1300.jpg', 10, 0, '', ''),
(314, 'Namibia/DC8_0388_1300_1300.jpg', 10, 0, '', ''),
(315, 'Namibia/DC8_0475_1300_1300.jpg', 10, 0, '', ''),
(316, 'Namibia/DC8_0583_1300_1300.jpg', 10, 0, '', ''),
(317, 'Namibia/DC8_0608_1300_1300.jpg', 10, 0, '', ''),
(318, 'Namibia/DC8_0730_1300_1300.jpg', 10, 0, '', ''),
(319, 'Namibia/DC8_0778_1300_1300.jpg', 10, 0, '', ''),
(320, 'Namibia/DC8_1062_1300_1300.jpg', 10, 0, '', ''),
(321, 'Namibia/DC8_1206_1300_1300.jpg', 10, 0, '', ''),
(322, 'Namibia/DC8_1461_1300_1300.jpg', 10, 0, '', ''),
(323, 'Namibia/DC8_1663_1300_1300.jpg', 10, 0, '', ''),
(324, 'Namibia/DC8_1665_1300_1300.jpg', 10, 0, '', ''),
(325, 'Namibia/DC8_1765_1300_1300.jpg', 10, 0, '', ''),
(326, 'Namibia/DC8_1903_1300_1300.jpg', 10, 0, '', ''),
(327, 'Namibia/DC8_1911_1300_1300.jpg', 10, 0, '', ''),
(328, 'Namibia/DC8_1929_1300_1300.jpg', 10, 0, '', ''),
(329, 'Namibia/DC8_1938_Large_1300_1300.jpg', 10, 0, '', ''),
(330, 'Namibia/DC8_1981_1300_1300.jpg', 10, 0, '', ''),
(331, 'Namibia/DC8_1985_1300_1300.jpg', 10, 0, '', ''),
(332, 'Namibia/DC8_1991_1300_1300.jpg', 10, 0, '', ''),
(333, 'Namibia/DC8_2047_1300_1300.jpg', 10, 0, '', ''),
(334, 'Namibia/DC8_2062_1300_1300.jpg', 10, 0, '', ''),
(335, 'Namibia/DC8_2246_1300_1300.jpg', 10, 0, '', ''),
(336, 'Namibia/DC8_2307_1300_1300.jpg', 10, 0, '', ''),
(337, 'Namibia/DC8_2873_1300_1300.jpg', 10, 0, '', ''),
(338, 'Namibia/DC8_3224_1300_1300.jpg', 10, 0, '', ''),
(339, 'Namibia/DSC_3871_1300_1300.jpg', 10, 0, '', ''),
(340, 'Nepal/80652544_1300_100_Crop_1300.jpg', 11, 1, '', ''),
(341, 'Nepal/80652544_1300_1300.jpg', 11, 1, '', ''),
(342, 'Nepal/D323005_1_1300_1300.jpg', 11, 1, '', ''),
(343, 'Nepal/D324063_1300_1300.jpg', 11, 1, '', ''),
(344, 'Nepal/D71_1287_1300_1300.jpg', 11, 1, '', ''),
(345, 'Nepal/D71_2161_1300_1300.jpg', 11, 1, '', ''),
(346, 'Nepal/D71_2229_1300_1300.jpg', 11, 1, '', ''),
(347, 'Nepal/D71_2238_1300_1300.jpg', 11, 1, '', ''),
(348, 'Nepal/D71_2255_1300_1300.jpg', 11, 1, '', ''),
(349, 'Nepal/D71_2273_1300_1300.jpg', 11, 1, '', ''),
(350, 'Nepal/D71_2329_1300_1300.jpg', 11, 1, '', ''),
(351, 'Nepal/D71_2369_1300_1300.jpg', 11, 1, '', ''),
(352, 'Nepal/D71_2417_1300_1300.jpg', 11, 1, '', ''),
(353, 'Nepal/D71_2670_1300_1300.jpg', 11, 1, '', ''),
(354, 'Nepal/D71_2928_1300_1300.jpg', 11, 1, '', ''),
(355, 'Nepal/D71_3018_1300_1300.jpg', 11, 1, '', ''),
(356, 'Nepal/D71_3028_1300_1300.jpg', 11, 1, '', ''),
(357, 'Nepal/D71_3044_1300_1300.jpg', 11, 1, '', ''),
(358, 'Nepal/D71_3179_1300_1300.jpg', 11, 1, '', ''),
(359, 'Nepal/D71_3254_1300_1300.jpg', 11, 1, '', ''),
(360, 'Nepal/D71_3287_1300_1300.jpg', 11, 1, '', ''),
(361, 'Nepal/D71_5827_1300_1300.jpg', 11, 1, '', ''),
(362, 'Nepal/D71_7297_1300_1300.jpg', 11, 1, '', ''),
(363, 'Nepal/D71_7765_1300_1300.jpg', 11, 1, '', ''),
(364, 'Nepal/D71_7931_1300_1300.jpg', 11, 1, '', ''),
(365, 'Nepal/D71_7949_1300_1300.jpg', 11, 1, '', ''),
(366, 'Nepal/D71_9040_1300_1300.jpg', 11, 1, '', ''),
(367, 'Nepal/D71_9447_1300_1300.jpg', 11, 1, '', ''),
(368, 'Nepal/D71_9455_1300_1300.jpg', 11, 1, '', ''),
(369, 'Nepal/D71_9456_1300_1300.jpg', 11, 1, '', ''),
(370, 'Nepal/D72_0363_1300_1300.jpg', 11, 1, '', ''),
(371, 'Nepal/D72_0548_1300_1300.jpg', 11, 1, '', ''),
(372, 'Nepal/D72_1143_1300_1300.jpg', 11, 1, '', ''),
(373, 'Nepal/D72_1259_1300_1300.jpg', 11, 1, '', ''),
(374, 'Nepal/DC4_3344_1300_1300.jpg', 11, 1, '', ''),
(375, 'Nepal/DC4_3655_1300_1300.jpg', 11, 1, '', ''),
(376, 'Nepal/DC4_3820_1300_1300.jpg', 11, 1, '', ''),
(377, 'Nepal/DC4_3843_1300_1300.jpg', 11, 1, '', ''),
(378, 'Nepal/DC4_8014_1300_1300.jpg', 11, 1, '', ''),
(379, 'Nepal/DC4_8668_1300_1300.jpg', 11, 1, '', ''),
(380, 'Nepal/DC4_8710_1300_1300.jpg', 11, 1, '', ''),
(381, 'Nepal/DC4_8715_1300_1300.jpg', 11, 1, '', ''),
(382, 'Nepal/DC4_8997_1300_1300.jpg', 11, 1, '', ''),
(383, 'Nepal/DC4_9130_1300_1300.jpg', 11, 1, '', ''),
(384, 'Nepal/DC4_9144_1300_1300.jpg', 11, 1, '', ''),
(385, 'Nepal/DC4_9281_1300_1300.jpg', 11, 1, '', ''),
(386, 'Nepal/DC4_9282_1300_1300.jpg', 11, 1, '', ''),
(387, 'Nepal/DC4_9475_1300_1300.jpg', 11, 1, '', ''),
(388, 'Nepal/DC4_9513_1300_1300.jpg', 11, 1, '', ''),
(389, 'Nepal/DC8_1801_1300_1300.jpg', 11, 1, '', ''),
(390, 'Nepal/DC8_1884_1300_1300.jpg', 11, 1, '', ''),
(391, 'Nepal/DC8_3933_1300_1300.jpg', 11, 1, '', ''),
(392, 'Nepal/DC8_4028_1300_1300.jpg', 11, 1, '', ''),
(393, 'Nepal/DC8_4065_1300_1300.jpg', 11, 1, '', ''),
(394, 'Nepal/DC8_9645_1300_1300.jpg', 11, 1, '', ''),
(395, 'Nepal/DC8_9659_1300_1300.jpg', 11, 1, '', ''),
(396, 'Nepal/DC8_9767_1300_1300.jpg', 11, 1, '', ''),
(397, 'Nepal/DC8_9807_1300_1300.jpg', 11, 1, '', ''),
(398, 'Nepal/DSC_0340_1300_1300.jpg', 11, 1, '', ''),
(399, 'Nepal/DSC_0350_1300_1300.jpg', 11, 1, '', ''),
(400, 'Nepal/DSC_0644_1300_1300.jpg', 11, 1, '', ''),
(401, 'Nepal/DSC_0655_1300_1300.jpg', 11, 1, '', ''),
(402, 'Nepal/DSC_0671_1300_1300.jpg', 11, 1, '', ''),
(403, 'Nepal/DSC_0761_1300_1300.jpg', 11, 1, '', ''),
(404, 'Nepal/DSC_0782_1300_1300.jpg', 11, 1, '', ''),
(405, 'Nepal/DSC_0786_1300_1300.jpg', 11, 1, '', ''),
(406, 'Nepal/DSC_0801_1300_1300.jpg', 11, 1, '', ''),
(407, 'Nepal/DSC_0833_1300_1300.jpg', 11, 1, '', ''),
(408, 'Nepal/DSC_0951_1300_1300.jpg', 11, 1, '', ''),
(409, 'Nepal/DSC_1521_1300_1300.jpg', 11, 1, '', ''),
(410, 'Nepal/DSC_1524_1300_1300.jpg', 11, 1, '', ''),
(411, 'Nepal/DSC_1582_1300_1300.jpg', 11, 1, '', ''),
(412, 'Nepal/DSC_1742_1300_1300.jpg', 11, 1, '', ''),
(413, 'Nepal/DSC_1881_1300_1300.jpg', 11, 1, '', ''),
(414, 'Nepal/DSC_1911_1300_1300.jpg', 11, 1, '', ''),
(415, 'Nepal/DSC_1920_1300_1300.jpg', 11, 1, '', ''),
(416, 'Nepal/DSC_1959_1300_1300.jpg', 11, 1, '', ''),
(417, 'Nepal/DSC_2060_1300_1300.jpg', 11, 1, '', ''),
(418, 'Nepal/DSC_2147_1300_1300.jpg', 11, 1, '', ''),
(419, 'Nepal/DSC_2166_1300_1300.jpg', 11, 1, '', ''),
(420, 'Nepal/DSC_2277_1300_1300.jpg', 11, 1, '', ''),
(421, 'Nepal/DSC_2291_1300_1300.jpg', 11, 1, '', ''),
(422, 'Nepal/DSC_2456_1300_1300.jpg', 11, 1, '', ''),
(423, 'Nepal/DSC_2572_1300_1300.jpg', 11, 1, '', ''),
(424, 'Nepal/DSC_2597_1300_1300.jpg', 11, 1, '', ''),
(425, 'Nepal/DSC_2646_1300_1300.jpg', 11, 1, '', ''),
(426, 'Nepal/DSC_2654_1300_1300.jpg', 11, 1, '', ''),
(427, 'Nepal/DSC_2684_1300_1300.jpg', 11, 1, '', ''),
(428, 'Nepal/DSC_2710_1300_1300.jpg', 11, 1, '', ''),
(429, 'Nepal/DSC_2801_1300_1300 (1).jpg', 11, 1, '', ''),
(430, 'Nepal/DSC_2801_1300_1300.jpg', 11, 1, '', ''),
(431, 'Nepal/DSC_2821_1300_1300.jpg', 11, 1, '', ''),
(432, 'Nepal/DSC_2868_1300_1300.jpg', 11, 1, '', ''),
(433, 'Nepal/DSC_2944_1300_1300.jpg', 11, 1, '', ''),
(434, 'Nepal/DSC_2948_1300_1300.jpg', 11, 1, '', ''),
(435, 'Nepal/DSC_2951_1300_1300.jpg', 11, 1, '', ''),
(436, 'Nepal/DSC_3085_1300_1300.jpg', 11, 1, '', ''),
(437, 'Nepal/DSC_3344_1300_1300.jpg', 11, 1, '', ''),
(438, 'Nepal/DSC_3386_1300_1300.jpg', 11, 1, '', ''),
(439, 'Nepal/DSC_3390_1300_1300.jpg', 11, 1, '', ''),
(440, 'Nepal/DSC_3583_1300_1300.jpg', 11, 1, '', ''),
(441, 'Nepal/DSC_3651_1300_1300.jpg', 11, 1, '', ''),
(442, 'Nepal/DSC_4786_1300_1300.jpg', 11, 1, '', ''),
(443, 'Nepal/DSC_4900_1300_1300.jpg', 11, 1, '', ''),
(444, 'Nepal/DSC_4913_1300_1300.jpg', 11, 1, '', ''),
(445, 'Nepal/DSC_4951_1300_1300.jpg', 11, 1, '', ''),
(446, 'Nepal/DSC_5693_1300_1300.jpg', 11, 1, '', ''),
(447, 'Nepal/DSC_5859_1300_1300.jpg', 11, 1, '', ''),
(448, 'Nepal/DSC_5930_1300_1300.jpg', 11, 1, '', ''),
(449, 'Nepal/DSC_6134_1300_1300.jpg', 11, 1, '', ''),
(450, 'Nepal/DSC_6173_1300_1300.jpg', 11, 1, '', ''),
(451, 'Nepal/DSC_6278_1300_1300.jpg', 11, 1, '', ''),
(452, 'Nepal/DSC_6413_1300_1300.jpg', 11, 1, '', ''),
(453, 'Nepal/DSC_6589-6597_1300_1300.jpg', 11, 1, '', ''),
(454, 'Nepal/DSC_6668_1300_1300.jpg', 11, 1, '', ''),
(455, 'Nepal/DSC_6886_1300_1300.jpg', 11, 1, '', ''),
(456, 'Nepal/DSC_7090_1300_1300.jpg', 11, 1, '', ''),
(457, 'Nepal/DSC_8314_1300_1300.jpg', 11, 1, '', ''),
(458, 'Nepal/DSC_8344_1300_1300.jpg', 11, 1, '', ''),
(459, 'Nepal/DSC_8389_1300_1300.jpg', 11, 1, '', ''),
(460, 'Nepal/DSC_8412_1300_1300.jpg', 11, 1, '', ''),
(461, 'Nepal/DSC_8427_1300_1300.jpg', 11, 1, '', ''),
(462, 'Nepal/DSC_8478_1300_1300.jpg', 11, 1, '', ''),
(463, 'Nepal/DSC_8703_1300_1300.jpg', 11, 1, '', ''),
(464, 'Nepal/DSC_8888_1300_1300.jpg', 11, 1, '', ''),
(465, 'Nepal/DSC_9022_1300_1300.jpg', 11, 1, '', ''),
(466, 'Nepal/DSC_9099_1300_1300.jpg', 11, 1, '', ''),
(467, 'Nepal/DSC_9161_1300_1300.jpg', 11, 1, '', ''),
(468, 'Nepal/DSC_9174_1300_1300.jpg', 11, 1, '', ''),
(469, 'Nepal/DSC_9253_1300_1300.jpg', 11, 1, '', ''),
(470, 'Nepal/DSC_9256_1300_1300.jpg', 11, 1, '', ''),
(471, 'Nepal/DSC_9257_1300_1300.jpg', 11, 1, '', ''),
(472, 'Nepal/DSC_9275_1300_1300.jpg', 11, 1, '', ''),
(473, 'Nepal/DSC_9316-20-12-12_1300_1300_1300.jpg', 11, 1, '', ''),
(474, 'Nepal/DSC_9437_1300_1300.jpg', 11, 1, '', ''),
(475, 'Nepal/DSC_9480_1300_1300.jpg', 11, 1, '', ''),
(476, 'Nepal/DSC_9485_1300_1300.jpg', 11, 1, '', ''),
(477, 'Nepal/DSC_9560_1300_1300.jpg', 11, 1, '', ''),
(478, 'Nepal/DSC_9619_1300_1300.jpg', 11, 1, '', ''),
(479, 'Nepal/DSC_9791_1300_1300.jpg', 11, 1, '', ''),
(480, 'Nepal/DSC00417_1300_1300.jpg', 11, 1, '', ''),
(481, 'Nepal/DSC00420_1300_1300.jpg', 11, 1, '', ''),
(482, 'Nepal/DSC00431_1300_1300.jpg', 11, 1, '', ''),
(483, 'Nepal/DSC00460_1300_1300.jpg', 11, 1, '', ''),
(484, 'Nepal/DSC00710_1300_1300.jpg', 11, 1, '', ''),
(485, 'Nepal/DSC01066_1300_1300.jpg', 11, 1, '', ''),
(486, 'Nepal/DSC01194_1300_1300.jpg', 11, 1, '', ''),
(487, 'Nepal/DSC01347_1300_1300.jpg', 11, 1, '', ''),
(488, 'Nepal/DSC01357_1300_1300.jpg', 11, 1, '', ''),
(489, 'Nepal/DSC01370_1300_1300.jpg', 11, 1, '', ''),
(490, 'Nepal/DSC01376_1300_1300.jpg', 11, 1, '', ''),
(491, 'Nepal/DSC01425_1300_1300.jpg', 11, 1, '', ''),
(492, 'Nepal/DSC01716_1300_1300.jpg', 11, 1, '', ''),
(493, 'Nepal/DSC04010_1300_1300.jpg', 11, 1, '', ''),
(494, 'Nepal/DSC04019_1300_1300.jpg', 11, 1, '', ''),
(495, 'Nepal/DSC04202_1300_1300.jpg', 11, 1, '', ''),
(496, 'Nepal/DSC04284_1300_1300.jpg', 11, 1, '', ''),
(497, 'Nepal/DSC04438-45_1300_1_1300.jpg', 11, 1, '', ''),
(498, 'Nepal/DSC04438-45_1300_2_1300.jpg', 11, 1, '', ''),
(499, 'Nepal/DSC04438-45_1300_3_1300.jpg', 11, 1, '', ''),
(500, 'Nepal/DSC04438-45_1300_4_1300.jpg', 11, 1, '', ''),
(501, 'Nepal/DSC04438-45_1300_6_1300.jpg', 11, 1, '', ''),
(502, 'Nepal/DSC04438-45_1300_7_1300.jpg', 11, 1, '', ''),
(503, 'Nepal/ISO_25600_Sample_35mm_1300_1300.jpg', 11, 1, '', ''),
(504, 'Nepal/Sadhu_1300_1300.jpg', 11, 1, '', ''),
(505, 'Tibet/1_DSC_4565_1300.jpg', 12, 1, '', ''),
(506, 'Tibet/10_DSC_6008_1300.jpg', 12, 1, '', ''),
(507, 'Tibet/11_DSC_6793_1300.jpg', 12, 1, '', ''),
(508, 'Tibet/12_DSC_2851_1300.jpg', 12, 1, '', ''),
(509, 'Tibet/13_DSC_2862_1300.jpg', 12, 1, '', ''),
(510, 'Tibet/14_DSC_4974_1300.jpg', 12, 1, '', ''),
(511, 'Tibet/15_DSC_4997_1300.jpg', 12, 1, '', ''),
(512, 'Tibet/16_DSC_5004_1300.jpg', 12, 1, '', ''),
(513, 'Tibet/17_DSC_5052_1300.jpg', 12, 1, '', ''),
(514, 'Tibet/18_DSC_5070_1300.jpg', 12, 1, '', ''),
(515, 'Tibet/19_DSC_5188_1300.jpg', 12, 1, '', ''),
(516, 'Tibet/2_DSC_3017_1300.jpg', 12, 1, '', ''),
(517, 'Tibet/20_DSC_5088_1300.jpg', 12, 1, '', ''),
(518, 'Tibet/21_DSC_5254_1300.jpg', 12, 1, '', ''),
(519, 'Tibet/22_DSC_7071_1300.jpg', 12, 1, '', ''),
(520, 'Tibet/23_DSC_6410_1300.jpg', 12, 1, '', ''),
(521, 'Tibet/24_DSC_5308_1300.jpg', 12, 1, '', ''),
(522, 'Tibet/25_DSC_5380_1300.jpg', 12, 1, '', ''),
(523, 'Tibet/26_DSC_4117_1300.jpg', 12, 1, '', ''),
(524, 'Tibet/27_DSC_4179_1300.jpg', 12, 1, '', ''),
(525, 'Tibet/28_DSC_5149_1300.jpg', 12, 1, '', ''),
(526, 'Tibet/29_DSC_5134_1300.jpg', 12, 1, '', ''),
(527, 'Tibet/3_DSC_2928_1300.jpg', 12, 1, '', ''),
(528, 'Tibet/30_DSC_1255_1300.jpg', 12, 1, '', ''),
(529, 'Tibet/31_DSC_4872_1300.jpg', 12, 1, '', ''),
(530, 'Tibet/32_DSC_4630_1300.jpg', 12, 1, '', ''),
(531, 'Tibet/33_DSC_6783_1300.jpg', 12, 1, '', ''),
(532, 'Tibet/34_DSC_5410_1300.jpg', 12, 1, '', ''),
(533, 'Tibet/35_DSC_5864_1300.jpg', 12, 1, '', ''),
(534, 'Tibet/36_DSC_3439_1300.jpg', 12, 1, '', ''),
(535, 'Tibet/37_DC8_2121_1300_1.jpg', 12, 1, '', ''),
(536, 'Tibet/38_DC8_2121_1300_2.jpg', 12, 1, '', ''),
(537, 'Tibet/39_DSC_5666_1300.jpg', 12, 1, '', ''),
(538, 'Tibet/4_DSC_2930_1300.jpg', 12, 1, '', ''),
(539, 'Tibet/40_DSC_6100_1300.jpg', 12, 1, '', ''),
(540, 'Tibet/41_DSC_5674_1300.jpg', 12, 1, '', ''),
(541, 'Tibet/42_DSC_6251_1300.jpg', 12, 1, '', ''),
(542, 'Tibet/43_DSC_3624_1300.jpg', 12, 1, '', ''),
(543, 'Tibet/44_DSC_6452_1300.jpg', 12, 1, '', ''),
(544, 'Tibet/45_DSC_6610_1300.jpg', 12, 1, '', ''),
(545, 'Tibet/46_DSC_7302_1300.jpg', 12, 1, '', ''),
(546, 'Tibet/47_DC4_2918_1300.jpg', 12, 1, '', ''),
(547, 'Tibet/48_DC4_2727_1300.jpg', 12, 1, '', ''),
(548, 'Tibet/49_DSC_3266_1300.jpg', 12, 1, '', ''),
(549, 'Tibet/5_DSC_4864_1300.jpg', 12, 1, '', ''),
(550, 'Tibet/50_DSC_6566_1300.jpg', 12, 1, '', ''),
(551, 'Tibet/51_D71_7462_1300.jpg', 12, 1, '', ''),
(552, 'Tibet/52_DC4_8379_1300.jpg', 12, 1, '', ''),
(553, 'Tibet/6_DC4_1197_1300.jpg', 12, 1, '', ''),
(554, 'Tibet/7_DSC_2773_1300.jpg', 12, 1, '', ''),
(555, 'Tibet/8_DSC_6050_1300.jpg', 12, 1, '', ''),
(556, 'Tibet/9_DSC_4766_1300.jpg', 12, 1, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE IF NOT EXISTS `requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tour_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `application` text NOT NULL,
  `date` datetime NOT NULL,
  `status` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Requests_fk0` (`tour_id`),
  KEY `Requests_fk1` (`status`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `tour_id`, `name`, `email`, `application`, `date`, `status`) VALUES
(1, 1, '', '@@@', 'want', '2016-04-21 16:09:56', 1),
(2, 1, '', '', '', '2016-04-21 16:32:02', 1),
(3, 1, '', '', '', '2016-04-21 16:32:35', 1),
(4, 1, 'Дмитрий', 'sdimas-best@mail.ru', 'Hello!', '2016-04-21 16:36:04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `request_statuses`
--

CREATE TABLE IF NOT EXISTS `request_statuses` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `status` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `request_statuses`
--

INSERT INTO `request_statuses` (`id`, `status`) VALUES
(1, 'Новая'),
(2, 'Принятая'),
(3, 'Отклоненная');

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE IF NOT EXISTS `tours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` text NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `cost` int(11) NOT NULL,
  `places` tinyint(4) NOT NULL,
  `complexity` tinyint(4) NOT NULL,
  `longitude` varchar(25) NOT NULL,
  `latitude` varchar(25) NOT NULL,
  `inclusive` text NOT NULL,
  `not_inclusive` text NOT NULL,
  `img` text NOT NULL,
  `schedule` text NOT NULL,
  `cover` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`id`, `title`, `desc`, `startDate`, `endDate`, `cost`, `places`, `complexity`, `longitude`, `latitude`, `inclusive`, `not_inclusive`, `img`, `schedule`, `cover`) VALUES
(1, 'Непал. Сердце долины Катманду', 'Друзья, в начале апреля мы повторяем наш традиционный "жанровый" мастер-класс в Катманду, но с небольшими корректировками по программе (учитывая землетрясения 2015 года). В программе по-прежнему предлагается проход по лучшим фото-местам, помощь новичкам и базовое обучение с разбором отснятого материала: долина Катманду, Нагаркот, Бхактапур, джунгли Читвана; уцелевшие храмовые комплексы и повседневная жизнь непальцев, "зернобабки" на уборке урожая и слоны на рассвете в джунглях… Десять дней плотного погружения в Непал. Эта программа отточена годами работы', '2016-04-22', '2016-04-29', 1000, 12, 2, '27.6666651', '85.3324904', '["завтрак + полный пансион в Читване", "всобой иметь две паспортные фотографии"]', '["перелет до Катманду и обратно", "визовый сбор на прилете в Катманду"]', '{"head":["2.jpg","3.jpg","4.jpg"],"center":["5.jpg","6.jpg "],"footer":["7.jpg","8.jpg","9.jpg","10.jpg"]}', '[{"day":"7 апреля. 1 день","schedule":["Прилет в Катманду. Встреча в аэропорту. Размещение в отеле."]},{"day":"8 апреля. 2 день","schedule":["Утренний Катманду: Дурбар, Тамель, храмы и старый город","Храмовый комплекс Сваямбуднах (жанровая + закатная съемка)"]}]', '1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `Photos_fk0` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`);

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `Requests_fk1` FOREIGN KEY (`status`) REFERENCES `request_statuses` (`id`),
  ADD CONSTRAINT `Requests_fk0` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
