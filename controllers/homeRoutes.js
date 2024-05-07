const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const withAuth = require('../utils/auth');
const dayjs = require('dayjs');

router.get( "/", async (req, res) => {
    try {
      

        const blogPostData = await BlogPost.findAll();
        const blogPosts= blogPostData.map(post => post.get({plain:true}))
        res.render('homepage', { 
        blogPosts, 
        // Pass the logged in flag to the template
        logged_in: req.session.logged_in,  });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});




//login
router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    // if (req.session.logged_in) {
    //   res.redirect('/');
    //   return;
    // }
  
    res.render('login');
  });

module.exports= router;