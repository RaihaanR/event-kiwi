SELECT
 "joined".*,
 COALESCE("event_registrations"."status", 0) AS "status"
FROM
  (
    SELECT
      *
    FROM
      "societies"
      INNER JOIN "events" USING ("society_id")
    WHERE
      "societies"."society_id" IN
        (
          SELECT
            "society_id"
          FROM
            "memberships"
          WHERE
            "user_id" = ${uid} AND
            "type" > 0
        )
      OR "societies"."society_id" IN
        (
          SELECT
            "society_id"
          FROM
            "societies"
          WHERE
            "owner" = ${uid}
        )
      OR "events"."event_id" IN
        (
          SELECT
            "event_id"
          FROM
            "event_registrations"
          WHERE
            "user_id" = ${uid} AND
            "status" > 0
        )
  ) AS "joined" LEFT OUTER JOIN
    (
      SELECT
        *
      FROM
        "event_registrations"
      WHERE
        "user_id" = ${uid}
    ) AS "event_registrations" USING ("event_id")
ORDER BY
  "joined"."start_datetime"