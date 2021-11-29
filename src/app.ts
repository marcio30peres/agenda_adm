import * as express from 'express'
import * as fileUpload from "express-fileupload";
import routes from './routes'

const app = express()
app.use(express.json())
app.use(fileUpload({
    limits: {
        fileSize: 16 * 1024 * 1024
    }
}))
app.use(routes)

export default app;