INSERT INTO
  "interests"
VALUES
  (
    ${user_id}, ARRAY[LOWER(REPLACE(${tag}, ' ', ''))]
  )
  ON CONFLICT (
    "user_id"
  ) DO
  UPDATE
  SET
    "tags" = array_append("interests"."tags", LOWER(REPLACE(${tag}, ' ', '')))
  WHERE
    NOT (REPLACE(${tag}, ' ', '') ILIKE ANY("interests"."tags"))
