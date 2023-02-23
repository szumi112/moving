const express = require("express");
const mongoose = require("mongoose");
const app = express();
const request = require("request");
const cheerio = require("cheerio");
const cors = require("cors");
app.use(express.json());
app.use(cors());

const ReviewsModel = require("./models/Reviews");

const uri =
  "mongodb+srv://szumi112:szumek112@clusternamemoving.lmhhmty.mongodb.net/?retryWrites=true&w=majority";

// const dbName = "dbName";
// const colName = "colName";

mongoose.set("strictQuery", false);

mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("connected to mongodb");
  }
);

app.get("/", async (req, res) => {
  request(
    "https://www.oferteo.pl/zulak-marek-pazdan/firma/127181",
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const reviewElements = $(".commentBox");

        const reviews = [];

        reviewElements.each((index, element) => {
          const name = $(element).find("span").text();
          const img = $(element).find("img").attr("src");
          const review = $(element).find(".word-break.no-margin-bottom").text();
          const row = $(element).find(".row").eq(2).text().trim();

          const fullReview = new ReviewsModel({
            name: name,
            img: img,
            review: review,
            row: row,
          });
          reviews.push(fullReview);
        });

        ReviewsModel.insertMany(reviews)
          .then(() => {
            res.send("Inserted data");
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send("Error inserting data");
          });
      } else {
        console.log(error);
        res.status(500).send("Error retrieving data");
      }
    }
  );
});

app.get("/reviews", cors(), async (req, res) => {
  try {
    const reviews = await ReviewsModel.find();

    const cleanedReviews = reviews.map((review) => {
      const nameArray = review.name.split("\n").filter((str) => str.trim());
      const name = nameArray[0];
      const date = nameArray[nameArray.length - 1];
      return {
        _id: review._id,
        review: review.review
          .replace(/(\n|\t|\r)/gm, "") // Remove all newlines, tabs, and carriage returns
          .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
          .trim(), // Remove leading and trailing spaces
        name: name
          .replace(/(\n|\t|\r)/gm, "") // Remove all newlines, tabs, and carriage returns
          .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
          .trim(), // Remove leading and trailing spaces,
        data: date
          .replace(/(\n|\t|\r)/gm, "") // Remove all newlines, tabs, and carriage returns
          .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
          .trim(), // Remove leading and trailing spaces,
        row: review.row
          .replace(/(\n|\t|\r)/gm, "") // Remove all newlines, tabs, and carriage returns
          .replace(/\s{2,}/g, " ") // Replace multiple spaces with a single space
          .trim(), // Remove leading and trailing spaces,
        img: review.img,
        __v: review.__v,
      };
    });

    res.json(cleanedReviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).send("Error fetching reviews");
  }
});

app.get("/cleardb", async (req, res) => {
  try {
    await mongoose.connection.db.dropDatabase();
    res.send("Database cleared");
  } catch (err) {
    console.error("Error clearing database:", err);
    res.status(500).send("Error clearing database");
  }
});

app.listen(3001, () => {
  console.log("server running on port 3001");
});
