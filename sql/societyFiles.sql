SELECT
  display_name,
  bucket_key
FROM
  file
WHERE
  society_id = ${society_id}
