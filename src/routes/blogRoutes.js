const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { verifyToken } = require("../middleware/authMiddleware");
const { paginateResults } = require('../middleware/paginationMiddleware');
const Blog = require('../models/Blog');

router.get("/published", blogController.getPublishedBlogs);
router.post("/", verifyToken, blogController.createBlog);
router.get("/:id", blogController.getBlogById);
router.post('/', verifyToken, blogController.createBlog);
router.get('/', paginateResults(Blog), blogController.getPublishedBlogs);
router.get('/own', verifyToken, blogController.getOwnBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id/state', verifyToken, blogController.updateBlogState);
router.delete('/:id', verifyToken, blogController.deleteBlog);

module.exports = router;
