// subject-router.js

const express = require('express');
const router = express.Router();

// router.use((req, res, next) => {
//   res.send('This middlware is specific to /subjects');
// });

router.get('/', (req, res) => {
  res.send('Subjects homepage');
});


router.get('/list', (req, res) => {
  res.send('Subjects list page');
});

module.exports = router;