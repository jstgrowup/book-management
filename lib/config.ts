const config = {
  env: {
    api: {
      apiEndPoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
      prodEndPoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
      devEnviroment: process.env.DEV_ENVIROTMENT!,
    },
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    databaseUrl: process.env.DATABASE_URL!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URI!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
    },
    emailJs: {
      emailJsPublicKey: process.env.EMAIL_JS_PUBLIC_KEY,
      emailJsPrivateKey: process.env.EMAIL_JS_PRIVATE_KEY,
      emailJsServiceId: process.env.EMAIL_JS_SERVICE_ID!,
      welcomeTemplateId: process.env.EMAIL_JS_WELCOME_TEMPLATE_ID!,
      templateId: process.env.EMAIL_JS_TEMPLATE_ID!,
    },
  },
};
export default config;
