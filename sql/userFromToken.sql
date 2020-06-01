SELECT
  users.*
FROM
  users
INNER JOIN
  token ON token.user_id=users.user_id
WHERE
  token.val = ${token}