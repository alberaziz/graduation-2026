function doPost(e) {
  try {
    // Parse the payload (sent as plain text to bypass CORS preflight)
    var data = JSON.parse(e.postData.contents);
    var userName = data.folderName || "Guest";
    var base64Data = data.image.split(",")[1];
    var fileName = data.filename || ("photo_" + new Date().getTime() + ".jpg");

    // Main Graduation 2026 Folder ID
    var mainFolder = DriveApp.getFolderById("1e7wf16L5M2WGkywKuhhIfSCTi-eFnAvr");
    
    // Find or Create User Subfolder
    var userFolders = mainFolder.getFoldersByName(userName);
    var userFolder;
    if (userFolders.hasNext()) {
      userFolder = userFolders.next();
    } else {
      userFolder = mainFolder.createFolder(userName);
    }

    // Save Image
    var blob = Utilities.newBlob(Utilities.base64Decode(base64Data), "image/jpeg", fileName);
    var file = userFolder.createFile(blob);

    return ContentService.createTextOutput(JSON.stringify({"status": "success", "url": file.getUrl()}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
