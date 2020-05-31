SELECT *
FROM
  (SELECT *
   FROM event
   WHERE event_id = ${event_id}) as event
INNER JOIN society USING (society_id)
