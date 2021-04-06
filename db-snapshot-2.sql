-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 05, 2021 at 04:18 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `di-map`
--

-- --------------------------------------------------------

--
-- Table structure for table `markers`
--

CREATE TABLE `markers` (
  `id` int(255) NOT NULL,
  `latlng` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
  `imgurl` varchar(300) CHARACTER SET utf8mb4 NOT NULL,
  `title` varchar(1000) CHARACTER SET utf8mb4 NOT NULL,
  `note` varchar(1000) CHARACTER SET utf8mb4 NOT NULL,
  `reward` int(255) NOT NULL,
  `owner_id` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `markers`
--

INSERT INTO `markers` (`id`, `latlng`, `imgurl`, `title`, `note`, `reward`, `owner_id`) VALUES
(3, '{\"lat\": 55.6811, \"lng\": 12.5664}', '3.jpg', 'Get my frisbee out of the tree', 'My beloved frisbee is stuck in the tree. Get it out and put it on the ground. I\'ll pick it up.', 80, 1),
(35, '{\"lat\":55.6933297532139,\"lng\":12.565090815514852}', '2.jpg', 'Clean the trash', 'Outsize Shabaz', 120, 1),
(36, '{\"lat\":55.70128571264527,\"lng\":12.565566339544606}', '3.jpg', 'Lost my watch somewhere here', 'Please help me find it. It has sentimental value', 500, 2),
(40, '{\"lat\":55.79361553798946,\"lng\":12.558957897126676}', '1.jpg', 'Bury this box deep underground', 'Do not open the box', 2000, 1),
(41, '{\"lat\":55.68162463910064,\"lng\":12.591241335139788}', '1.jpg', 'Take these empty boxes out', 'Old office stuff', 30, 2),
(43, '{\"lat\":55.685952499791874,\"lng\":12.564213202094837}', '1.jpg', 'Get my bike out of the lake', 'Bring it to my address for a bonus', 300, 1),
(45, '{\"lat\":55.575149755948466,\"lng\":12.598929966188736}', '1.jpg', 'Get 20 golf balls out of the pond', '', 150, 1),
(46, '{\"lat\":55.6565301993483,\"lng\":12.594844685518186}', '1.jpg', 'Remove the obscene graffiti', 'you can also paint over it', 500, 2),
(47, '{\"lat\":55.691134701013134,\"lng\":12.551239908789285}', '1.jpg', 'Tidy up my husband\'s grave', 'I\'m too old now to do it myself. Please remove leaves and dirt and wipe off the plate', 300, 1),
(51, '{\"lat\":55.68461379124742,\"lng\":12.569425852998394}', '1.jpg', 'Help clean up trash', 'There\'s a heap of trash that needs to be removed.', 150, 1),
(53, '{\"lat\":55.68260842474652,\"lng\":12.566448196303101}', '1.jpg', 'My kid lost his beloved teddy bear around here', 'Help me find it!', 100, 1),
(54, '{\"lat\":55.68452129821098,\"lng\":12.573448365983497}', '1.jpg', 'Test', 'test', 233, 1),
(55, '{\"lat\":55.68779355874282,\"lng\":12.569384357339006}', '1.jpg', 'what', 'ad', 12, 1),
(66, '{\"lat\":55.69411078762805,\"lng\":12.573637130044517}', '1.jpg', 'Get this chair off the island', 'How did it even get here', 250, 2),
(76, '{\"lat\":55.68873825417048,\"lng\":12.568770706420766}', '1617375095.jpeg', 'Take out this bin', 'It\'s disgusting', 100, 2),
(77, '{\"lat\":55.69010562296087,\"lng\":12.571420718450101}', '1617381538.jpeg', 'Yucky bin', 'gross', 100, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `username` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `imgurl` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `imgurl`) VALUES
(1, 'admin', 'admin', 'user-1.jpg'),
(2, 'adam', 'adam', 'user-2.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `markers`
--
ALTER TABLE `markers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `markers`
--
ALTER TABLE `markers`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
