DELETE FROM
  "events_files"
WHERE
  "event_id" = ${eid} AND
  "file_id" IN (
    SELECT
      "file_id"
    FROM
      "files"
    WHERE
      "bucket_key" IN (${keys:csv})
  )