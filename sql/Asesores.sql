ALTER TABLE `Asesores` CHANGE `ID_Asesor` `ID_Asesor` INT(11) NOT NULL;

ALTER TABLE `Asesores` DROP `ID_Asesor`;"?

ALTER TABLE `Asesores` CHANGE `CURP` `CURP` INT(11) NOT NULL FIRST;

ALTER TABLE `temp` CHANGE `CURP` `CURP` VARCHAR(18) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL FIRST;