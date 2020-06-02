SELECT
  *
FROM
  "users"
  INNER JOIN (
    SELECT
      "user_id"
    FROM
      "tokens"
    WHERE
      "val" = ${token}
  ) AS "tokens" USING ("user_id")
