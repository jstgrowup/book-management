import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import config from "@/lib/config";
import { sendEmail } from "@/lib/workflow";
import { logger, schedules } from "@trigger.dev/sdk/v3";
import { and, gt, lt } from "drizzle-orm";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;
export const firstScheduledTask = schedules.task({
  id: "inactive-emails",
  cron: "0 9 * * *",
  run: async () => {
    const foundUsers = await db
      .select()
      .from(users)
      .where(
        and(
          lt(
            users.lastACtivityDate,
            new Date(Date.now() - THREE_DAYS_IN_MS).toISOString()
          ),
          gt(
            users.lastACtivityDate,
            new Date(Date.now() - THIRTY_DAYS_IN_MS).toISOString()
          )
        )
      );
    const promises = [];
    for (const user of foundUsers) {
      promises.push(
        sendEmail({
          emailParams: {
            subject: "Hey we miss you",
            company: "Elibrary",
            name: user.fullName,
            email: user.email,
            message: `Hey ${user.fullName}, we miss you!`,
          },
          templateId: config.env.emailJs.templateId,
        })
      );
    }
    const response = await Promise.all(promises);
    logger.log("All the reminders are sent successfully");
    return {
      success: true,
      message: "All the reminders are sent successfully",
      response,
    };
  },
});
