/*[15:58:58][1 ms]*/ CREATE DATABASE `myblog`; 
/*[16:00:59][0 ms]*/ USE `myblog`; 
/*[16:00:59][44 ms]*/ CREATE TABLE `myblog`.`blogs`( `id` INT NOT NULL AUTO_INCREMENT, `title` VARCHAR(50) NOT NULL, `content` LONGTEXT NOT NULL, `createtime` BIGINT(20) NOT NULL DEFAULT 0, `author` VARCHAR(20) NOT NULL, PRIMARY KEY (`id`) ); 
/*[16:01:53][38 ms]*/ CREATE TABLE `myblog`.`users`( `id` INT NOT NULL AUTO_INCREMENT, `username` VARCHAR(20) NOT NULL, `password` VARCHAR(20) NOT NULL, `realname` VARCHAR(10) NOT NULL, PRIMARY KEY (`id`) ); 
/*[16:03:02][10 ms]*/ INSERT INTO users(username,`password`,realname) VALUES ('admin','123','管理员'); 
/*[16:03:02][5 ms]*/ INSERT INTO users(username,`password`,realname) VALUES ('lisi','123','李四'); 
/*[16:03:51][5 ms]*/ INSERT INTO blogs(title,content,createtime,author) VALUES ('标题1','内容1',1605080082985,'lisi'); 
/*[16:03:51][5 ms]*/ INSERT INTO blogs(title,content,createtime,author) VALUES ('标题2','内容2',1605080092985,'lisi2'); 