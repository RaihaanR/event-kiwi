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
  INNER JOIN "event_tags" USING ("event_id")
  INNER JOIN "societies" USING ("society_id")
