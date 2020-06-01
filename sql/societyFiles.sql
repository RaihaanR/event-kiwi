SELECT
  "display_name",
  "bucket_key"
FROM
  "files"
WHERE
  "society_id" = ${society_id}
