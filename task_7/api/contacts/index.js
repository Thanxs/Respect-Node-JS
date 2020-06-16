const { Router } = require("express");
const router = Router();
const { isAuthorized, isAdmin } = require('../middlewares');

router.get('/', isAuthorized, (req, res) => {
    res.send('Only for authirized!');
});

router.get('/admin', isAdmin, (req, res) => {
    res.render('admin', { });
})

module.exports = router;