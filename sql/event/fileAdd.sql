INSERT INTO
  "events_files" (
    "event_id",
    "file_id"
  )
SELECT
  ${eid},
  "files"."file_id"
FROM
  "files"
WHERE
  "files"."bucket_key" = ${key}
RETURNING
  *