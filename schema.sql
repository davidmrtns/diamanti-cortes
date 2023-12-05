CREATE TABLE `cabeleireiro` (
  `idCabeleireiro` smallint NOT NULL AUTO_INCREMENT,
  `nomeCabeleireiro` varchar(100) DEFAULT NULL,
  `usuario` varchar(15) DEFAULT NULL,
  `senha` char(255) DEFAULT NULL,
  PRIMARY KEY (`idCabeleireiro`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `dias_semana` (
  `idDia` smallint NOT NULL AUTO_INCREMENT,
  `diaSemana` smallint NOT NULL,
  `horaInicial` time NOT NULL,
  `horaFinal` time NOT NULL,
  PRIMARY KEY (`idDia`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `servico` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `nomeServico` varchar(30) NOT NULL,
  `preco` float DEFAULT NULL,
  `descricao` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `agendamento` (
  `idAgendamento` smallint NOT NULL AUTO_INCREMENT,
  `nomeCliente` varchar(100) NOT NULL,
  `telefone` char(11) NOT NULL,
  `FK_SERVICO_idServico` smallint NOT NULL,
  `FK_CABELEIREIRO_idCabeleireiro` smallint NOT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`idAgendamento`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `servico_agendado` (
  `id` smallint NOT NULL AUTO_INCREMENT,
  `FK_SERVICO_idServico` smallint DEFAULT NULL,
  `FK_AGENDAMENTO_idAgendamento` smallint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_SERVICO_idServico` (`FK_SERVICO_idServico`),
  KEY `FK_AGENDAMENTO_idAgendamento` (`FK_AGENDAMENTO_idAgendamento`),
  CONSTRAINT `servico_agendado_ibfk_1` FOREIGN KEY (`FK_SERVICO_idServico`) REFERENCES `servico` (`id`) ON DELETE CASCADE,
  CONSTRAINT `servico_agendado_ibfk_2` FOREIGN KEY (`FK_AGENDAMENTO_idAgendamento`) REFERENCES `agendamento` (`idAgendamento`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
