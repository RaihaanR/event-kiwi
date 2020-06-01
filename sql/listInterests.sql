SELECT
  tags.val
FROM
  tags
INNER JOIN
  interests ON tags.tag_id = interests.tag_id
WHERE
  interests.user_id = ${uid}