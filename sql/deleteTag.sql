UPDATE
  "event_tags"
SET
  "tags" = array_remove("tags", ${tag})
WHERE
  "event_id" = ${event_id}
