const router = require('express').Router();
let Wishlist = require('../models/wishlist.model');

router.route('/').get((req, res) => {
  Wishlist.find()
    .then(wishlists => res.json(wishlists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const owner = req.body.owner;
  const title = req.body.title;
  const items = req.body.items;

  const newWishlist = new Wishlist({
    owner,
    title,
    items,
  });

  newWishlist.save()
  .then(() => res.json('Wishlist added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Event.findById(req.params.id)
    .then(wishlist => res.json(wishlist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Wishlist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Wishlist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Wishlist.findById(req.params.id)
    .then(wishlist => {
      wishlist.owner = req.body.owner;
      wishlist.title = req.body.title;
      wishlist.items = req.body.items;

      wishlist.save()
        .then(() => res.json('Wishlist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;