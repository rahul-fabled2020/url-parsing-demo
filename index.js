const http = require("http");

const FileManager = require("./src/file");
const URLParser = require("./src/utils/parseURL");

const server = http.createServer((req, res) => {
  const { paths, query } = URLParser.parseURL(req.url);
  const command = paths[0] && paths[0].trim().toLowerCase();

  let responseMessage = `Please visit:
   /read/name-of-your-file to show the contents of a particular file
   /write/name-of-your-file/content-to-write to write some contents to a file
   /write/name-of-your-file/content-to-write?append=true to append some contents to a file
   /rename/old-filename/new-file-name to rename file
   /delete/name-of-your-file to delete a file`;

  if (command) {
    const filename = paths[1];
    const argument = paths[2]; //content or new filename

    handleCommands({
      command,
      res,
      responseMessage,
      filename,
      argument,
      query,
    });
  } else {
    res.end(responseMessage);
  }
});

/**
 *
 * @param {string} command
 * @param {Object} res HTTP Response Object
 * @param {string} responseMessage
 * @param {string} filename
 * @param {string} argument content in write mode, new filename in rename mode and undefined in other modes
 * @param {Object} query key value pairs for query strings
 */
function handleCommands({
  command,
  res,
  responseMessage,
  filename,
  argument,
  query,
}) {
  switch (command) {
    case "read":
      read(filename, res);
      break;

    case "write":
      write(filename, argument, query, res); //argument is the content
      break;

    case "rename":
      rename(filename, argument, res); //argument is the new filename
      break;

    case "delete":
      remove(filename, res);
      break;

    default:
      res.end(responseMessage);
  }
}

function read(filename, res) {
  if (!filename) {
    responseMessage = "Filename is required.";
    res.end(responseMessage);
  } else {
    FileManager.readFromFile(filename)
      .then(
        (data) => res.end(data),

        (error) => res.end(error.message)
      )
      .catch((error) => {
        responseMessage = error;
        res.end(responseMessage);
      });
  }
}

function write(filename, content, query, res) {
  if (!filename) {
    responseMessage = "Filename is required.";
    res.end(responseMessage);
  } else {
    const writeOrAppendToFile =
      query.append !== "true"
        ? FileManager.writeToFile
        : FileManager.appendToFile;

    writeOrAppendToFile(filename, content)
      .then(
        (data) => res.end(data),

        (error) => res.end(error.message)
      )
      .catch((error) => {
        responseMessage = error;
        res.end(responseMessage);
      });
  }
}

function rename(filename, newFilename, res) {
  if (!filename) {
    responseMessage = "Filename is required.";
    res.end(responseMessage);
  } else {
    FileManager.rename(filename, newFilename)
      .then(
        (data) => res.end(data),

        (error) => res.end(error.message)
      )
      .catch((error) => {
        responseMessage = error;
        res.end(responseMessage);
      });
  }
}

function remove(filename, res) {
  if (!filename) {
    responseMessage = "Filename is required.";
    res.end(responseMessage);
  } else {
    FileManager.deleteFile(filename)
      .then(
        (data) => res.end(data),

        (error) => res.end(error.message)
      )
      .catch((error) => {
        responseMessage = error;
        res.end(responseMessage);
      });
  }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT),
  () => {
    console.log(`Listening on port ${PORT}`);
  };
