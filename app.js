const express = require('express')
const app = express();
const weatherRoutes = require('./routes/applicationRoutes');

app.get('/api', function (req, res) {
    console.log('received request /api2');
    res.send('<b>My</b> first express http server');
});

app.use('/api/weather', weatherRoutes);

if(process.env.NOT_PASSENGER)
{
    app.listen(3000);
}
else{
    app.listen('passenger');
}

console.log(`running with key ${process.env.KEY}`);