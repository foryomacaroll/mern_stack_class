const express = require('express')
const Blog = require('../models/Blogs');
const BlogController = require('../controllers/BlogController');
const router = express.Router()

// Remove /blogs for refactoring ==> add in app.js ==> ('/blogs',blogRoutes)

router.get("", BlogController.index);
router.post("", BlogController.store);
router.get("/create", BlogController.create);
router.get('/:id/delete', BlogController.destroy)
router.get('/:id', BlogController.show)

module.exports = router