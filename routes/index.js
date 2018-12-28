const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const Product = require('../models/product');
const Story = require('../models/story');

const uploadCloud = require('../config/cloudinary.js');

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
        //console.log(productsFromDatabase);
        res.render('purchase', {allProducts:productsFromDatabase, user : req.user});
    });

    
});


router.post('/register', (req, res, next) => {
    Account.register(new Account({ username : req.body.username }), req.body.password, (err, account) => {
        if (err) {
          return res.json({ error : err.message });
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
    Story.find({owner:req.user._id}).then(stories=>{
        
        res.render('profile', {
            user: req.user,
            stories: stories
        });      
    
    });
  
    
});

router.get('/delete/:id',isLoggedIn, (req, res) => {
    Story.findByIdAndRemove(req.params.id).then(remove=>{

    
    res.redirect('/profile')
  });
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

router.get('/detail/:creatureid', isLoggedIn, (req, res) => {
    Product.findById(req.params.creatureid).then((productsFromDatabase)=> {
       // console.log(productsFromDatabase,"good");
        //console.log(productsFromDatabase.images,"good");
        //console.log(productsFromDatabase.name,"good");
        Story.find({creatureId:req.params.creatureid}).then(stories=>{
            res.render('details', { 
                user : req.user, 
                error : req.flash('error'), 
                id:req.params.creatureid,
                imagename:"batwing", 
                name:productsFromDatabase.name,
                images:productsFromDatabase.images,
                stories: stories
             });
            })
    })
});

// router.post("/detail/:creatureid",   uploadCloud.single("the-profile-pic"), (req, res) =>{
//     console.log("insubmitForm?", req.body, req.file);
//     //http://res.cloudinary.com/dfvzao4hk/image/upload/v1545943704/samples/008-SA.JPG.jpg
//     Product.findOne({_id:req.params.creatureid}, function (err, creature){
//         let story= req.body; 
//         story.owner= req.user._id;
     
//       creature.stories.push(story)
//       creature.save(function (err) {
//         if(err) {
//             console.error('ERROR!', err);
//         }
//         res.redirect("back")
//       });
//     });
   
// }); 


router.post("/detail/:creatureid",  [isLoggedIn, uploadCloud.single("the-profile-pic")], (req, res) =>{
    console.log("insubmitForm?", req.body, req.file, 'end');
    let content = req.body;
    if (req.file){
        content.image = req.file.url;
    }else{
        content.image="../images/armbond1.png"
    }
    
    let story = new Story({content:content})
    story.creatureId = req.params.creatureid;
    story.owner = req.user._id;
    story.save(function (err) {
        if(err) {
            console.error('ERROR!', err);
        }
        res.redirect("back")
    }) 

    //http://res.cloudinary.com/dfvzao4hk/image/upload/v1545943704/samples/008-SA.JPG.jpg

   
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
