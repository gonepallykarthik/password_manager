const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

let filePath = path.join(__dirname, "../data/text.json");

// get the List from json file
function getList() {
  console.log(chalk.bgGreen.black("getting our List ...."));

  const json_data = fs.readFileSync(filePath, { flag: "r" });

  let data;

  //check if file is empty or no data is present
  try {
    data = JSON.parse(json_data);
  } catch (error) {
    console.log("\n" + chalk.bgRed.black("No passwords to show Add one!"));
    return;
  }

  data.map((item, index) => {
    console.log(
      "\n" +
        `${index + 1} ` +
        chalk.bgBlue("site_url: ") +
        item.site_url +
        "\t" +
        chalk.bgGreen.black("username: ") +
        item.username +
        "\t" +
        chalk.bgCyan.black("password: ") +
        item.password
    );
  });
}

function AddCredentail(site_url, username, password) {
  const data = loadNotes();

  const existed_url = data.filter((item) => {
    return item.site_url === site_url;
  });

  if (existed_url.length === 0) {
    data.push({
      site_url,
      username,
      password,
    });
    saveToFile(data);
  } else {
    let updated_credentails_array = remove_Existed_url(data, existed_url);
    let update_existed = existed_url[0];
    update_existed.username = username;
    update_existed.password = password;
    updated_credentails_array.push(update_existed);
    saveToFile(updated_credentails_array);
    // console.log(updated_credentails_array);
  }
}

function remove_Existed_url(data, existed_url) {
  let updated_cred = existed_url[0];
  const updated_credentails_array = data.filter((item) => {
    return item.site_url != updated_cred.site_url;
  });

  return updated_credentails_array;
}

function saveToFile(data) {
  const data_json = JSON.stringify(data);
  fs.writeFileSync(filePath, data_json);
  console.log(chalk.bgGreen.black("success"));
}

function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const json_data = dataBuffer.toString();
    return JSON.parse(json_data);
  } catch (error) {
    return [];
  }
}

function Search(site_url) {
  const data = loadNotes();

  if (data.length === 0) {
    console.log(
      chalk.bgRed.black("There are no passwords to show") +
        "\t" +
        chalk.bgGreen.black("Add one!")
    );
  }
  const search_filter = data.filter((item) => {
    return item.site_url === site_url;
  });

  if (search_filter.length === 0) {
    console.log(chalk.bgRed.black("No matching site_url Try again"));
  } else {
    const item = search_filter[0];
    console.log(
      chalk.bgBlue("site_url: ") +
        item.site_url +
        "\t" +
        chalk.bgGreen.black("username: ") +
        item.username +
        "\t" +
        chalk.bgCyan.black("password: ") +
        item.password
    );
  }
}

function DeleteHandler(site_url) {
  const data = loadNotes();

  if (data.length === 0) {
    console.log(
      chalk.bgRed.black("There are no passwords to delete") +
        "\t" +
        chalk.bgGreen.black("Add one!")
    );
    return;
  }
  const delete_cred = data.filter((item) => {
    return item.site_url === site_url;
  });

  if (delete_cred.length === 0) {
    console.log(chalk.bgRed.black("No matching site_url Try again"));
  } else {
    const deleted_item = delete_cred[0];
    const data = loadNotes();
    const new_updated_list = data.filter((item) => {
      return item.site_url != deleted_item.site_url;
    });
    saveToFile(new_updated_list);
  }
}

module.exports = {
  getList,
  AddCredentail,
  Search,
  DeleteHandler,
};
