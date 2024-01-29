// server.mjs
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'; // Import the cors middleware
import fs from 'fs/promises';
import path from 'path';
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const app = express();
const port = 3500;
app.use(cors({ origin: [ "*","http://127.0.0.1:5500"] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
class Verse {
    constructor(verse) {
        this.verse = verse
        this.hearts = 0;
    }
}
app.get('/Heart/:verse', async (req, res) => {
    try {
        const verse = req.params.verse;
        console.log(verse)
        // Replace the following line with the actual logic to fetch data
        const responseData = { data: "SomeData" };

        // Send JSON response
        // res.json(responseData);

        // Or send plain text response
        res.send(responseData.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
