UPDATE
  "event_tags"
SET
  "tags" = ARRAY [${tags:csv}]
WHERE
  "event_id" = ${eid}