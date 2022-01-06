const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const cohort = process.argv[2];

pool.query(`
SELECT teachers.name as teacher, cohorts.name as cohort 
FROM assistance_requests
JOIN teachers ON assistance_requests.teacher_id = teachers.id
JOIN students ON assistance_requests.student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
GROUP BY teachers.name, cohorts.name
ORDER BY teachers.name;
`, [`%${cohort}%`])
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort} was assisted by teacher ${teacher.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));