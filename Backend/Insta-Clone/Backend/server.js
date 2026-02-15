require("dotenv").config()
const app = require("./src/app")
const db = require("./src/config/database")

db()



app.listen(3000,()=>{
    console.log("server running on port 3000")
})