import { Client as WorkFlowClient } from "@upstash/workflow";
// import { Client as QstashClient } from "@upstash/qstash";

import config from "./config";

import emailjs from "@emailjs/nodejs";
export const workFlowClient = new WorkFlowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});
export const sendEmail = async ({
  emailParams,
  templateId,
}: {
  emailParams: any;
  templateId: string;
}) => {
  return emailjs.send(
    config.env.emailJs.emailJsServiceId,
    templateId,
    emailParams,
    {
      publicKey: config.env.emailJs.emailJsPublicKey,
      privateKey: config.env.emailJs.emailJsPrivateKey,
    }
  );
};
