UPDATE
  "events"
SET
  "tags" = array_append("tags", ${tag})
WHERE
  "event_id" = ${event_id}
  AND NOT (${tag} ILIKE ANY("tags"))
