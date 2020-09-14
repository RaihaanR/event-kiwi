UPDATE
  "events"
SET
  "event_name" = ${name},
  "start_datetime" = ${start},
  "end_datetime" = ${end},
  "location" = ${location},
  "description" = ${desc},
  "event_image_src" = ${img},
  "privacy" = ${priv}
WHERE
  "event_id" = ${eid}