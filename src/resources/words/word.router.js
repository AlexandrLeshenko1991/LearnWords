const router = require('express').Router();
const WordsModel = require('./word.model');
const wrapAsync = require('../../utils/wrapAsync');
const { MAX_PER_PAGE, PER_PAGE } = require('../../common/config');
const { BadRequest } = require('../../errors/appErrors');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const page = req.query.page ? +req.query.page : 0;
    const perPage =
      req.query.perPage && req.query.perPage <= MAX_PER_PAGE
        ? +req.query.perPage
        : PER_PAGE;

    if (isNaN(page) || isNaN(perPage)) {
      throw new BadRequest(
        'Wrong query parameters, the page and per page numbers should be valid integers'
      );
    }

    WordsModel.find()
      .limit(perPage)
      .skip(page * perPage)
      .exec({}, (err, docs) => {
        if (!err) {
          res.status(200).send(docs);
        } else {
          throw err;
        }
      });
  })
);

router.route('/count').get(
  wrapAsync(async (req, res) => {
    WordsModel.countDocuments({}, (err, count) => {
      if (!err) {
        res.status(200).send({ count });
      } else {
        throw err;
      }
    });
  })
);

module.exports = router;