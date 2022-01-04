SELECT id, name, cohort_id 
FROM students 
WHERE NOT email LIKE '%gmail.com' 
AND phone IS NULL;