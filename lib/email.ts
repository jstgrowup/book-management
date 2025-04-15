import config from "./config";
import emailjs from "@emailjs/nodejs";

const sendEmail = async ({
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
export default sendEmail;
