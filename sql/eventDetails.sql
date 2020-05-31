SELECT
  *
FROM
  (
    SELECT
      *
    FROM
      event
    WHERE
      event_id = ${event_id}
  ) AS event
  INNER JOIN society USING (society_id)
