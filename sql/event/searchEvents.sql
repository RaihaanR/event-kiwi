SELECT
  "events"."event_id",
  "events"."event_name",
  "events"."start_datetime",
  "events"."end_datetime",
  "events"."location",
  "events"."event_image_src",
  "event_tags"."tags",
  "societies".*
FROM
  "events"
  INNER JOIN "event_tags" USING ("event_id")
  INNER JOIN "societies" USING ("society_id")
WHERE
  to_tsvector("event_name") @@ to_tsquery(LOWER(${prefix_pattern}))
  OR "society_name" ILIKE ${pattern}
  OR "short_name" ILIKE ${pattern}
  OR to_tsvector(array_to_string("tags", ' ')) @@ to_tsquery(LOWER(${search_term}))
ORDER BY
  (
    ts_rank_cd(to_tsvector("event_name"), to_tsquery(LOWER(${prefix_pattern}))) +
    (CASE WHEN "society_name" ILIKE ${pattern} THEN 1 ELSE 0 END) +
    (CASE WHEN "short_name" ILIKE ${pattern} THEN 1 ELSE 0 END) +
    ts_rank_cd(to_tsvector(array_to_string("tags", ' ')), to_tsquery(LOWER(${search_term})))
  ) DESC
