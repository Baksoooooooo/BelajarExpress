import Redis from "ioredis";

const redis = process.env.REDIS_URL
  ? new redis(process.env.REDIS_URL)
  : new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: process.env.REDIS_PORT || 6379,
    });

redis.on("connect", () => console.log("Redis Terhubung!!"));
redis.on("error", (err) => console.error(`Redis Error : ${err}`));

export default redis;
