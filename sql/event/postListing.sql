SELECT
  *
FROM
  posts
  INNER JOIN societies USING (society_id)
WHERE
  event_id = ${eid} AND
  post_id > ${start}