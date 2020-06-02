UPDATE
  "events"
SET
  "tags" = array_remove("tags", ${tag})
WHERE
  "event_id" = ${event_id}
