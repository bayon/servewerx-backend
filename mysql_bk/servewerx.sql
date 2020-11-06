-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 06, 2020 at 03:44 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `servewerx`
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
(1, 'joey jack', 22, '2020-11-03 14:29:55'),
(2, 'jane', 20, '2020-11-02 20:18:13');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` longtext NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `userName`, `password`, `refresh_token`, `created`) VALUES
(43, 'jack@jack.com', '$2b$10$YbOq.5qmHuyOsDYs696q4.iOx7xU3EZCe/IX9TpMx8duVl2hGdcU.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphY2tAamFjay5jb20iLCJpYXQiOjE2MDQ2NzA3NjMsImV4cCI6MTYwNDc1NzE2M30.3fHIvfeJJbLo1BXjOiBXhhiqxlqDuEZKYWQ63AMdDVM', '2020-11-06 13:52:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `junk`
--
ALTER TABLE `junk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `junk`
--
ALTER TABLE `junk`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
