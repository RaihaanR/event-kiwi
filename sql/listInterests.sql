SELECT
  "tags"."val"
FROM
  "tags"
  INNER JOIN "interests" USING ("tag_id")
WHERE
  "user_id" = ${user_id}
