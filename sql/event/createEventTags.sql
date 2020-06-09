INSERT INTO
  "event_tags" (
    "event_id",
    "tags"
  )
VALUES
  (${eid}, ARRAY [${tags:csv}])