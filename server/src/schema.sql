DROP TABLE IF EXISTS "items";

CREATE TABLE "items"
(
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    "description" TEXT NOT NULL,
    deadline TIMESTAMP,
    completed_at TIMESTAMP
);
