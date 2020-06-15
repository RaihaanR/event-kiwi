SELECT
  "events"."event_id"
FROM
  "events"
  INNER JOIN "societies" USING ("society_id")
WHERE
  "events"."event_id" IN (${eids:csv})
  AND (
    "events"."privacy" = 3
    OR "societies"."owner" = ${uid}
    OR (
      "events"."privacy" = 1
      AND EXISTS (
        SELECT
          *
        FROM
          "societies"
        WHERE
          "owner" = ${uid}
      )
    )
  )