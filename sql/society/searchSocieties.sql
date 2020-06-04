SELECT
  "socs".*,
  COALESCE("ms"."type", 0) AS "following"
FROM
  (
    SELECT
      *
    FROM
      "memberships"
    WHERE
      "user_id" = ${uid}
  ) "ms"
  RIGHT OUTER JOIN
  (
    SELECT
      *
    FROM
      "societies"
    WHERE
      "society_name" ILIKE ${pattern}
      OR "short_name" ILIKE ${pattern}
  ) "socs"
  USING ("society_id")