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
  "event_name" ILIKE ANY(${terms})
  OR "society_name" ILIKE ANY(${terms})
  OR "short_name" ILIKE ANY(${terms})
  OR to_tsvector(array_to_string("tags", ' ')) @@ to_tsquery(LOWER(${search_term}))
ORDER BY
  (
    (
      (SELECT COUNT(*) FROM UNNEST(${terms}) WHERE "event_name" ILIKE "unnest") +
      (SELECT COUNT(*) FROM UNNEST(${terms}) WHERE "society_name" ILIKE "unnest") +
      (SELECT COUNT(*) FROM UNNEST(${terms}) WHERE "short_name" ILIKE "unnest")
    ) / ${length} +
    ts_rank_cd(to_tsvector(array_to_string("tags", ' ')), to_tsquery(LOWER(${search_term})))
  ) DESC
