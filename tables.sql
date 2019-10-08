CREATE TABLE "accounts" (
  "accountId"  SERIAL  NOT NULL,
  "type"       text    NOT NULL,
  "data"       json    NOT NULL,
  "userId"    serial   NOT NULL
);

CREATE TABLE "users" (
  "userId"       SERIAL            NOT NULL,
  "name"         character varying NOT NULL,
  "passwordHash" character varying NOT NULL,
  "level"        integer           NOT NULL,
  "xp"           integer           NOT NULL,
  "isBanned"     boolean           NOT NULL
);

CREATE TABLE "sessions" (
  "sessionId"  SERIAL            NOT NULL,
  "sessionKey" character varying NOT NULL,
  "expiredAt"  TIMESTAMP         NOT NULL
);
