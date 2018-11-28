import express from 'express';
import PagesController from '../controllers/pagesControllers';
let router = express.Router();
router.get('/login', PagesController.getHomePage);
router.get('/pages/:page', PagesController.getPage);
export default router;