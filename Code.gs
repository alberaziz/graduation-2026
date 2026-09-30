/**
 * ===================================================================
 * GOOGLE APPS SCRIPT - PHOTOBOOTH BACKEND
 * Folder Hierarchy:
 * Graduation 2026 (Main Folder) -> [User Name] (Subfolder) -> captured_photo.jpg
 * 
 * Main Google Drive Folder ID: 1e7wf16L5M2WGkywKuhhIfSCTi-eFnAvr
 * ===================================================================
 */

const MAIN_FOLDER_ID = "1e7wf16L5M2WGkywKuhhIfSCTi-eFnAvr";

/**
 * Handles incoming POST requests from the Photobooth frontend.
 * Supports both application/x-www-form-urlencoded and raw JSON payloads.
 */
function doPost(e) {
  // Use script lock to prevent race conditions during subfolder creation
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    if (!e) {
      return createJsonResponse({ status: "error", message: "No request data received." });
    }

    var data = {};

    // 1. Parse incoming payload (handles form-urlencoded parameter and raw JSON)
    if (e.parameter && (e.parameter.image || e.parameter.userName)) {
      data = e.parameter;
    } else if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        // Fallback: manually parse URL-encoded query string
        var raw = e.postData.contents;
        data = {};
        var pairs = raw.split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('=');
          if (pair.length === 2) {
            var key = decodeURIComponent(pair[0]);
            var val = decodeURIComponent(pair[1].replace(/\+/g, ' '));
            data[key] = val;
          }
        }
      }
    }

    var userName = (data.userName || "Guest").trim();
    var rawImage = data.image;

    if (!rawImage) {
      return createJsonResponse({ status: "error", message: "No image data found in request." });
    }

    // 2. Access the Main "Graduation 2026" Folder
    var mainFolder = DriveApp.getFolderById(MAIN_FOLDER_ID);
    if (!mainFolder) {
      return createJsonResponse({ 
        status: "error", 
        message: "Main folder with ID " + MAIN_FOLDER_ID + " not found or inaccessible." 
      });
    }

    // 3. Search inside Main Folder for a subfolder matching exact userName
    var subfolderIterator = mainFolder.getFoldersByName(userName);
    var userFolder;

    if (subfolderIterator.hasNext()) {
      // Subfolder exists: select it
      userFolder = subfolderIterator.next();
    } else {
      // Subfolder does NOT exist: dynamically create it
      userFolder = mainFolder.createFolder(userName);
    }

    // 4. Decode the Base64 image
    var base64Data = rawImage.replace(/^data:image\/\w+;base64,/, "");
    var decodedBytes = Utilities.base64Decode(base64Data);

    // 5. Generate formatted filename with timestamp
    var timeZone = Session.getScriptTimeZone() || "GMT";
    var timestamp = Utilities.formatDate(new Date(), timeZone, "yyyyMMdd_HHmmss");
    var cleanUserName = userName.replace(/[^a-zA-Z0-9_-]/g, "_");
    var fileName = "PHOTO_" + cleanUserName + "_" + timestamp + ".jpg";

    // 6. Save image blob as a JPG file inside user's specific subfolder
    var blob = Utilities.newBlob(decodedBytes, MimeType.JPEG, fileName);
    var savedFile = userFolder.createFile(blob);

    return createJsonResponse({
      status: "success",
      message: "Photo saved successfully in user folder.",
      folderId: userFolder.getId(),
      folderName: userFolder.getName(),
      fileId: savedFile.getId(),
      fileName: fileName,
      fileUrl: savedFile.getUrl()
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Health check endpoint for testing in browser
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
 * Helper to construct JSON response with proper MIME type for CORS handling
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
