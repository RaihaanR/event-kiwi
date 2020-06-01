SELECT
  *
FROM
  (
    SELECT
      *
    FROM
      "events"
    WHERE
      "event_id" = ${event_id}
  ) AS "events"
  INNER JOIN "societies" USING ("society_id")
