SELECT
  "tag",
  COUNT(*)
FROM
  "interests"
  CROSS JOIN UNNEST("tags") AS "tag"
WHERE
  "tag" ILIKE ANY(${pattern})
GROUP BY
  "tag"
ORDER BY
  "count" DESC
