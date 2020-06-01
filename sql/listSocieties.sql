SELECT
  societies.society_image_src,
  societies.short_name,
  memberships.type
FROM
  societies
INNER JOIN
  memberships ON societies.society_id = memberships.society_id
WHERE
  memberships.user_id = ${uid}