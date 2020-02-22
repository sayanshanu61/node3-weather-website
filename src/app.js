const path  = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for Express cofig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templetes/views')
const partialspath = path.join(__dirname, '../templetes/partials')


//  Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialspath)

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Sayan Panja'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sayan Panja'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sayan Panja'
    })
})




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must privide an address!'
        })
    }

geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
    if (error) {
        return res.send({ error })

    }
     
    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send({ error})
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
        
    }
    )
})

    // res.send({
    //     location: 'India',
    //     forecast: 'clear weather',
    //     address: req.query.address
    // })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sayan pnaja',
        errorMessage: 'Help article not found'
    })
    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sayan Pnaja',
        errorMessage: 'Page not found'
    })
})




// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})