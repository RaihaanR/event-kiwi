INSERT INTO
  "event_registrations"
VALUES
  (
    ${event_id}, ${user_id}, ${status}
  )
ON CONFLICT
  (
    "event_id", "user_id"
  )
DO UPDATE SET
  "status" = EXCLUDED.status