const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

let reviews = [];

// Set the URL of the website to scrape
const url = "https://www.oferteo.pl/zulak-marek-pazdan/firma/127181";

// Define a function to scrape the website and populate the reviews array
function scrapeWebsite() {
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const reviewElements = $(".commentBox");

      const scrapedReviews = reviewElements.map((index, element) => {
        const name = $(element).find("span").text();
        const img = $(element).find("img").attr("src");
        const review = $(element).find(".word-break.no-margin-bottom").text();
        const row = $(element).find(".row:nth-of-type(3)").text().trim();

        return { name, img, review, row };
      });

      reviews = scrapedReviews.toArray();
      console.log("Scraped data");
    } else {
      console.log(error);
    }
  });
}

// Call the scraper function initially and then every 5 minutes
scrapeWebsite();
setInterval(scrapeWebsite, 60 * 60 * 1000);

// Set up an endpoint to return the scraped data
app.get("/reviews", cors(), (req, res) => {
  const cleanedReviews = reviews.map((review) => {
    const nameArray = review.name.split("\n").filter((str) => str.trim());
    const name = nameArray[0];
    const date = nameArray[nameArray.length - 1];
    return {
      review: review.review
        .replace(/(\n|\t|\r)/gm, "")
        .replace(/\s{2,}/g, " ")
        .trim(),
      name: name
        .replace(/(\n|\t|\r)/gm, "")
        .replace(/\s{2,}/g, " ")
        .trim(),
      data: date
        .replace(/(\n|\t|\r)/gm, "")
        .replace(/\s{2,}/g, " ")
        .trim(),
      row: review.row
        .replace(/(\n|\t|\r)/gm, "")
        .replace(/\s{2,}/g, " ")
        .trim(),
      img: review.img,
    };
  });

  res.json(cleanedReviews);
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
