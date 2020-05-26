create table Counter (
  ID int not null auto_increment primary key,
  KeyName varchar(64) not null,
  Value int not null default 0
);
insert into Counter (KeyName) values ('ClickCount');
