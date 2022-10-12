-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 12-10-2022 a las 21:08:22
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Kiara_BR`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Asesores`
--

CREATE TABLE `Asesores` (
  `ID_Asesor` int(11) NOT NULL,
  `Nombre_asesor` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Primer_apellido` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Segundo_apellido` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Telefono_asesor` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Email_asesor` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `CURP` varchar(18) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Asesor_cliente`
--

CREATE TABLE `Asesor_cliente` (
  `ID_Asesor` int(11) NOT NULL,
  `ID_Cliente` int(11) NOT NULL,
  `Fecha_AC` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Clientes`
--

CREATE TABLE `Clientes` (
  `ID_Cliente` int(11) NOT NULL,
  `Nombre(s)` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Primer_apellido` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Segundo_apellido` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Telefono_cliente` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Email_cliente` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Ocupacion` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Estado_civil` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cronograma_renta`
--

CREATE TABLE `Cronograma_renta` (
  `Num_etapaR` int(11) NOT NULL,
  `Nombre_etapaR` varchar(60) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Tiempo_estimadoR` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `Cronograma_renta`
--

INSERT INTO `Cronograma_renta` (`Num_etapaR`, `Nombre_etapaR`, `Tiempo_estimadoR`) VALUES
(1, 'Recepcion de apartado', 1),
(2, 'Recepcion de documentacion', 4),
(3, 'Inicio de tramite de poliza juridica', 4),
(4, 'Resultado de investigacion de poliza juridica', 5),
(5, 'Revision de contrato', 4),
(6, 'Firma de contrato', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cronograma_venta`
--

CREATE TABLE `Cronograma_venta` (
  `Num_etapa` int(11) NOT NULL,
  `Nombre_etapa` varchar(60) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Tiempo_estimado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `Cronograma_venta`
--

INSERT INTO `Cronograma_venta` (`Num_etapa`, `Nombre_etapa`, `Tiempo_estimado`) VALUES
(1, 'Recepcion de apartado', 1),
(2, 'Recepcion de documentacion', 5),
(3, 'Elaboracion de contrato de compraventa', 5),
(4, 'Aprobacion de las partes del borrador de contrato', 4),
(5, 'Firma de contrato de compraventa', 5),
(6, 'Realizacion de avaluo comercial', 4),
(7, 'Realizacion de avaluo hacendario', 4),
(8, 'Avaluo terminado y entregado', 4),
(9, 'Revision de documentacion por parte de notaria', 10),
(10, 'Elaboracion de proyecto de escritura', 10),
(11, 'Firma de escritura de compraventa', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Expediente_Cliente`
--

CREATE TABLE `Expediente_Cliente` (
  `ID_expedienteC` int(11) NOT NULL,
  `ID_Cliente` int(11) NOT NULL,
  `ID_tipoDocumento` int(11) NOT NULL,
  `ID_tipoExpediente` int(11) NOT NULL,
  `Status_Doc` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Fecha` date NOT NULL,
  `URL` varchar(400) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Expediente_Propiedad`
--

CREATE TABLE `Expediente_Propiedad` (
  `ID_expedienteP` int(11) NOT NULL,
  `ID_Propiedad` int(11) NOT NULL,
  `ID_tipoDocumento` int(11) NOT NULL,
  `ID_tipoExpediente` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Status` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `URL` varchar(400) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Op_comercial`
--

CREATE TABLE `Op_comercial` (
  `ID_Propiedad` int(11) NOT NULL,
  `Niveles` int(11) NOT NULL,
  `Baños` int(11) NOT NULL,
  `Habitacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Op_Residencial`
--

CREATE TABLE `Op_Residencial` (
  `ID_Propiedad` int(11) NOT NULL,
  `Niveles` int(11) NOT NULL,
  `Recamaras` int(11) NOT NULL,
  `Cocina` tinyint(1) NOT NULL,
  `Sala_Comedor` tinyint(1) NOT NULL,
  `Baños` float NOT NULL,
  `Cajon_estacionamiento` int(11) NOT NULL,
  `Gas` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Op_terreno`
--

CREATE TABLE `Op_terreno` (
  `ID_Propiedad` int(11) NOT NULL,
  `Servicio_Agua` tinyint(1) NOT NULL,
  `Servicio_Luz` tinyint(1) NOT NULL,
  `Servicio_Drenaje` tinyint(1) NOT NULL,
  `Tipo_desnivel` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Forma_terreno` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Medidas_frente` int(11) NOT NULL,
  `Medidas_fondo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Paises`
--

CREATE TABLE `Paises` (
  `ID_Pais` int(11) NOT NULL,
  `Pais` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Proceso_CompraVenta`
--

CREATE TABLE `Proceso_CompraVenta` (
  `ID_Cliente` int(11) NOT NULL,
  `tipoCliente` int(11) NOT NULL,
  `Numero_etapa` int(11) NOT NULL,
  `ID_Propiedad` int(11) NOT NULL,
  `Doc_Status` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Fecha_StartV` date NOT NULL,
  `Fecha_EndV` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Proceso_renta`
--

CREATE TABLE `Proceso_renta` (
  `ID_Cliente` int(11) NOT NULL,
  `tipoCliente` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Numero_etapa` int(11) NOT NULL,
  `ID_Propiedad` int(11) NOT NULL,
  `Estado_doc` varchar(15) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Fecha_StartR` date NOT NULL,
  `Fecha_EndR` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Propiedades`
--

CREATE TABLE `Propiedades` (
  `ID_Propiedad` int(11) NOT NULL,
  `ID_tipoInmueble` int(11) NOT NULL,
  `Calle` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Numero` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Colonia` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Codigo_postal` int(11) NOT NULL,
  `Municipio` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Estado` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `ID_pais` int(11) NOT NULL,
  `Longitud` float NOT NULL,
  `Latitud` float NOT NULL,
  `Operacion` varchar(20) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Terreno` int(11) NOT NULL,
  `Privada_calle` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Precio` int(11) NOT NULL,
  `Uso_suelo` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL,
  `Construccion` int(11) NOT NULL,
  `Descripcion` varchar(400) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Propiedad_propietario`
--

CREATE TABLE `Propiedad_propietario` (
  `ID_Propiedad` int(11) NOT NULL,
  `ID_Cliente` int(11) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Restriccion_TED_cliente`
--

CREATE TABLE `Restriccion_TED_cliente` (
  `ID_tipoExpCliente` int(11) NOT NULL,
  `ID_tipoDocumento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Restriccion_TED_propiedad`
--

CREATE TABLE `Restriccion_TED_propiedad` (
  `ID_tipoExpPropiedad` int(11) NOT NULL,
  `ID_tipoDocumento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Tipo_docCliente`
--

CREATE TABLE `Tipo_docCliente` (
  `ID_tipoDocCliente` int(11) NOT NULL,
  `tipoDocCliente` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `Tipo_docCliente`
--

INSERT INTO `Tipo_docCliente` (`ID_tipoDocCliente`, `tipoDocCliente`) VALUES
(1, 'CURP'),
(2, 'Identificacion oficial'),
(3, 'Comprobante de domicilio'),
(4, 'Acta de nacimiento'),
(5, 'Acta de matrimonio'),
(6, 'Constancia de situacion fiscal'),
(7, 'Estado de cuenta bancario'),
(8, 'Solicitud de arrendamiento'),
(9, 'Recibo de nomina'),
(10, 'Pago de anticipo de poliza juridica'),
(11, 'Comprobante de ingresos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Tipo_docPropiedad`
--

CREATE TABLE `Tipo_docPropiedad` (
  `ID_tipoDocPropiedad` int(11) NOT NULL,
  `tipoDocPropiedad` varchar(100) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `Tipo_docPropiedad`
--

INSERT INTO `Tipo_docPropiedad` (`ID_tipoDocPropiedad`, `tipoDocPropiedad`) VALUES
(1, 'Constancia de inscripcion al registro publico de escrituras'),
(2, 'Escrituras'),
(3, 'Predial'),
(4, 'Recibo de Luz'),
(5, 'Recibo de Agua'),
(6, 'Recibo de gas'),
(7, 'CFDI'),
(8, 'Terminacion de obra'),
(9, 'Constancia de numero oficial'),
(10, 'Planos arquitectonicos'),
(11, 'Carta de no adeudo de mantenimiento y cuotas especiales'),
(12, 'Documento cancelacion de hipoteca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Tipo_ExpCliente`
--

CREATE TABLE `Tipo_ExpCliente` (
  `ID_tipoExpCliente` int(11) NOT NULL,
  `tipoExpCliente` varchar(50) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `Tipo_ExpCliente`
--

INSERT INTO `Tipo_ExpCliente` (`ID_tipoExpCliente`, `tipoExpCliente`) VALUES
(1, 'Vendedor'),
(2, 'Copropietario vendedor'),
(3, 'Comprador'),
(4, 'Copropietario comprador'),
(5, 'Arrendatario'),
(6, 'Obligado solidario'),
(7, 'Arrendador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Tipo_ExpPropiedad`
--

CREATE TABLE `Tipo_ExpPropiedad` (
  `ID_tipoExpPropiedad` int(11) NOT NULL,
  `tipoExpPropiedad` varchar(10) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `Tipo_ExpPropiedad`
--

INSERT INTO `Tipo_ExpPropiedad` (`ID_tipoExpPropiedad`, `tipoExpPropiedad`) VALUES
(1, 'Venta'),
(2, 'Renta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Tipo_inmueble`
--

CREATE TABLE `Tipo_inmueble` (
  `ID_tipoInmueble` int(11) NOT NULL,
  `tipoInmueble` varchar(40) COLLATE utf8mb4_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Volcado de datos para la tabla `Tipo_inmueble`
--

INSERT INTO `Tipo_inmueble` (`ID_tipoInmueble`, `tipoInmueble`) VALUES
(1, 'Casa'),
(2, 'Departamento'),
(3, 'Terreno'),
(4, 'Loft'),
(5, 'Bodega'),
(6, 'Rancho'),
(7, 'Cuarto'),
(8, 'Penthouse'),
(9, 'Edificio'),
(10, 'Consultorio'),
(11, 'Local');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Asesores`
--
ALTER TABLE `Asesores`
  ADD PRIMARY KEY (`ID_Asesor`);

--
-- Indices de la tabla `Asesor_cliente`
--
ALTER TABLE `Asesor_cliente`
  ADD PRIMARY KEY (`ID_Asesor`);

--
-- Indices de la tabla `Clientes`
--
ALTER TABLE `Clientes`
  ADD PRIMARY KEY (`ID_Cliente`);

--
-- Indices de la tabla `Cronograma_renta`
--
ALTER TABLE `Cronograma_renta`
  ADD PRIMARY KEY (`Num_etapaR`);

--
-- Indices de la tabla `Cronograma_venta`
--
ALTER TABLE `Cronograma_venta`
  ADD PRIMARY KEY (`Num_etapa`);

--
-- Indices de la tabla `Expediente_Cliente`
--
ALTER TABLE `Expediente_Cliente`
  ADD PRIMARY KEY (`ID_expedienteC`);

--
-- Indices de la tabla `Expediente_Propiedad`
--
ALTER TABLE `Expediente_Propiedad`
  ADD PRIMARY KEY (`ID_expedienteP`);

--
-- Indices de la tabla `Op_comercial`
--
ALTER TABLE `Op_comercial`
  ADD PRIMARY KEY (`ID_Propiedad`);

--
-- Indices de la tabla `Op_terreno`
--
ALTER TABLE `Op_terreno`
  ADD PRIMARY KEY (`ID_Propiedad`);

--
-- Indices de la tabla `Paises`
--
ALTER TABLE `Paises`
  ADD PRIMARY KEY (`ID_Pais`);

--
-- Indices de la tabla `Proceso_CompraVenta`
--
ALTER TABLE `Proceso_CompraVenta`
  ADD PRIMARY KEY (`ID_Cliente`);

--
-- Indices de la tabla `Propiedades`
--
ALTER TABLE `Propiedades`
  ADD PRIMARY KEY (`ID_Propiedad`);

--
-- Indices de la tabla `Restriccion_TED_cliente`
--
ALTER TABLE `Restriccion_TED_cliente`
  ADD PRIMARY KEY (`ID_tipoExpCliente`);

--
-- Indices de la tabla `Restriccion_TED_propiedad`
--
ALTER TABLE `Restriccion_TED_propiedad`
  ADD PRIMARY KEY (`ID_tipoExpPropiedad`);

--
-- Indices de la tabla `Tipo_docCliente`
--
ALTER TABLE `Tipo_docCliente`
  ADD PRIMARY KEY (`ID_tipoDocCliente`);

--
-- Indices de la tabla `Tipo_docPropiedad`
--
ALTER TABLE `Tipo_docPropiedad`
  ADD PRIMARY KEY (`ID_tipoDocPropiedad`);

--
-- Indices de la tabla `Tipo_ExpCliente`
--
ALTER TABLE `Tipo_ExpCliente`
  ADD PRIMARY KEY (`ID_tipoExpCliente`);

--
-- Indices de la tabla `Tipo_ExpPropiedad`
--
ALTER TABLE `Tipo_ExpPropiedad`
  ADD PRIMARY KEY (`ID_tipoExpPropiedad`);

--
-- Indices de la tabla `Tipo_inmueble`
--
ALTER TABLE `Tipo_inmueble`
  ADD PRIMARY KEY (`ID_tipoInmueble`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Asesores`
--
ALTER TABLE `Asesores`
  MODIFY `ID_Asesor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Asesor_cliente`
--
ALTER TABLE `Asesor_cliente`
  MODIFY `ID_Asesor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Clientes`
--
ALTER TABLE `Clientes`
  MODIFY `ID_Cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Cronograma_renta`
--
ALTER TABLE `Cronograma_renta`
  MODIFY `Num_etapaR` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `Cronograma_venta`
--
ALTER TABLE `Cronograma_venta`
  MODIFY `Num_etapa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `Expediente_Cliente`
--
ALTER TABLE `Expediente_Cliente`
  MODIFY `ID_expedienteC` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Expediente_Propiedad`
--
ALTER TABLE `Expediente_Propiedad`
  MODIFY `ID_expedienteP` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Op_comercial`
--
ALTER TABLE `Op_comercial`
  MODIFY `ID_Propiedad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Op_terreno`
--
ALTER TABLE `Op_terreno`
  MODIFY `ID_Propiedad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Paises`
--
ALTER TABLE `Paises`
  MODIFY `ID_Pais` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Proceso_CompraVenta`
--
ALTER TABLE `Proceso_CompraVenta`
  MODIFY `ID_Cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Propiedades`
--
ALTER TABLE `Propiedades`
  MODIFY `ID_Propiedad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Restriccion_TED_cliente`
--
ALTER TABLE `Restriccion_TED_cliente`
  MODIFY `ID_tipoExpCliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Restriccion_TED_propiedad`
--
ALTER TABLE `Restriccion_TED_propiedad`
  MODIFY `ID_tipoExpPropiedad` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Tipo_docCliente`
--
ALTER TABLE `Tipo_docCliente`
  MODIFY `ID_tipoDocCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `Tipo_docPropiedad`
--
ALTER TABLE `Tipo_docPropiedad`
  MODIFY `ID_tipoDocPropiedad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `Tipo_ExpCliente`
--
ALTER TABLE `Tipo_ExpCliente`
  MODIFY `ID_tipoExpCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `Tipo_ExpPropiedad`
--
ALTER TABLE `Tipo_ExpPropiedad`
  MODIFY `ID_tipoExpPropiedad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `Tipo_inmueble`
--
ALTER TABLE `Tipo_inmueble`
  MODIFY `ID_tipoInmueble` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
