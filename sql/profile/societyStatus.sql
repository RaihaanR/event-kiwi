INSERT INTO
  "memberships"
VALUES
  (
    ${user_id}, ${society_id}, ${type}
  )
  ON CONFLICT (
    "user_id",
    "society_id"
  ) DO
  UPDATE
  SET
    "type" = ${type}
