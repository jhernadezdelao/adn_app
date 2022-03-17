const  {Router} = require ('express');
const  adnController = require ('../controllers/adn.controller');
const  { verifyToken,isAdmin } = require ("../middlewares/authJwt");


const router = Router();

router.post('/mutation',verifyToken,adnController.checkAdn)
router.get('/getAdn',[verifyToken, isAdmin],adnController.getAdn)

module.exports = router;