const Parse = require("parse/node");

if (typeof window === "undefined") {
  Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JS_KEY);
  Parse.serverURL = "http://stag.api.viefam.com/";
}

export default Parse;
