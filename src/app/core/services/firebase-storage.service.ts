import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { getStorage, FirebaseStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import firebaseConfig from "../../../../firebase_config.json";
import { AuthService } from "./auth.service";
import { User } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: "root",
})
export class FirebaseStorageService {
  private storage: FirebaseStorage;
  user: User | null = null; // Start user as null to reflect auth state properly

  constructor(private authService: AuthService) {
    const app = initializeApp(firebaseConfig);
    this.storage = getStorage(); // Uses already initialized app from main.ts
    this.authService.user$.subscribe((user) => {
      this.user = user; // Update user state when auth state changes
    });
  }

  /**
   * Upload a file to Firebase Storage
   * @param path - Path in the storage bucket
   * @param file - File to upload
   * @returns Promise<string> - Download URL of the uploaded file
   */
  async uploadFile(path: string, file: File): Promise<string> {
    const uniqueFileName = `${uuidv4()}_${file.name}`; // Add unique ID to the file name
    const firebaseUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o?name=${encodeURIComponent(path + uniqueFileName)}`;

    const response = await fetch(firebaseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await this.user.getIdToken()}`,
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file to Firebase Storage");
    }

    // Parse the JSON response to get the download URL
    const responseBody = await response.json();
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${encodeURIComponent(responseBody.name)}?alt=media`;

    return downloadURL;
  }

  /**
   * Get the download URL of a file
   * @param path - Path in the storage bucket
   * @returns Promise<string> - Download URL
   */
  async getFileURL(path: string): Promise<string> {
    const storageRef = ref(this.storage, path);
    return getDownloadURL(storageRef);
  }

  /**
   * Delete a file from Firebase Storage
   * @param path - Path in the storage bucket
   * @returns Promise<void>
   */
  async deleteFile(path: string): Promise<void> {
    const storageRef = ref(this.storage, path);
    await deleteObject(storageRef);
  }

  /**
   * List all files in a specific directory
   * @param path - Directory path in the storage bucket
   * @returns Promise<string[]> - List of file paths
   */
  async listFiles(path: string): Promise<string[]> {
    const dirRef = ref(this.storage, path);
    const listResult = await listAll(dirRef);
    return listResult.items.map((itemRef) => itemRef.fullPath);
  }
}
