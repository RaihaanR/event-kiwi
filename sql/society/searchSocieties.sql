SELECT
  "societies".*,
  COALESCE("memberships"."type", 0) AS "following",
  (SELECT COUNT(*) FROM "memberships" WHERE "type" > 0 AND "society_id" = "societies"."society_id") AS "total_followers"
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
