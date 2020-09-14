SELECT
  *
FROM
  "posts"
  INNER JOIN "societies" USING ("society_id")
WHERE
  "event_id" = ${event_id}
  AND "post_id" > ${start}
ORDER BY
  "posts"."post_time" DESC
