const yargs = require("yargs");
const { getList, AddCredentail, Search, DeleteHandler } = require("./util");

yargs.version("1.1.0");

// * create a command for adding credentails

// * "Add" command
yargs.command({
  command: "Add",
  describe: "Add a Credential to password manager",
  builder: {
    site_url: {
      type: "string",
      describe: "Enter a URL",
      demandOption: true,
    },
    username: {
      type: "string",
      describe: "Enter a username",
      demandOption: true,
    },
    password: {
      type: "string",
      describe: "Enter a password",
      demandOption: true,
    },
  },
  handler: function (argv) {
    console.log("Running Add command");
    AddCredentail(argv.site_url, argv.username, argv.password);
  },
});

// * "Search" command
yargs.command({
  command: `Search`,
  describe: "Search through site_url",
  builder: {
    site_url: {
      type: "string",
      describe: "Enter a URL",
      demandOption: true,
    },
  },
  handler: function (argv) {
    console.log("Running Search command");
    Search(argv.site_url);
  },
});

// * "List" command
yargs.command({
  command: "List",
  describe: "List all the Passwords",
  handler: function (argv) {
    console.log("Running List command");
    getList();
  },
});

// * "Delete" command
yargs.command({
  command: "Delete",
  describe: "Delete Credential",
  builder: {
    site_url: {
      type: "string",
      describe: "Enter a Url",
      demandOption: true,
    },
  },
  handler: function (argv) {
    console.log("Running Delete command");
    DeleteHandler(argv.site_url);
  },
});

// Parse the command-line arguments
yargs.parse();

// console.log(yargs.argv);
