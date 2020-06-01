SELECT
  "display_name",
  "bucket_key"
FROM
  (
    SELECT
      "file_id"
    FROM
      "events_files"
    WHERE
      "event_id" = ${event_id}
  ) AS "events_files"
  INNER JOIN "files" USING ("file_id")
