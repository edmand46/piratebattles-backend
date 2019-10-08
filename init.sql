-- TODO: Make migrations instead this trash

drop table accounts;
drop table users;
drop table bans;
drop table sessions;
drop table ships;
drop table user_ships;
drop table parts;
drop table user_parts;


CREATE TABLE "accounts" (
  "accountId" SERIAL NOT NULL,
  "type"      text   NOT NULL,
  "data"      jsonb  NOT NULL,
  "userId"    serial NOT NULL,
  "createdAt" timestamp with time zone default now()
);

CREATE TABLE "users" (
  "userId"       SERIAL            NOT NULL,
  "name"         character varying NOT NULL,
  "passwordHash" character varying NOT NULL,
  "gold"         integer           NOT NULL,
  "keys"         integer           NOT NULL,
  "level"        integer           NOT NULL,
  "xp"           float             NOT NULL,
  "createdAt"    timestamp with time zone default now()
);

create table "bans" (
  "banId"     SERIAL            not null,
  "userId"    integer           not null,
  "reason"    character varying not null,
  "expiredAt" timestamp         not null,
  "createdAt" timestamp with time zone default now()
);

CREATE TABLE "sessions" (
  "sessionId" SERIAL            NOT NULL,
  "userId"    integer           NOT NULL,
  "token"     character varying NOT NULL,
  "expiredAt" TIMESTAMP         NOT NULL,
  "createdAt" timestamp with time zone default now()
);

CREATE TABLE "ships" (
  "shipId"    SERIAL            NOT NULL,
  "name"      character varying not null,
  "bodyId"    integer           not null,
  "sailId"    integer           not null,
  "gunId"     integer           not null,
  "createdAt" timestamp with time zone default now()
);

CREATE TABLE "user_ships" (
  "shipId"     SERIAL            NOT NULL,
  "userShipId" integer           NOT NULL,
  "name"       character varying not null,
  "bodyId"     integer           not null,
  "sailId"     integer           not null,
  "gunId"      integer           not null,
  "createdAt"  timestamp with time zone default now()
);

create table "parts" (
  "partId"    serial            not null,
  "shipId"    integer           not null,
  "type"      character varying not null,
  "resource"  character varying not null,
  "createdAt" timestamp with time zone default now()
);

create table "user_parts" (
  "userPartId" serial  not null,
  "partId"     integer not null,
  "level"      integer not null         default 1,
  "count"      integer not null         default 0,
  "createdAt"  timestamp with time zone default now()
);