drop table if exists User;
create table User (
  ID int not null auto_increment primary key,
  Username int not null
);
insert into User(Username) values ("Philcomm");

drop table if exists Note;
create table Note (
  ID int not null auto_increment primary key,
  FrontID varchar(36) not null,
  Note text not null
);