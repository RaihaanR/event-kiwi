SELECT
  *
FROM
  "societies"
  INNER JOIN "events" USING ("society_id")
  INNER JOIN "event_registrations" USING ("event_id")
WHERE
  "societies"."society_id" IN (
    SELECT
      "society_id"
    FROM
      "memberships"
    WHERE
      "user_id" = ${uid}
  )
ORDER BY
  "events"."start_datetime"