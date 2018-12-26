const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Product = require('../models/product');
const router = express.Router();

const fetch = require('node-fetch');



router.get('/', (req, res) => {
    res.render('index', { user : req.user });
});

router.get('/glitchy', (req, res) => {
    res.render('glitchy', { user : req.user });
});

router.get('/register', (req, res) => {
    res.render('register', { });
});


router.get('/purchase',isLoggedIn, (req, res)=>{
    Product.find().then((productsFromDatabase)=> {
        console.log(productsFromDatabase);
        res.render('purchase', {allProducts:productsFromDatabase, user : req.user});
    });

    
});


router.post('/register', (req, res, next) => {
    Account.register(new Account({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});








router.get('/profile',isLoggedIn, (req, res) => { 
    
  
    res.render('profile', {user: req.user});      
    
});





router.get('/login', (req, res) => {
    res.render('login', { user : req.user, error : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/profile');
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/detail/:id', (req, res) => {
    Product.findById(req.params.id).then((productsFromDatabase)=> {
        console.log(productsFromDatabase,"good");
        console.log(productsFromDatabase.images,"good");
        console.log(productsFromDatabase.name,"good");
            res.render('details', { 
                user : req.user, 
                error : req.flash('error'), 
                id:req.params.id,
                imagename:"batwing", 
                name:productsFromDatabase.name,
               images:productsFromDatabase.images 
               // [
                //    "batwing1.png","batwing2.png","batwing3.png"
              //  ]
             });
    })
});


router.get('/request',isLoggedIn, (req, res) => {
    res.render('request', { user : req.user, error : req.flash('error')});
});




module.exports = router;


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}