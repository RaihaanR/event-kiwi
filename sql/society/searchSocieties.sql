SELECT
  *
FROM
  "societies"
WHERE
  "society_name" ILIKE ${pattern}
  OR "short_name" ILIKE ${pattern}
