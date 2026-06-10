CREATE TABLE `activities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`userName` varchar(255),
	`activityType` enum('reservation_created','contract_updated','key_retrieved','key_returned','appointment_scheduled','report_generated','terms_signed'),
	`description` text,
	`relatedId` int,
	`relatedType` varchar(50),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `activities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`consultantId` int,
	`consultantName` varchar(255),
	`clientName` varchar(255) NOT NULL,
	`clientPhone` varchar(20),
	`propertyCode` varchar(100),
	`address` text,
	`scheduledAt` datetime NOT NULL,
	`durationMinutes` int DEFAULT 90,
	`observacoes` longtext,
	`status` enum('scheduled','completed','cancelled') DEFAULT 'scheduled',
	`createdBy` int,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contracts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientPhone` varchar(20),
	`clientEmail` varchar(255),
	`status` enum('pendente_elaboracao','em_elaboracao','contrato_enviado','contrato_assinado','troca_titularidade_pagamento','concluido') DEFAULT 'pendente_elaboracao',
	`locacaoTipo` enum('comercial','residencial'),
	`garantia` varchar(100),
	`endereco` text,
	`cep` varchar(20),
	`valorAluguel` decimal(12,2),
	`condominio` decimal(12,2),
	`proprietario` varchar(255),
	`observacoes` longtext,
	`dataInicioContrato` datetime,
	`createdBy` int,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contracts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `keyHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`keyId` int NOT NULL,
	`action` enum('retrieved','returned','terms_signed'),
	`performedBy` int,
	`performedByName` varchar(255),
	`notes` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `keyHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `keys` (
	`id` int AUTO_INCREMENT NOT NULL,
	`keyCode` varchar(100) NOT NULL,
	`clientName` varchar(255) NOT NULL,
	`clientPhone` varchar(20),
	`personType` enum('cliente','prestador','proprietario','vistoriador','corretor'),
	`reason` varchar(255),
	`retrievalDate` datetime,
	`returnPolicy` enum('retorna','fica'),
	`status` enum('retrieved','returned') DEFAULT 'retrieved',
	`returnDate` datetime,
	`receiverName` varchar(255),
	`responsibleStaff` varchar(255),
	`acceptedTerms` boolean DEFAULT false,
	`acceptedAt` datetime,
	`acceptedBy` int,
	`createdBy` int,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `keys_id` PRIMARY KEY(`id`),
	CONSTRAINT `keys_keyCode_unique` UNIQUE(`keyCode`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`type` enum('reservations','contracts','keys','appointments','general'),
	`startDate` datetime,
	`endDate` datetime,
	`data` longtext,
	`generatedBy` int,
	`generatedByName` varchar(255),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reservations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyCode` varchar(100) NOT NULL,
	`address` text,
	`clientName` varchar(255) NOT NULL,
	`clientPhone` varchar(20),
	`ownerName` varchar(255),
	`ownerPhone` varchar(20),
	`consultantName` varchar(255),
	`reservedAtDate` datetime,
	`status` enum('pending_docs','pending_review','pending_signature','contract_signed','withdrawal') DEFAULT 'pending_docs',
	`docsSubmittedAt` datetime,
	`contractSignedAt` datetime,
	`leaseValue` decimal(12,2),
	`guaranteeType` varchar(100),
	`isSiteActive` boolean DEFAULT true,
	`createdBy` int,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reservations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('usuario','gestor') NOT NULL DEFAULT 'usuario';--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);