declare namespace NodeJS {
  interface ProcessEnv {
    VNPAY_TMNCODE: string;
    VNPAY_HASHSECRET: string;
    SECRET_KEY: string;
    MONGODB_URI: string;
  }
}
