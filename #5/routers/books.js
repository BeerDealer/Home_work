const express = require("express");
const router = express.Router();
const storage = require("../utils/storage");


router.get("/books", (_, response) => {
    const stor = new storage();
    try {
        const { bookshelf } = stor.getData();
        response.json(bookshelf);
    }
    catch(err) {
        response.json(err);
        response.status(404);
    }
    
});


module.exports = router;