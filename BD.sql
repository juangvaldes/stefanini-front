CREATE SCHEMA `test_stefanini` ;

CREATE TABLE `test_stefanini`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `user_password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `test_stefanini`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `product_description` VARCHAR(200) NOT NULL,
  `price` DOUBLE NOT NULL,
  `public_date` DATE NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
CREATE TABLE `test_stefanini`.`product_cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `id_product` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_id_product_idx` (`id_product` ASC) VISIBLE,
  INDEX `fk_id_user_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `test_stefanini`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_product`
    FOREIGN KEY (`id_product`)
    REFERENCES `test_stefanini`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO `test_stefanini`.`products` (`product_name`, `product_description`, `price`, `public_date`, `image`) VALUES ('Carro a control remoto', 'Espectacular carro a control remoto', '10000', '2019-11-30', 'img/carro_control_remoto.jpg');
INSERT INTO `test_stefanini`.`products` (`product_name`, `product_description`, `price`, `public_date`, `image`) VALUES ('Iron man', 'Muñeco aron man del univero de marvel', '20000', '2019-11-20', 'img/iron_man.jpg');

  