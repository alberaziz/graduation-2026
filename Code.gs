/**
 * GOOGLE APPS SCRIPT - PHOTOBOOTH BACKEND
 * Target Folder ID: 1e7wf16L5M2WGkywKuhhIfSCTi-eFnAvr
 * 
 * Deployment Instructions:
 * 1. Open Google Apps Script (https://script.google.com).
 * 2. Create a new project named "Photobooth-Backend".
 * 3. Replace all code in Code.gs with this file.
 * 4. Click "Deploy" > "New deployment".
 * 5. Select type: "Web app".
 * 6. Set "Execute as": "Me".
 * 7. Set "Who has access": "Anyone" (CRITICAL for mobile browser uploads without login prompts).
 * 8. Click "Deploy", authorize the permissions, and copy the Web App URL.
 * 9. Paste the Web App URL into your frontend index.html (APPS_SCRIPT_URL variable).
 */

const MAIN_FOLDER_ID = "1e7wf16L5M2WGkywKuhhIfSCTi-eFnAvr";

/**
 * Handles incoming POST requests containing the photo and user information.
 */
function doPost(e) {
  try {
    // Parse incoming payload
    // Note: We accept text/plain to avoid CORS preflight OPTIONS rejection in modern browsers
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        status: "error",
        message: "No payload received in request."
      }, 400);
    }

    const payload = JSON.parse(e.postData.contents);
    const userName = (payload.userName || "Anonymous").trim();
    const rawImage = payload.image;

    if (!rawImage) {
      return createJsonResponse({
        status: "error",
        message: "No image data provided."
      }, 400);
    }

    // 1. Access the main Google Drive folder
    const mainFolder = DriveApp.getFolderById(MAIN_FOLDER_ID);
    if (!mainFolder) {
      return createJsonResponse({
        status: "error",
        message: "Main folder with ID " + MAIN_FOLDER_ID + " not found or inaccessible."
      }, 500);
    }

    // 2. Check if a subfolder with the exact userName exists, or create it
    const subfolderIterator = mainFolder.getFoldersByName(userName);
    let targetFolder;

    if (subfolderIterator.hasNext()) {
      targetFolder = subfolderIterator.next();
    } else {
      targetFolder = mainFolder.createFolder(userName);
    }

    // 3. Decode the Base64 image data
    // Remove data URL scheme if present (e.g., "data:image/jpeg;base64,")
    const base64Data = rawImage.replace(/^data:image\/\w+;base64,/, "");
    const decodedBytes = Utilities.base64Decode(base64Data);

    // 4. Generate a unique, clean filename with timestamp
    const now = new Date();
    const timeZone = Session.getScriptTimeZone() || "GMT";
    const timestamp = Utilities.formatDate(now, timeZone, "yyyyMMdd_HHmmss");
    const sanitizedUserName = userName.replace(/[^a-zA-Z0-9_-]/g, "_");
    const fileName = `PHOTO_${sanitizedUserName}_${timestamp}.jpg`;

    // 5. Create the file blob and save it inside the user's subfolder
    const blob = Utilities.newBlob(decodedBytes, MimeType.JPEG, fileName);
    const savedFile = targetFolder.createFile(blob);

    // Optional: Make file viewable by anyone with link if needed for preview
    // savedFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return createJsonResponse({
      status: "success",
      message: "Photo uploaded successfully.",
      folderId: targetFolder.getId(),
      folderName: targetFolder.getName(),
      fileId: savedFile.getId(),
      fileName: fileName,
      fileUrl: savedFile.getUrl(),
      downloadUrl: savedFile.getDownloadUrl()
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    }, 500);
  }
}

/**
 * Health-check GET endpoint to verify web app deployment in browser.
 */
function doGet(e) {
  return createJsonResponse({
    status: "active",
    message: "Google Apps Script Photobooth API is operational.",
    targetFolderId: MAIN_FOLDER_ID,
    timestamp: new Date().toISOString()
  });
}

/**
 * Helper to construct JSON responses with appropriate headers for Apps Script.
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
