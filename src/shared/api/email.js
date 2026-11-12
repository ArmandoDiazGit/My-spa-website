import emailjs from "@emailjs/browser";
import { env, isEmailConfigured } from "./env";

// EmailJS is optional in local development. When it is not configured we
// resolve instead of throwing so the rest of the flow still succeeds.
export function sendEmailForm(form) {
  if (!isEmailConfigured) {
    return Promise.resolve(null);
  }

  return emailjs.sendForm(
    env.emailjs.serviceId,
    env.emailjs.templateId,
    form,
    { publicKey: env.emailjs.publicKey },
  );
}
