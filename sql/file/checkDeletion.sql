SELECT
  *
FROM
  "files" INNER JOIN
  "societies" USING ("society_id")
WHERE
  "files"."bucket_key" = ${key} AND
  "societies"."owner" = ${uid}