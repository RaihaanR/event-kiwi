INSERT INTO
  "interests"
VALUES
  (
    ${user_id}, ARRAY[LOWER(${tag})]
  )
  ON CONFLICT (
    "user_id"
  ) DO
  UPDATE
  SET
    "tags" = array_append("tags", LOWER(${tag}))
  WHERE
    NOT (${tag} ILIKE ANY("tags"))
