SELECT
  display_name,
  bucket_key
FROM
  (
    SELECT
      file_id
    FROM
      event_file
    WHERE
      event_id = ${event_id}
  ) AS event_file
  INNER JOIN file USING (file_id)
