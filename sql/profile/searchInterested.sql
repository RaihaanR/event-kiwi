SELECT
  "tag",
  COUNT(*)
FROM
  "interests"
  CROSS JOIN UNNEST("tags") AS "tag"
WHERE
  "tag" ILIKE ANY(ARRAY${pattern})
GROUP BY
  "tag"
ORDER BY
  "count" DESC
