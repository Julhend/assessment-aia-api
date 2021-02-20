const express = require('express')
const app = express.Router()
var axios = require('axios');
const qs = require('querystring');
const { EILSEQ } = require('constants');


app.get('/feeds', async (req, res) => {
    const baseRecent = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&`
    const baseSearch = `https://www.flickr.com/services/rest/?method=flickr.photos.search&`
    const { page, tags } = req.query
    const api_key = process.env.FLICKR_KEY
    const format = `json`
    const nojsoncallback = `1`
    const query = qs.stringify({ api_key, ...req.query, format, nojsoncallback })
    var result;


    if (page && tags) {
        result = await axios.get(`${baseSearch}${query}`)
    }

    else if (tags) {
        result = await axios.get(`${baseSearch}${query}`)
    }
    else if (page) {
        result = await axios.get(`${baseRecent}${query}`)

    }
    else {
        result = await axios.get(`${baseRecent}${query}`)
    }
    let data = result.data
    return res.send(data)

})



module.exports = app



