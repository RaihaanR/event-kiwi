INSERT INTO
  "events" (
    "event_name",
    "start_datetime",
    "end_datetime",
    "location",
    "description",
    "society_id",
    "event_image_src",
    "privacy"
  )
VALUES
  (${name}, ${start}, ${end}, ${location}, ${desc}, ${sid}, ${img}, ${priv})
RETURNING
  *