const http = require("http");

const FileManager = require("./file");
const URLParser = require("./utils/parseURL");

const server = http.createServer((req, res) => {
  const { paths, params } = URLParser.parseURL(req.url);
  const command = paths[0] && paths[0].trim().toLowerCase();

  let responseMessage = `Please visit:
   /read/name-of-your-file to show the contents of a particular file
   /write/name-of-your-file/content-to-write to write some contents to a file
   /write/name-of-your-file/content-to-write?append=true to append some contents to a file
   /rename/old-filename/new-file-name to rename file
   /delete/name-of-your-file to delete a file`;

  if (command) {
    const filename = paths[1];
    const argument = paths[2];

    handleCommands({
      command,
      res,
      responseMessage,
      filename,
      argument,
      params
    });
  } else {
    res.end(responseMessage);
  }
});

function handleCommands({ command, res, responseMessage, filename, argument, params }) {
  switch (command) {
    case "read":
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
      break;

    case "write":
      if (!filename) {
        responseMessage = "Filename is required.";
        res.end(responseMessage);
      } else {
        const writeOrAppendToFile = params.append!=="true" ? FileManager.writeToFile: FileManager.appendToFile;

        writeOrAppendToFile(filename, argument)
          .then(
            (data) => res.end(data),

            (error) => res.end(error.message)
          )
          .catch((error) => {
            responseMessage = error;
            res.end(responseMessage);
          });
      }
      break;

    case "rename":
      if (!filename) {
        responseMessage = "Filename is required.";
        res.end(responseMessage);
      } else {
        FileManager.rename(filename, argument)
          .then(
            (data) => res.end(data),

            (error) => res.end(error.message)
          )
          .catch((error) => {
            responseMessage = error;
            res.end(responseMessage);
          });
      }
      break;

    case "delete":
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
      break;

    default:
      res.end(responseMessage);
  }
}

const PORT = process.env.PORT || 3000;
server.listen(PORT);

console.log(`Listening on port ${PORT}`);
