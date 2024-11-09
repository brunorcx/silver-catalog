export const environment = {
  production: true,
  auth: {
    domain: process.env.VERCEL_AUTH_DOMAIN || "",
    clientId: process.env.VERCEL_CLIENT_ID || "",
    // Include the audience only if it's defined and is not the default
    ...(process.env.VERCEL_AUDIENCE && process.env.VERCEL_AUDIENCE !== "YOUR_API_IDENTIFIER" ? { audience: process.env.VERCEL_AUDIENCE } : {}),
    redirectUri: window.location.origin, // No change needed here as it's static
    errorPath: process.env.VERCEL_ERROR_PATH || "/error", // Default fallback if not provided
  },
  httpInterceptor: {
    allowedList: [`${process.env.VERCEL_API_URI}/*`], // This replaces apiUri from the JSON config
  },
};
