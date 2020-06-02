SELECT
  "events"."event_id",
  "events"."event_name",
  "events"."start_datetime",
  "events"."end_datetime",
  "events"."location",
  "events"."event_image_src",
  "events"."tags",
  "societies".*
FROM
  "events"
  INNER JOIN "societies" USING ("society_id")
WHERE
  ${search_term} ILIKE ANY("tags")
