export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET", "admin-jwt-secret-change-me"),
  },
  apiToken: {
    salt: env("API_TOKEN_SALT", "api-token-salt-change-me"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT", "transfer-token-salt-change-me"),
    },
  },
  secrets: {
    encryptionKey: env("ENCRYPTION_KEY", "encryption-key-change-me-32chars!!"),
  },
  flags: {
    nps: false,
    promoteEE: false,
  },
});
