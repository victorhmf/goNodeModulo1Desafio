const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const ageMiddleware = (req, res, next) => {
  !req.query.age ? res.redirect('/') : next()
}

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  const { age } = req.body

  age < 18
    ? res.redirect(`/minor?age=${age}`)
    : res.redirect(`/major?age=${age}`)
})

app.get('/minor', ageMiddleware, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.get('/major', ageMiddleware, (req, res) => {
  res.render('major', { age: req.query.age })
})

app.listen(3000)
