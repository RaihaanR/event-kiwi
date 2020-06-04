SELECT
  "tag",
  COUNT(*)
FROM
  (
    SELECT
      UNNEST("tags") AS "tag"
    FROM
      "interests"
  ) AS "interests"
WHERE
  "tag" ILIKE ANY(${pattern})
GROUP BY
  "tag"
ORDER BY
  "count" DESC
