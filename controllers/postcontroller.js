const post = require('../models/postmodel');

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await post.find();

        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        })
    } catch (error) {

        res.status(400).json({
            status: "fail"
        })
    }
}

exports.getOne = async (req, res, next) => {


    try {
        const posto = await post.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                posto
            }
        })
    } catch (error) {

        res.status(400).json({
            status: "fail"
        })
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const posto = await post.create(req.body);

        res.status(200).json({
            status: 'success',
            data: {
                posto
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail"
        })
    }
}

exports.updatePost = async (req, res, next) => {


    try {
        const posto = await post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                posto
            }
        })
    } catch (error) {

        res.status(400).json({
            status: "fail"
        })
    }
}

exports.deletePost = async (req, res, next) => {


    try {
        const posto = await post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success'
        })
    } catch (error) {

        res.status(400).json({
            status: "fail"
        })
    }
}