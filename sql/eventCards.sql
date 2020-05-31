SELECT
  event.event_id,
  event.event_name,
  event.start_datetime,
  event.end_datetime,
  event.location,
  event.event_image_src,
  event.tags,
  society.*
FROM
  event
  INNER JOIN society USING (society_id)
