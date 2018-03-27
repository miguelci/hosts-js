CREATE DATABASE IF NOT EXISTS `hosts`;
USE `hosts`;

CREATE TABLE `hosts` (
  `id` int(11) AUTO_INCREMENT,
  `name` varchar(50),
  `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4;

CREATE TABLE `properties` (
  `id` int(11) AUTO_INCREMENT,
  `airbnb_id` int(11),
  `numberOfBathrooms` int(2),
  `numberOfBedrooms` int(2),
  `income` varchar(20),
  `host_id` int(11),
  PRIMARY KEY(`id`),
  FOREIGN KEY (host_id) REFERENCES hosts(id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4;

CREATE TABLE `addresses` (
  `id` int(11) AUTO_INCREMENT,
  `line_one` varchar(40) NOT NULL,
  `line_two` varchar(40),
  `line_three` varchar(40),
  `line_four` varchar(40) NOT NULL,
  `post_code` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL,
  `property_id` int(11),
  PRIMARY KEY(`id`),
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4;

CREATE TABLE properties_versions(
  `property_id` int(11),
  `data` text NOT NULL,
  `version` int(4),
  `date_created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- INSERTING DATA
INSERT INTO hosts(id, name) VALUES
(1, 'carlos'),
(2, 'ankur'),
(3, 'elaine');

INSERT INTO properties(id, airbnb_id, numberOfBathrooms, numberOfBedrooms, income, host_id) VALUES
(1, 3512500, 1, 1,  '2000.34', 1),
(2, 1334159, 1, 3, '10000', 2),
(3, 12220057, 2, 2, '1200', 3);

INSERT INTO addresses(id, line_one, line_two, line_three, line_four, post_code, city, country, property_id) VALUES
(1, 'Flat 5', '', '', '7 Westbourne Terrace', 'W2 3UL', 'London', 'U.K.', 1),
(2, '4', 'Tower Mansions', 'Off Station Road', '86-87 Grange Road', 'SE1 3BW', 'London', 'U.K.', 2),
(3, '4', '332b', '', 'Goswell Road', 'EC1V 7LQ', 'London', 'U.K.', 3);

INSERT INTO properties_versions(property_id, data, version) VALUES
(1, '{"name" : "carlos", "address": ["Flat 5", "7 Westbourne Terrace", "W2 3UL", "London", "U.K."], "income": "2000.34", "airbnb_id" : "3512500", "numberOfBathrooms" : "1", "numberOfBedrooms" : "1"}', 1),
(2, '{"name" : "ankur", "address": ["4", "Tower Mansions", "Off Station Road", "86-87 Grange Road", "SE1 3BW", "London", "U.K."], "income": "10000", "airbnb_id" : "1334159", "numberOfBathrooms" : "1", "numberOfBedrooms" : "3"}', 1),
(3, '{"name" : "elaine", "address": ["4", "332b", "Goswell Road", "EC1V 7LQ", "London", "U.K."], "income": "1200", "airbnb_id" : "12220057", "numberOfBathrooms" : "2", "numberOfBedrooms" : "2"}', 1);
