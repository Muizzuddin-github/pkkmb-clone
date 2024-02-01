import app from "./src/app.js";

try {
  app.listen(3000, function () {
    console.log("server is listening");
  });
} catch (err) {
  console.log(err);
}
