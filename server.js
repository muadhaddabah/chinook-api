// import dependencies -express and cors
const express = require('express')
const cors = require('cors')

// created instance of express
const app = express()

// added middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// customer routes
app.use('/api/customers', require('./src/api/routes/customers'))
app.use('/api/albums', require('./src/api/routes/albums'))
app.use('/api/artists', require('./src/api/routes/artists'))
app.use('/api/employees', require('./src/api/routes/employees'))
app.use('/api/genres', require('./src/api/routes/genres'))
app.use('/api/invoices', require('./src/api/routes/invoices'))
app.use('/api/invoice_items', require('./src/api/routes/invoice_items'))
app.use('/api/playlists', require('./src/api/routes/playlists'))
app.use('/api/tracks', require('./src/api/routes/tracks'))
app.use('/api/media_types', require('./src/api/routes/media_types'))


app.listen(3005, "127.0.0.1", () => console.log("server running on 3005"))
