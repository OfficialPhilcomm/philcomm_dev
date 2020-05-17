drop table if exists User;
create table User (
  ID int not null auto_increment primary key,
  Username varchar(64) not null unique,
  Password password not null
);
insert into User (Username, Password) values ('Philcomm', password('123578'));

drop table if exists OrderData;
create table OrderData (
  ID int not null auto_increment primary key,
  PokemonName varchar(64) not null,
  Gender varchar(8) not null,
  Move1 varchar(64) not null,
  Move2 varchar(64) not null,
  Move3 varchar(64) not null,
  Move4 varchar(64) not null,
  Ability varchar(64) not null
);

drop table if exists Order;
create table Order (
  ID int not null auto_increment primary key,
  UserID int not null,
  OrderDataID int not null
);
alter table Order add foreign key (UserID) references Order(ID) on update cascade on delete cascade;
alter table Order add foreign key (OrderDataID) references OrderData(ID) on update cascade on delete cascade;
