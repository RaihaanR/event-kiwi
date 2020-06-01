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
  "event_name" ILIKE ${pattern}
  OR "society_name" ILIKE ${pattern}
  OR "short_name" ILIKE ${pattern}
  OR ${search_term} = ANY("tags")
