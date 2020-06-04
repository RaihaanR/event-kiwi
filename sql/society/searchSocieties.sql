SELECT
  "societies".*,
  COALESCE("memberships"."type", 0) AS "following"
FROM
  (
    SELECT
      *
    FROM
      "memberships"
    WHERE
      "user_id" = ${user_id}
  ) AS "memberships"
  RIGHT OUTER JOIN
  (
    SELECT
      *
    FROM
      "societies"
    WHERE
      "society_name" ILIKE ${pattern}
      OR "short_name" ILIKE ${pattern}
  ) AS "societies"
  USING ("society_id")
