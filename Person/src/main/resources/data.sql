create database Person;
use Person;

create table person(ID int(10) not null auto_increment,FULL_NAME varchar(90) not null,PIN varchar(10),EMAIL varchar(40),primary key (ID))
ENGINE = MYISAM;

insert into person(FULL_NAME,PIN,EMAIL)values('Zhivko Kalev','0055595950','zhivko_kalev@abv.bg');
insert into person(FULL_NAME,PIN,EMAIL)values('Georgi Purvanov','0055595950','g_purvanov@abv.bg');
insert into person(FULL_NAME,PIN,EMAIL)values('Rosen Plevnaliev','0055595950','r_plevnaliev@abv.bg');

insert into person(FULL_NAME,PIN,EMAIL)values('Petur Stoianov','0055595950','p_stoianov@abv.bg');
insert into person(FULL_NAME,PIN,EMAIL)values('Dimitur Berbatov','0055595950','berbo@abv.bg');
insert into person(FULL_NAME,PIN,EMAIL)values('Maria Boicheva','0055595950','marcheto@abv.bg');

insert into person(FULL_NAME,PIN,EMAIL)values('Boris Boichev','0055595950','boroto@abv.bg');
insert into person(FULL_NAME,PIN,EMAIL)values('Boris Karaivanov','0055595950','b_karaivanov@abv.bg');
insert into person(FULL_NAME,PIN,EMAIL)values('Petur Sashev','0055595950','p_sashev@abv.bg');
insert into person(FULL_NAME,PIN,EMAIL)values('Mitko Angelov','0055595950','m_angelov@abv.bg');
