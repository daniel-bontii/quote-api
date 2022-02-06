const express = require('express');
const morgan = require('morgan');
const app = express();


const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

if(process.env.NODE_ENV === 'production') {
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res) => {
  res.send({
    quote: getRandomElement(quotes),
  })
})

app.get('/api/quotes', (req, res) => {
  if(req.query.person){
    const chosen = quotes.filter(quote => quote.person === req.query.person);
     res.send({
      quotes: chosen,
    })
  }else {
     res.send({
    quotes,
  })
  }
})

app.post('/api/quotes', (req, res) => {
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person,
  }
  if(newQuote && newQuote.quote && newQuote.person) {
    res.status(200).send({
      quote: newQuote,
    })
  } else {
    res.status(400).send();
  } 
})

app.listen(PORT, ()=> {
  console.log(`Server listening on PORT ${PORT}`)
})

