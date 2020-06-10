SELECT
  "files"."display_name",
  "files"."bucket_key",
  COALESCE (
    json_agg(json_build_object(
      'id', "events"."event_id",
      'name', "events"."event_name"
    )) FILTER (WHERE "events"."event_id" IS NOT NULL),
    '[]'
  ) AS "events"
FROM
  (SELECT
    *
  FROM
    "files"
  WHERE
    "society_id" = ${society_id}) AS "files"
  LEFT OUTER JOIN (
    "events_files"
    INNER JOIN "events" USING ("event_id")
  ) USING ("file_id")
GROUP BY
  "files"."display_name",
  "files"."file_id",
  "files"."bucket_key"