SELECT
  *
FROM
  "events_files"
  INNER JOIN "files" USING ("file_id")
WHERE
  "events_files"."event_id" = ${eid} AND
  "files"."bucket_key" = ${key}