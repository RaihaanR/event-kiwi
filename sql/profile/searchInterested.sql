SELECT
  "tag",
  COUNT(*)
FROM
  "interests"
  CROSS JOIN UNNEST("tags") AS "tag"
WHERE
  "tag" ILIKE ${pattern}
GROUP BY
  "tag"
ORDER BY
  "count" DESC
