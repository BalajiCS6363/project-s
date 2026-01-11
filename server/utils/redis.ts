import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

let redis: Redis | null = null;

if (process.env.REDIS_URL && process.env.REDIS_URL.trim() !== "") {
  try {
    redis = new Redis(process.env.REDIS_URL);

    redis.on("connect", () => {
      console.log("✅ Redis connected successfully");
    });

    redis.on("error", (err) => {
      console.warn("⚠️ Redis error:", err.message);
    });
  } catch (error) {
    console.warn("⚠️ Redis initialization failed. Continuing without Redis.");
    redis = null;
  }
} else {
  console.warn("⚠️ REDIS_URL not provided. Redis is disabled.");
}

export { redis };
