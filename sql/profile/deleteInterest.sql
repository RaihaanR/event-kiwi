UPDATE
  "interests"
SET
  "tags" = array_remove("tags", LOWER(${tag}))
WHERE
  "user_id" = ${user_id}
