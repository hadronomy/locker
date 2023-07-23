CREATE TABLE `smart_lock` (
	`id` varchar(256) PRIMARY KEY NOT NULL,
	`name` varchar(256) NOT NULL,
	`description` varchar(256) NOT NULL,
	`locked` boolean NOT NULL DEFAULT false,
	`owner` varchar(256) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP
);
