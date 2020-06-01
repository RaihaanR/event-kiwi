INSERT INTO
  "users" (
    "auth_id",
    "firstname",
    "surname",
    "email"
  )
VALUES
  (
    ${auth_id}, ${firstname}, ${surname}, ${email}
  )
RETURNING
  *
