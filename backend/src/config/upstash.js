import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";

dotenv.config();

// create a ratelimit that allows 100 requests per 1 minute
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(100, "60 s"),
})

export default ratelimit;