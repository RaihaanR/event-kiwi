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
    "tags" = array_append("interests"."tags", LOWER(${tag}))
  WHERE
    NOT (${tag} ILIKE ANY("interests"."tags"))
