-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 02, 2020 at 08:35 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `serverwerx`
--

-- --------------------------------------------------------

--
-- Table structure for table `junk`
--

CREATE TABLE `junk` (
  `id` bigint(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `age` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `junk`
--

INSERT INTO `junk` (`id`, `name`, `age`, `created`) VALUES
(1, 'joe', 22, '2020-11-02 20:18:13'),
(2, 'jane', 20, '2020-11-02 20:18:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `junk`
--
ALTER TABLE `junk`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `junk`
--
ALTER TABLE `junk`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
