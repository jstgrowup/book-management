import config from "@/lib/config";
import { sendEmail } from "@/lib/workflow";
import { logger, task } from "@trigger.dev/sdk/v3";

import { z } from "zod";

const signupPayloadSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  company: z.string().min(1),
});

export const welcomeEmailTask = task({
  id: "send-welcome-email",
  maxDuration: 300,
  run: async (payload: { email: string; name: string; company: string }) => {
    const parsedPayload = signupPayloadSchema.parse(payload);

    logger.log("Sending welcome email to new user", {
      email: parsedPayload.email,
      fullName: parsedPayload.name,
    });

    try {
      await sendEmail({
        emailParams: {
          email: payload.email,
          name: payload.name,
          company: payload.company,
        },
        templateId: config.env.emailJs.welcomeTemplateId,
      });

      logger.log("Welcome email sent successfully", {
        email: parsedPayload.email,
      });

      return {
        success: true,
        message: "Welcome email sent successfully",
        email: parsedPayload.email,
      };
    } catch (error) {
      logger.error("Failed to send welcome email", {
        error,
        email: parsedPayload.email,
      });
      throw error;
    }
  },
});
