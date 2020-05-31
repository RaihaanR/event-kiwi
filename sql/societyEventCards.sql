SELECT event_id,
       event_name,
       start_datetime,
       end_datetime,
       location,
       society_id,
       event_image_src,
       tags
FROM event
${condition:raw}
