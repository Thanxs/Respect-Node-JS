const moment = require("moment");
const qs = require("querystring");

const messages = [
  {
    text: "Hello Yuriy",
    createdAt: moment().format("MMMM Do YYYY h:mm:ss a"),
    id: 1
  }
];
const allowed_content_types = [
  "application/x-www-form-urlencoded",
  "application/json"
];

exports.messages = messages;

exports.getMessages = res => {
  res.end(JSON.stringify(messages));
};

exports.getMessageById = (res, id) => {
  const message = messages.find(m => m.id === +id);

  if (message) {
    res.end(JSON.stringify(message));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "not found" }));
  }
};

exports.addMessage = (req, res) => {
  content_type = req.headers["content-type"];
  if (!allowed_content_types.includes(content_type)) {
    res.end("Not allowed content type!");
  }

  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", () => {
    let data;
    if (content_type === "application/json") {
      data = JSON.parse(body);
    } else if (content_type === "application/x-www-form-urlencoded") {
      qs.parse(body);
    }

    const message = {
      ...data,
      id: messages.length + 1,
      createdAt: moment().format("MMMM Do YYYY h:mm:ss a")
    };
    messages.push(message);
    res.end(JSON.stringify(message));
  });
};

exports.updateMessage = (req, res, id) => {
  const message_idx = messages.findIndex(m => m.id === +id);

  let body = "";

  req.on("data", chunk => {
    body += chunk;
  });

  req.on("end", () => {
    let data;
    if (content_type === "application/json") {
      data = JSON.parse(body);
    } else if (content_type === "application/x-www-form-urlencoded") {
      qs.parse(body);
    }

    const edited_message = {
      ...data,
      id: +id,
      createdAt: moment().format("MMMM Do YYYY h:mm:ss a")
    };
    messages.splice(message_idx, 1, edited_message);
    res.end(JSON.stringify(edited_message));
  });

  res.end("Message update with id: " + id);
};

exports.deleteMessage = (res, id) => {
  const deleted_message_idx = messages.findIndex(m => m.id === +id);
  messages.splice(deleted_message_idx, 1);
  res.end("Message delete with id: " + id);
};
