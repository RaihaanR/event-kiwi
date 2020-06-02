SELECT
  "status"
FROM
  "event_registrations"
WHERE
  "event_id" = ${event_id}
  AND "user_id" = ${user_id}
