const express = require('express');

const postController = require('../controllers/postcontroller');
const protect = require('../middleware/authmiddleware')
const router = express.Router();

router.route('/').get(protect.protect, postController.getAllPosts).post(protect.protect, postController.createPost)

router.route('/:id').get(protect.protect, postController.getOne).patch(protect.protect, postController.updatePost).delete(protect.protect, postController.deletePost);

module.exports = router;