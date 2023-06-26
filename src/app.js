const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//console.log(__filename)
const app = express()
const port = process.env.PORT || 3000
// Define paths for express config
const publicDirPath = path.join(__dirname, '..', '\\public')
const viewsPath = path.join(__dirname, '..', '\\templates\\views')
const partialsPath = path.join(__dirname, '..', '\\templates\\partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abdel-Rahman'


    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abdel-Rahman'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name:'Abdel-Rahman',
        helpMessage: 'Refresh your browser'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({ error: "You have to provide an address" })
    }
    geocode(req.query.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            res.send({ error })
        }
        else {
            forecast(latitude, longitude, (error2, forecastData) => {
                if (error2) res.send({ 'Error': error2 })
                else res.send({
                    forecast: forecastData.weatherDescribe,
                    location:forecastData.location,
                    address: req.query.address
                })
            })
        }
    })


})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: 'Error 404',
        name: 'Abdel-Rahman',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    // res.send('My 404 page')
    res.render('404', {
        title: 'Error 404',
        name: 'Abdel-Rahman',
        errorMessage: 'My 404 page'
    })

})
app.listen(port, () => {//callback function when the server is running
    console.log('Server is up on port '+port+'.')
})

// app.com
// app.com/hep
// app.com/about