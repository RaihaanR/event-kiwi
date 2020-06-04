SELECT
  *,
  (SELECT "tag" = ANY("tags") FROM "interests" WHERE "user_id" = 3) AS "interested"
FROM
  (
    SELECT
      "tag",
      COUNT(*)
    FROM
      (
        SELECT
          UNNEST("tags") AS "tag"
        FROM
          "interests"
      ) AS "s1_interests"
    WHERE
      "tag" ILIKE ANY(${pattern})
    GROUP BY
      "tag"
  ) AS "s2_interests"
ORDER BY
  "count" DESC
