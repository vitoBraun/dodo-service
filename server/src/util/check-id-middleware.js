const {
  Types: { ObjectId }
} = require('mongoose')

module.exports.checkId = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).send('Некорректный id')
  } else {
    next()
  }
}
