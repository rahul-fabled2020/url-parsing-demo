const fs = require("fs");

function readFromFile(filename, path = "files") {
  const filePath = `${path}/${filename}`;

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function writeToFile(filename, content, path = "files") {
  const filePath = `${path}/${filename}`;

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve("Successfully written to " + filePath);
      }
    });
  });
}

function appendToFile(filename, content, path = "files") {
  const filePath = `${path}/${filename}`;

  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, content, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve("Successfully appended to " + filePath);
      }
    });
  });
}

function rename(oldName, newName, path = "files", newPath = "files") {
  const oldFilePath = `${path}/${oldName}`;
  const newFilePath = `${newPath}/${newName}`;

  return new Promise((resolve, reject) => {
    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          `Successfully renamed file from ${oldFilePath} to ${newFilePath}`
        );
      }
    });
  });
}

function deleteFile(filename, path='files') {
  const filePath = `${path}/${filename}`;

  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`${filePath} is deleted successfully...`);
      }
    });
  });
}

module.exports = {
  readFromFile,
  writeToFile,
  rename,
  deleteFile,
  appendToFile
};
