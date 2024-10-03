import express from "express"
import userRoutes from "./routes/livros.js"

const app = express()

app.use(express.json())

app.use("/", userRoutes)

app.listen(8800)