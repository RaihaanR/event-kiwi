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
  INNER JOIN (
    SELECT
      "user_id",
      "societies"."society_id",
      replace(array_to_string("tags", ' '), ' ', ' | ') AS "int_tags"
    FROM
      "memberships"
      INNER JOIN "interests" USING ("user_id")
      RIGHT OUTER JOIN "societies" ON (
        "memberships"."society_id" = "societies"."society_id"
        AND "user_id" = ${user_id}
      )
  ) AS "match" USING ("society_id")
WHERE
  "end_datetime" > now()
ORDER BY
  CASE WHEN "user_id" IS NOT NULL
    THEN ts_rank_cd(to_tsvector(array_to_string("tags", ' ')), to_tsquery("int_tags"), 8)
    ELSE -1
  END DESC
LIMIT 18 OFFSET ${offset}
