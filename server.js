// import app
const app = require("./backend/app");

// start server on: http://localhost:3000
app.listen(3000,()=>{
    console.log("Express Application is Listening on PORT 3000")
});