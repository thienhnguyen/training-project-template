create database imdb
go

use imdb
go

--import plat data -> auto create table

alter table Casts
add constraint fk_casts_actor foreign key(pid) references Actor(id)

alter table Casts
add constraint fk_casts_movie foreign key(mid) references Movie(id)

alter table Movie_Directors
add constraint fk_moviedirectors_movie foreign key(mid) references Movie(id)

alter table Movie_Directors
add constraint fk_moviedirectors_directors foreign key(did) references Directors(id)
go


----------------------------------------------------------------------------------------------
create table actor (
	id int,
	fname nvarchar(30),
	lname nvarchar(30),
	gender char(1)
	primary key (id)
)

create table casts (
	pid int,
	mid int,
	role nvarchar(50)
)

create table directors (
	id int,
	fname nvarchar(30),
	lname nvarchar(30),
	primary key (id)
)

create table genre (
	mid int,
	genre varchar(50)
)

create table movie (
	id int,
	name nvarchar(150),
	year int
	primary key(id)
)

create table movie_directors (
	did int,
	mid int
)

declare @path varchar(255) = 'D:\Training\docs\SQLData\imdb2010\actor.txt'
declare @tableName varchar(32) = 'actor'

DECLARE @str_command nvarchar(150)
SET @str_command = 
					'BULK INSERT imdb.dbo.' + @tableName + ' FROM ''' + @path + 
                   ''' WITH (fieldterminator = ''' + '|' +
                   ''', rowterminator  =' + '''\n''' + ')' 

EXEC SP_EXECUTESQL @str_command
