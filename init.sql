-- TODO: Make migrations instead this trash

drop table accounts;
drop table users;
drop table bans;
drop table sessions;
drop table ships;
drop table user_ships;
drop table parts;
drop table user_parts;
drop table user_chests;
drop table chests;
drop table chests_loot;


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
  "role"         character varying not null,
  "gold"         integer           NOT NULL,
  "crystals"     integer           NOT NULL,
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
  "resource"  character varying not null,
  "createdAt" timestamp with time zone default now()
);

CREATE TABLE "user_ships" (
  "userShipId"   SERIAL            NOT NULL,
  "parentShipId" integer           NOT NULL,
  "userId"       integer           NOT NULL,
  "name"         character varying not null,
  "bodyId"       integer           not null,
  "sailId"       integer           not null,
  "gunId"        integer           not null,
  "createdAt"    timestamp with time zone default now()
);

create table "parts" (
  "partId"    serial            not null,
  "shipId"    integer           not null,
  "type"      character varying not null,
  "resource"  character varying not null,
  "createdAt" timestamp with time zone default now()
);

create table "user_parts" (
  "userPartId"     serial  not null,
  "parentPartId"   integer not null,
  "userId"         integer not null,
  "level"          integer not null         default 1,
  "count"          integer not null         default 0,
  "nextLevelCount" integer not null         default 1,
  "createdAt"      timestamp with time zone default now()
);

create table "chests" (
  "chestId"             serial            not null,
  "name"                character varying not null,
  "timeToOpen"          integer           not null default 3600,
  "openImmediatlyPrice" integer           not null default 50,
  "resource"            character varying,
  "createdAt"           timestamp with time zone   default now()
);

create table "chests_loot" (
  "lootId"     serial  not null,
  "chestId"    integer not null,
  "dropChance" float   not null,
  "partId"     integer not null,
  "gold"       integer                  default 0,
  "crystals"   integer                  default 0,
  "count"      integer                  default 1,
  "createdAt"  timestamp with time zone default now()
);

create table "user_chests" (
  "userChestId"    serial            not null,
  "parentChestId"  integer           not null,
  "userId"         integer           not null,
  "state"          character varying not null default 'closed',
  "startOpeningAt" timestamp with time zone,
  "createdAt"      timestamp with time zone   default now()
);


INSERT INTO public.ships ("shipId", name, "bodyId", "sailId", "gunId", "resource", "createdAt")
VALUES (1, 'Стартовый корабль', 3, 2, 1, 'ship1', '2019-10-09 08:02:03.509102');

INSERT INTO public.parts ("partId", "shipId", type, resource, "createdAt")
VALUES (1, 1, 'gun', 'gun1', '2019-10-09 08:00:00.502208');
INSERT INTO public.parts ("partId", "shipId", type, resource, "createdAt")
VALUES (2, 1, 'sail', 'sail1', '2019-10-09 08:01:22.080930');
INSERT INTO public.parts ("partId", "shipId", type, resource, "createdAt")
VALUES (3, 1, 'body', 'body1', '2019-10-09 08:01:22.080930');
INSERT INTO public.parts ("partId", "shipId", type, resource, "createdAt")
VALUES (4, 1, 'gun', 'gun2', '2019-10-09 08:01:22.080930');


INSERT INTO public.ships ("shipId", name, "bodyId", "sailId", "gunId", "resource", "createdAt")
VALUES (1, 'Стартовый корабль', 3, 2, 1, 'ship1', '2019-10-09 08:02:03.509102');

INSERT INTO public.chests ("chestId", name, "timeToOpen", "openImmediatlyPrice", resource, "createdAt")
VALUES (1, 'Тестовый сундук', 60, 5, 'chest1', '2019-10-15 09:24:43.524526');

INSERT INTO public.chests_loot ("lootId", "chestId", "dropChance", "partId", gold, crystals, count, "createdAt")
VALUES (1, 1, 10, -1, 60, 10, 1, '2019-10-15 09:25:18.881788');
INSERT INTO public.chests_loot ("lootId", "chestId", "dropChance", "partId", gold, crystals, count, "createdAt")
VALUES (2, 1, 10, -1, 0, 10, 1, '2019-10-15 09:25:18.881788');

