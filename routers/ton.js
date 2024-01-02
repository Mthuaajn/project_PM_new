const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('baocao/ton', { title: 'Book Management' });
});

module.exports = router;