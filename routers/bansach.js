const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('sach/bansach', { title: 'Book Management' });
});

module.exports = router;