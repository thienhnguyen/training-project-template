--------------------------1--------------------------
set statistics time on
select ac.fname as 'First Name', ac.lname as 'Last Name'
from actor ac join casts ca
on ac.id = ca.pid
join movie mo
on mo.id = ca.mid
where mo.name = 'Officer 444'
set statistics time off
--------------------------2--------------------------
set statistics time on
select (di.fname + ' ' + di.lname) as 'Directors Name', count(mo.id) as 'Number of movies'
from movie_directors md join directors di
on md.did = di.id
join movie mo
on md.mid = mo.id
group by di.id, di.fname, di.lname
having count(mo.id) >= 500
order by count(mo.id) desc
set statistics time off
--------------------------3--------------------------
set statistics time on
select (ac.fname + ' ' + ac.lname) as 'Actor name', mo.name as 'Movie name', count(distinct ca.role) as 'Number of disctinct roles'
from casts ca join actor ac
on ca.pid = ac.id
join movie mo
on ca.mid = mo.id
where mo.year = 2010
group by ac.id, ac.fname, ac.lname, mo.id, mo.name
having count(distinct ca.role) >= 5
set statistics time off
--------------------------4--------------------------
set statistics time on
select (ac.fname + ' ' + ac.lname) as 'Female actor name', count(distinct ca.mid) as 'Number of action movies'
from casts ca
join actor ac
on ca.pid = ac.id
join genre ge
on ca.mid = ge.mid
where ge.genre = 'Action' and ac.gender = 'F'
group by ac.id, ac.fname, ac.lname
having count(distinct ca.mid) >= 50
set statistics time off
--------------------------5--------------------------
create nonclustered index idx_casts_pid
on casts(pid)

create nonclustered index idx_casts_mid
on casts(mid)

create nonclustered index idx_casts_role
on casts(role)

create nonclustered index idx_movie_name
on movie(name)

create nonclustered index idx_movie_year
on movie(year)

create nonclustered index idx_actor_fname
on actor(fname)

create nonclustered index idx_actor_lname
on actor(lname)
