CREATE TABLE `Tours` (
	`id` int NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`desc` TEXT NOT NULL,
	`startDate` DATE NOT NULL,
	`endDate` DATE NOT NULL,
	`cost` int NOT NULL,
	`places` tinyint NOT NULL,
	`complexity` tinyint NOT NULL,
	`longitude` varchar(25) NOT NULL,
	`latitude` varchar(25) NOT NULL,
	`inclusive` TEXT NOT NULL,
	`not_inclusive` TEXT NOT NULL,
	`img` TEXT NOT NULL,
	`schedule` TEXT NOT NULL,
	PRIMARY KEY (`id`)
);
