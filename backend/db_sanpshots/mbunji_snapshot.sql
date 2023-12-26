-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2023 at 12:52 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ubunifu_space`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `comment` varchar(1000) NOT NULL,
  `user_id` int(11) NOT NULL,
  `idea_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `date`, `comment`, `user_id`, `idea_id`) VALUES
(1, '2023-12-10', 'Lets just test for this', 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `idea`
--

CREATE TABLE `idea` (
  `id` int(11) NOT NULL,
  `problem_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `idea_likes` int(11) DEFAULT 0,
  `color` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `idea`
--

INSERT INTO `idea` (`id`, `problem_id`, `user_id`, `description`, `idea_likes`, `color`) VALUES
(3, 3, 3, 'we can send a backup network lnk for you the arusha branch to use, to cover during unstable network times', 0, 'yellow'),
(4, 3, 3, 'we can buy a starLink router it offers great connectivity regardless of your physical location', 0, 'Light-yellow'),
(7, 19, 3, 'Maybe we should review our architectur, and make changes to optimise it', 0, 'Light-pink'),
(17, 3, 3, 'demo', 0, 'Light-pink'),
(22, 3, 3, 'sassasasas', 0, 'light-blue'),
(23, 3, 3, 'asasasas', 0, 'yellow'),
(24, 3, 3, 'cdxdcssd', 0, 'yellow'),
(25, 3, 3, 'qweqeqw', 0, 'Pink'),
(29, 3, 3, 'asasqwqwqw', 0, 'Pink'),
(30, 3, 3, 'ka big g', 0, 'Light-yellow'),
(31, 3, 3, 'why did you run?', 0, 'light-blue');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL,
  `idea_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `date`, `user_id`, `idea_id`) VALUES
(1, '2023-12-10 15:21:49', 3, 4),
(2, '2023-12-10 15:21:49', 45, 3);

-- --------------------------------------------------------

--
-- Table structure for table `problem`
--

CREATE TABLE `problem` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `department` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `problem`
--

INSERT INTO `problem` (`id`, `user_id`, `title`, `description`, `department`) VALUES
(3, 3, 'Network instability', 'the sales department in arusha is not gettting a stable network connect', 'IT department'),
(4, 3, 'Poor sales in Mafinga ', 'The sales team in mafnga isn\'t getting enough new customers while other banks do ', 'Sales department'),
(5, 3, 'Parking at Kariakoo Branch', 'We are having a problem of finding a place where to we can park our cars', 'Administration'),
(19, 3, 'Delay of Transactions processing', 'When sending money to from SimBanking App to mobile money, there is a huge delay from sending the money and getting the message.', 'operations'),
(22, 3, 'deffective conputrs', 'most of the computers are not working', 'Information technology'),
(24, 3, 'demo', 'demo', 'Information technology'),
(25, 3, 'demo', 'demo', 'Information technology'),
(26, 3, 'please call me', 'Rewards... i\'m lonely', 'Human resources'),
(27, 3, 'nnjnj', 'mkkmmkmkmk', 'Human resources');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `department` varchar(45) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `staff_id`, `name`, `email`, `password`, `department`, `role_id`) VALUES
(3, 123, 'john', 'john@gmail.com', '123', 'ict', 1),
(45, 1234, 'Janeth', 'jmosha@crdb.plc', 'asdfgh', 'Innovation Department', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cimments_idea` (`idea_id`),
  ADD KEY `fk_comments_user` (`user_id`);

--
-- Indexes for table `idea`
--
ALTER TABLE `idea`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_idea_user` (`user_id`),
  ADD KEY `fk_idea_problem` (`problem_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_likes_user` (`user_id`),
  ADD KEY `fk_likes_idea` (`idea_id`);

--
-- Indexes for table `problem`
--
ALTER TABLE `problem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_problem_user` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `staff_id` (`staff_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `idea`
--
ALTER TABLE `idea`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `problem`
--
ALTER TABLE `problem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_cimments_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
  ADD CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `idea`
--
ALTER TABLE `idea`
  ADD CONSTRAINT `fk_idea_problem` FOREIGN KEY (`problem_id`) REFERENCES `problem` (`id`),
  ADD CONSTRAINT `fk_idea_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_likes_idea` FOREIGN KEY (`idea_id`) REFERENCES `idea` (`id`),
  ADD CONSTRAINT `fk_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `problem`
--
ALTER TABLE `problem`
  ADD CONSTRAINT `fk_problem_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
