INSERT INTO
  "posts" (
    "event_id",
    "society_id",
    "body"
  )
VALUES
  (${eid}, ${sid}, ${body})
RETURNING
  *