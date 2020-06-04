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
  to_tsvector("event_name") @@ to_tsquery(${prefix_pattern})
  OR to_tsvector("society_name") @@ to_tsquery(${prefix_pattern})
  OR to_tsvector("short_name") @@ to_tsquery(${prefix_pattern})
  OR to_tsvector(array_to_string("tags", ' ')) @@ to_tsquery(${search_term})
ORDER BY
  (
    ts_rank_cd(to_tsvector("event_name"), to_tsquery(${prefix_pattern}), 16) +
    ts_rank_cd(to_tsvector("society_name"), to_tsquery(${prefix_pattern})) +
    ts_rank_cd(to_tsvector("short_name"), to_tsquery(${prefix_pattern})) +
    ts_rank_cd(to_tsvector(array_to_string("tags", ' ')), to_tsquery(${search_term}), 8)
  ) DESC
