drop table if exists bookings;
drop table if exists spots;

create table spots (
  id bigserial primary key,
  price numeric not null check (price > 0),
  title text not null,
  address text not null,
  created_at timestamptz default now()
);

ALTER TABLE spots ADD COLUMN lat double precision NOT NULL;
ALTER TABLE spots ADD COLUMN lon double precision NOT NULL;

create table bookings (
  bookid bigserial primary key,
  spot_id bigint not null references spots(id) on delete cascade,
  fullname text not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  created_at timestamptz default now(),
  check (start_time < end_time)
);
