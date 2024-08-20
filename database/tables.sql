create database inventorydb;

use inventorydb;

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL
) ;



CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL
) ;



CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `pid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'ordered'
) ;



CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `descr` text NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `picture` text NOT NULL
) ;

INSERT INTO `products` (`id`, `name`, `descr`, `price`, `stock`, `picture`) VALUES
(1, 'All Natural Soap', 'Cleanse, moisturize and soothe your skin with all natural handmade soap made with organic oils and plant butters, pure essential oils, organic herbs, and spices. ', 126, 100, 'soap.jpg'),
(2, 'Unscented Baby Powder', 'An organic baby powder for delicate skin formulated with finely milled vegetable root powders, skin soothing botanicals and silky clay that work together to absorb moisture.', 520, 100, 'organic_natural_baby_skin_care_products-16.jpg'),
(4, 'Lip Balm: Healing Herbs', 'An organic lip balm made with soothing oils and botanicals that moisturize and help promote healing.', 560, 100, 'lipbalm.jpg'),
(5, 'Deodorant: Coconut Cream', 'An organic cream deodorant made with soothing ingredients that effectively neutralize odor and plant-based powders that help absorb wetness, so you stay fresh naturally.', 122, 100, 'Deodorant.jpg'),
(6, 'Xanthone Plus Capsule', 'The best medicine for health issues', 250, 100, 'capsule.jpg'),
(7, 'Malunggay Medicine', 'Moringa Oleifera or locally known as Malungay, is widely used as a vegetable ingredient in cooking. It is a popular plant known for high nutritional value as well as an herbal medicine a number of illness and other practical uses.', 350, 100, 'medicine.jpg');

ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

-
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
