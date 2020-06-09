SELECT
  *
FROM
  "events"
  INNER JOIN "societies" USING ("society_id")
WHERE
  "events"."event_id" = ${eid} AND
  "societies"."owner" = ${uid}