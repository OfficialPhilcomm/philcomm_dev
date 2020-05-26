drop table if exists User;
create table User (
  ID int not null auto_increment primary key,
  Username varchar(64) not null unique,
  Password text not null
);
insert into User (Username, Password) values
  ('dev', password('')),
  ('Philcomm', password('')),
  ('Kora', password('')),
  ('Pottina', password('')),
  ('Moses', password('')),
  ('Captn', password('')),
  ('Baklava', password('')),
  ('Katzu', password('')),
  ('Angel', password(''));

drop table if exists OrderData;
create table OrderData (
  ID int not null auto_increment primary key,
  PokemonName varchar(64) not null,
  Level int not null,
  Gender varchar(8) not null,
  Move1 varchar(64) not null,
  Move2 varchar(64) not null,
  Move3 varchar(64) not null,
  Move4 varchar(64) not null,
  Ability varchar(64) not null,
  IVHP int not null default -1,
  IVATK int not null default -1,
  IVDEF int not null default -1,
  IVSPATK int not null default -1,
  IVSPDEF int not null default -1,
  IVSPE int not null default -1,
  EVHP int not null default -1,
  EVATK int not null default -1,
  EVDEF int not null default -1,
  EVSPATK int not null default -1,
  EVSPDEF int not null default -1,
  EVSPE int not null default -1
);

drop table if exists UserOrder;
create table UserOrder (
  ID int not null auto_increment primary key,
  UserID int not null,
  OrderDataID int not null,
  AcceptedOfferID int,
  State int,
  Finished tinyint(1) not null default 0,
  Closed tinyint(1) not null default 0,
  CreatedAt datetime not null default now()
);
alter table UserOrder add foreign key (UserID) references User(ID) on update cascade on delete cascade;
alter table UserOrder add foreign key (OrderDataID) references OrderData(ID) on update cascade on delete cascade;

drop table if exists Offer;
create table Offer (
  ID int not null auto_increment primary key,
  Price int not null,
  UserOrderID int not null,
  UserID int not null,
  CreatedAt datetime not null default now()
);
alter table Offer add foreign key (UserOrderID) references UserOrder(ID) on update cascade on delete cascade;
alter table Offer add foreign key (UserID) references User(ID) on update cascade on delete cascade;

alter table UserOrder add foreign key (AcceptedOfferID) references Offer(ID) on update cascade on delete cascade;

drop table if exists Notification;
create table Notification (
  ID int not null auto_increment primary key,
  UserID int not null,
  Seen tinyint(1) not null default 0,
  Archived tinyint(1) not null default 0
);
alter table Notification add foreign key (UserID) references User(ID) on update cascade on delete cascade;

drop table if exists Counter;
create table Counter (
  ID int not null auto_increment primary key,
  KeyName varchar(64) not null,
  Value int not null default 0
);
insert into Counter (KeyName) values ('VisitCount');
insert into Counter (KeyName) values ('RequestCount');
