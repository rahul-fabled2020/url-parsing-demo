const fs = require("fs");
const defaultPath = "files";

function readFromFile(filename, path = defaultPath) {
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

function writeToFile(filename, content, path = defaultPath) {
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

function appendToFile(filename, content, path = defaultPath) {
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

function rename(oldName, newName, path = defaultPath, newPath = defaultPath) {
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

function deleteFile(filename, path = defaultPath) {
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
  appendToFile,
};
