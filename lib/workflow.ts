import { Client as WorkFlowClient } from "@upstash/workflow";
// import { Client as QstashClient } from "@upstash/qstash";
import emailjs from "@emailjs/browser";
import config from "./config";
export const workFlowClient = new WorkFlowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});
// const qstashClient = new QstashClient({
//   token: config.env.upstash.qstashToken,
// });
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
    config.env.emailJs.emailJsPublicKey
  );
};
