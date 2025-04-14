import { Client as WorkFlowClient } from "@upstash/workflow";
// import { Client as QstashClient } from "@upstash/qstash";
// import emailjs from "@emailjs/browser";
import config from "./config";
import axios from "axios";
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
  return axios.post("https://api.emailjs.com/api/v1.0/email/send", {
    service_id: config.env.emailJs.emailJsServiceId,
    template_id: templateId,
    user_id: config.env.emailJs.emailJsPublicKey,
    template_params: emailParams,
  });
};
