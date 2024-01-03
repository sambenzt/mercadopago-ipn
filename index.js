const fs = require('fs')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const logfile = 'project.log';
const log = require('simple-node-logger').createSimpleLogger(logfile);

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const controller = (req, res) => {
    const data = {
        url: req.originalUrl,
        method: req.method,
        body: req.body
    }
    log.info(JSON.stringify(data))
    res.send({message: 'ok'})
}

app.get('/mercadopago-ipn', controller)
app.post('/mercadopago-ipn', controller)
app.get('/logs', (req, res) => res.sendFile(__dirname + '/' + logfile))
app.delete('/logs', (req, res) => {
    fs.writeFile(__dirname + '/' + logfile, '', (err) => {})
    res.send({message: 'ok'})
})

app.listen(3355, () => {
    console.log('App listening on port 3355')
})