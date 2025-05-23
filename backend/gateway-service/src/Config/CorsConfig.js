const whiteList = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://dashboard.dementiaguard.live",
    "http://cognicare.dementiaguard.live",
    "https://cognicare.dementiaguard.live"
];

// The origin is the domain from which the request is made
const corsOption = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not Allowed By CORS"));
        }
    },
    optionalSuccessStatus: 200,
};

export default corsOption;