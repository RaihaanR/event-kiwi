UPDATE
  "interests"
SET
  "tags" = array_remove("tags", LOWER(${tag})::varchar)
WHERE
  "user_id" = ${user_id}
