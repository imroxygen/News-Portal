import { Client, Storage } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
};

// Debugging environment variables
// console.log("Appwrite Config:", appwriteConfig);

if (!appwriteConfig.url || !appwriteConfig.projectId) {
  throw new Error("Appwrite configuration is invalid. Check your .env file.");
}

export const client = new Client();

client
  .setEndpoint(appwriteConfig.url)
  .setProject(appwriteConfig.projectId);

export const storage = new Storage(client);
