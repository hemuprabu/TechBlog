const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const withAuth = require('../utils/auth');
const dayjs = require('dayjs');

// Display dashboard
router.get('/',withAuth, async (req, res) => {
    try {
        //const createdAt = dayjs().format('MM-DD-YYYY');
        const blogPostData = await BlogPost.findAll();
        const blogPosts= blogPostData.map(post => post.get({plain:true}));
        res.render('dashboard', {blogPosts, logged_in: true});
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Display new post form
  router.get('/new', async (req, res) => {
    res.render('newpost');
  });
  
  // Create new post
  router.post('/new',withAuth, async (req, res) => {
    const { title, content } = req.body;
    try {
        
        await BlogPost.create({ title, content, author:req.session.name });
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Display edit post form
  router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const postData = await BlogPost.findByPk(id);
        const post= postData.get({plain:true});
        res.render('editpost', { post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Update post
  router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    try {
        await BlogPost.update({ title, content }, { where: { id } });
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Delete post
  router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await BlogPost.destroy({ where: { id } });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
  });


  module.exports= router;