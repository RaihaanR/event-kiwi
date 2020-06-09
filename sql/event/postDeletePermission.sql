SELECT
  *
FROM
  "posts"
  INNER JOIN "societies" USING ("society_id")
WHERE
  "societies"."owner" = ${uid} AND
  "posts"."post_id" = ${pid}