SELECT
  "display_name",
  "bucket_key"
FROM
  ${ft:name}
WHERE
  "file_id" IN (${file_ids:csv})
