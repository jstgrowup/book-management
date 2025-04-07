import config from "@/lib/config";
import { drizzle } from "drizzle-orm/neon-http";
export const db = drizzle(config);
