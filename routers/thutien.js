const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('khach_hang/thutien', { title: 'Book Management' });
});

module.exports = router;