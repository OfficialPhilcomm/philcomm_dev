drop table if exists User;
create table User (
  ID int not null auto_increment primary key,
  Username varchar(64) not null unique,
  Password text not null
);
insert into User (Username, Password) values
  ('Philcomm', password('123578')),
  ('dev', password(''));

drop table if exists OrderData;
create table OrderData (
  ID int not null auto_increment primary key,
  PokemonName varchar(64) not null,
  Gender varchar(8) not null,
  Move1 varchar(64) not null,
  Move2 varchar(64) not null,
  Move3 varchar(64) not null,
  Move4 varchar(64) not null,
  Ability varchar(64) not null,
);

drop table if exists UserOrder;
create table UserOrder (
  ID int not null auto_increment primary key,
  UserID int not null,
  OrderDataID int not null,
  AcceptedOfferID int,
  State varchar(32) not null,
  CreatedAt datetime not null default now()
);
alter table UserOrder add foreign key (UserID) references User(ID) on update cascade on delete cascade;
alter table UserOrder add foreign key (OrderDataID) references OrderData(ID) on update cascade on delete cascade;
alter table UserOrder add foreign key (AcceptedOfferID) references Offer(ID) on update cascade on delete cascade;

create table Offer (
  ID int not null auto_increment primary key,
  Price int not null,
  UserOrderID int not null,
  UserID int not null
);
alter table Offer add foreign key (UserOrderID) references UserOrder(ID) on update cascade on delete cascade;
alter table Offer add foreign key (UserID) references User(ID) on update cascade on delete cascade;
