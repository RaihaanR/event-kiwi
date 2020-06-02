SELECT
  "societies"."society_image_src",
  "societies"."short_name",
  "memberships"."type"
FROM
  "societies"
  INNER JOIN "memberships" USING ("society_id")
WHERE
  "user_id" = ${user_id}
