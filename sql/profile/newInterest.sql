INSERT INTO
  "interests"
VALUES
  (
    ${user_id}, ARRAY[LOWER(${tag})::varchar]
  )
  ON CONFLICT (
    "user_id"
  ) DO
  UPDATE
  SET
    "tags" = array_append("interests"."tags", LOWER(${tag})::varchar)
  WHERE
    NOT ${tag}::varchar ILIKE ANY("interests"."tags")
