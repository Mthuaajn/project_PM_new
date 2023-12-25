const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('sach/timkiemsach', { title: 'Book Management' });
});

module.exports = router;