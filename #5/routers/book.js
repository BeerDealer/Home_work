const express = require("express");
const router = express.Router();
const storage = require("../utils/storage");


router.get("/books/:id", (query, response) => {
	const stor = new storage();
	const { id } = query.params;
	try {
		const book = stor.getDataById(id);
		response.json(book);
	}
	catch(err) {
		response.status(404);
		response.json("Book not found");
	}
});


module.exports = router;