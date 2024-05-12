const Blog = require('../models/Blog');

exports.getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ state: 'published' });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags, body } = req.body;
    const author = req.userId;
    const blog = await Blog.create({ title, description, tags, body, author });
    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId).populate('author', 'first_name last_name email');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    blog.read_count++;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlogState = async (req, res) => {
  try {
    const { id } = req.params;
    const { state } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    blog.state = state;
    await blog.save();
    res.json({ message: 'Blog state updated successfully', blog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOwnBlogs = async (req, res) => {
  try {
    const { userId } = req;
    const blogs = await Blog.find({ author: userId });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


