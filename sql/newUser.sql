INSERT INTO
  "users" (
    "auth_id",
    "firstname",
    "surname",
    "email"
  )
VALUES
  (
    ${auth_id}, ${first_name}, ${last_name}, ${email}
  )
RETURNING
  *
