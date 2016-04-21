
CREATE TABLE `Requests` (
	`id` int NOT NULL AUTO_INCREMENT,
	`tour_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`application` TEXT NOT NULL,
	`date` DATETIME NOT NULL,
	`status` tinyint NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Request_statuses` (
	`id` tinyint NOT NULL AUTO_INCREMENT,
	`status` varchar(30) NOT NULL,
	PRIMARY KEY (`id`)
);


ALTER TABLE `Requests` ADD CONSTRAINT `Requests_fk0` FOREIGN KEY (`tour_id`) REFERENCES `Tours`(`id`);

ALTER TABLE `Requests` ADD CONSTRAINT `Requests_fk1` FOREIGN KEY (`status`) REFERENCES `Request_statuses`(`id`);
