SELECT
  "event_id",
  "event_name",
  "start_datetime",
  "end_datetime",
  "location",
  "event_image_src",
  "tags"
FROM
  "events"
  INNER JOIN "societies" USING ("society_id")
WHERE
  "event_name" ILIKE ${event_name_pattern}
  OR "society_name" ILIKE ${society_name_pattern}
  OR "short_name" ILIKE ${short_name_pattern}
  OR EXISTS (
    SELECT
      *
    FROM
      unnest("tags") AS "tag"
    WHERE
      "tag" ILIKE ANY(${tags_patterns})
  )
