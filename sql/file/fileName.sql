SELECT
  "display_name"
FROM
  ${ft:name}
WHERE
  "bucket_key" = ${bucket_key}
