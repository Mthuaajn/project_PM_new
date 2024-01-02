const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('tuychinh/quydinh', { title: 'Book Management' });
});

module.exports = router;