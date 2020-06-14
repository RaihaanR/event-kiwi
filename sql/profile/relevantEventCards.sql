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
  LEFT OUTER JOIN "memberships" ON (
    "societies"."society_id" = "memberships"."society_id"
    AND "user_id" = ${user_id}
  )
WHERE
  ${condition:raw}
ORDER BY
  ts_rank_cd(
    to_tsvector(array_to_string("tags", ' ')),
    to_tsquery(replace(array_to_string((SELECT "tags" FROM "interests" WHERE "user_id" = ${user_id}), ' '), ' ', ' | ')),
    8
  ) DESC
LIMIT 18 OFFSET ${offset}
