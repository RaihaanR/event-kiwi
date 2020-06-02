UPDATE
  "interests"
SET
  "tags" = array_append("tags", LOWER(${tag}))
WHERE
  "user_id" = ${user_id}
  AND NOT (${tag} ILIKE ANY("tags"))
