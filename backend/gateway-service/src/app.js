import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import corsOption from "./Config/CorsConfig.js";
import proxy from 'express-http-proxy'
import response from "./Utils/ResponseHandler/ResponseHandler.js";
import ResTypes from "./Utils/Constants/ResTypes.js";
import { EnvConfig } from "./Config/EnvConfigs.js";

const app = express()

app.use(cors(corsOption))
// app.use(express.json())

app.get('/', (req, res) => {
    return response(res, 200, ResTypes.successMessages.server_online)
})

// proxies
app.use('/api/v1/mri-service', proxy(EnvConfig.MRI_SERVICE_ROUTE))
app.use('/api/v1/treatment-plan-service', proxy(EnvConfig.TREATMENT_PLAN_SERVICE_ROUTE))
app.use('/api/v1/progression-tracking-service', proxy(EnvConfig.PROGRESSION_TRACKING_SERVICE_ROUTE))

//not found route
app.use((req, res) => {
    return response(res, 404, { message: "Endpoint not found" })
})


// call listen in a production environment
if (process.env.NODE_ENV !== 'test') {
    const PORT = EnvConfig.GATEWAY_PORT || 8349
    app.listen(PORT, () => {
        console.log(`Gateway is listening on ${PORT}`);
    });
}

// Export the app instance, for testing
export default app;