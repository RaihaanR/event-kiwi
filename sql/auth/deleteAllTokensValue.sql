DELETE FROM
  "tokens"
WHERE
  "user_id" IN (
    SELECT
      "user_id"
    FROM
      "tokens"
    WHERE
      "val" = ${token}
  )
