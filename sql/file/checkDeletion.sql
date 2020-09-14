SELECT
  *
FROM
  "files" INNER JOIN
  "societies" USING ("society_id")
WHERE
  "files"."bucket_key" = ${bucket_key} AND
  "societies"."owner" = ${user_id}
