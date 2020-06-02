SELECT
  "display_name",
  "bucket_key"
FROM
  "files"
WHERE
  "file_id" IN (${file_ids:csv})
