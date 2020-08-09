const generated = require("./generated.docs.sidebar.js");
module.exports = {
  docs: [
    {
      type: "doc",
      id: "README",
    },
    ...generated["docs"],
  ],
};
