SELECT
  (
    SELECT
      CASE WHEN ${search_term} ILIKE ANY("tags") THEN TRUE ELSE FALSE END
    FROM
      "interests"
    WHERE
      "user_id" = ${user_id}
  ),
  COUNT(*)
FROM
  "interests"
WHERE
  to_tsvector(array_to_string("tags", ' ')) @@ to_tsquery(${pattern})
