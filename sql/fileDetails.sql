SELECT
  display_name,
  bucket_key
FROM
  file
WHERE
  file_id IN (${file_ids:csv})
