function parseURL(url) {
  const newURL = url.replace(/%20/g, " "); //Replace %20 by space
  const urlParts = newURL.split("?"); //Separate query string and path
  const paths = urlParts[0].split("/").filter((pathToken) => !!(pathToken).trim()); //Obtain subpaths in array
  const params = urlParts[1] ? parseParams(urlParts[1]): {}; //Extract query strings

  return {
    paths,
    query: params
  };
}

function parseParams(paramsString) {
  const params = paramsString.split("&").map((param) => (param.split("=")));
  
  const output = {}
  params.forEach(param => {
    output[param[0]] = param[1];
  });

  return output;
}

module.exports.parseURL = parseURL;