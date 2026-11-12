export const env = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  },
};

export const isEmailConfigured = Boolean(
  env.emailjs.serviceId && env.emailjs.templateId && env.emailjs.publicKey,
);
