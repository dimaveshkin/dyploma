-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2016 at 11:38 AM
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
(1, 'Непал. Сердце долины Катманду', 'Друзья, в начале апреля мы повторяем наш традиционный "жанровый" мастер-класс в Катманду, но с небольшими корректировками по программе (учитывая землетрясения 2015 года). В программе по-прежнему предлагается проход по лучшим фото-местам, помощь новичкам и базовое обучение с разбором отснятого материала: долина Катманду, Нагаркот, Бхактапур, джунгли Читвана; уцелевшие храмовые комплексы и повседневная жизнь непальцев, "зернобабки" на уборке урожая и слоны на рассвете в джунглях… Десять дней плотного погружения в Непал. Эта программа отточена годами работы', '2016-04-07', '2016-04-17', 1000, 12, 2, '27.6666651', '85.3324904', '["завтрак + полный пансион в Читване", "всобой иметь две паспортные фотографии"]', '["перелет до Катманду и обратно", "визовый сбор на прилете в Катманду"]', '{"head":["2.jpg","3.jpg","4.jpg"],"center":["5.jpg","6.jpg "],"footer":["7.jpg","8.jpg","9.jpg","10.jpg"]}', '[{"day":"7 апреля. 1 день","schedule":["Прилет в Катманду. Встреча в аэропорту. Размещение в отеле."]},{"day":"8 апреля. 2 день","schedule":["Утренний Катманду: Дурбар, Тамель, храмы и старый город","Храмовый комплекс Сваямбуднах (жанровая + закатная съемка)"]}]', '1.jpg');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
