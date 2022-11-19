const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

// add todo
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user.id
  const name = req.body.name
  return Todo.create({ name, UserId: userId })
  .then(() => res.redirect('/'))
  .catch(error => console.error(error))
})

// show todo detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  return Todo.findOne({ where: { id, UserId: userId }})
  .then(todo => res.render('detail', { todo: todo.toJSON()}))
  .catch(error => console.log(error))
})

module.exports = router