import {
  integer,
  pgTable,
  varchar,
  uuid,
  text,
  pgEnum,
  date,
  timestamp,
} from "drizzle-orm/pg-core";
export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text().notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text().notNull().unique(),
  universityCard: text("university_card").notNull(),
  status: STATUS_ENUM().default("PENDING"),
  role: ROLE_ENUM().default("USER"),
  // will send some emails to the user to comeback to the website
  lastACtivityDate: date("last_activity_date").defaultNow(),
  // withTimezone: true : Ensures time is always stored and retrieved correctly regardless of server location
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
