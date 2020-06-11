UPDATE
  "files"
SET
  "download_count" = "download_count" + 1
WHERE
  "bucket_key" = ${key}