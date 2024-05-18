const whitelist = ["https://website.com", "http://127.0.0.1:5500", "http:/localhost:8090"];

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if(whitelist.includes(origin)){
        res.headers('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials