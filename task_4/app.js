const http = require("http");
const { createReadStream, promises } = require("fs");
const { join, extname } = require("path");
const fileType = require("file-type");
const moment = require("moment");
const {
  getMessages,
  getMessageById,
  addMessage,
  updateMessage,
  deleteMessage
} = require("./controllers");

const MESSAGES_PATH_PATTERN = new RegExp("^/messages", "i");

const logResponse = (start_time, end_time, status_code, user_agent, url) => {
  const pass_time = `${parseFloat(
    ((end_time - start_time) / 1000).toFixed(2)
  )} seconds`;
  console.log(
    `URL: ${url} \n Time passed: ${pass_time} \n Status code: ${status_code} \n User agent: ${user_agent}`
  );
};

const server = http.createServer(async (req, res) => {
  const { method, headers } = req;

  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;

  const start_time = moment().valueOf();
  let isFinished = false;

  const finishHandler = () => {
    isFinished = true;
    const end_time = moment().valueOf();
    logResponse(
      start_time,
      end_time,
      res.statusCode,
      headers["user-agent"],
      url.href
    );
  };

  res.once("finish", finishHandler);

  res.once("close", () => {
    res.removeListener("finish", finishHandler);
    if (!isFinished) finishHandler();
  });

  const full_path = join(__dirname, "assets", pathname);

  try {
    const stat = await promises.stat(full_path);
    if (stat.isFile()) {
      const rs = createReadStream(full_path);
      rs.once("readable", async () => {
        const chunk = rs.read(stat.size > 4100 ? 4100 : stat.size);
        const _fileType = await fileType.fromBuffer(chunk);
        res.setHeader(
          "content-type",
          _fileType
            ? _fileType.mime
            : `text/${extname(full_path).replace(".", "")}`
        );
        res.write(chunk);
        rs.pipe(res);
      });
      return;
    }
  } catch (e) {
    if (e.code !== "ENOENT") {
      statusCode = 400;
      res.end(JSON.stringify({ error: e }));
    }
  }

  if (pathname === "/") {
    res.statusCode = 302;
    res.setHeader("Location", "/index.html");
    res.end();
  } else if (MESSAGES_PATH_PATTERN.test(pathname)) {
    const route =
      pathname[pathname.length - 1] === "/" ? pathname.slice(0, -1) : pathname;
    const url_params = route.split("/");
    const id = url_params[2];

    if (method === "GET") {
      if (url_params.length === 2) {
        getMessages(res);
      } else {
        getMessageById(res, id);
      }
    } else if (method === "POST") {
      addMessage(req, res);
    } else if (method === "PUT" && id) {
      updateMessage(req, res, id);
    } else if (method === "DELETE" && id) {
      deleteMessage(res, id);
    }
  } else {
    statusCode = 404;
    res.end(JSON.stringify({ message: "not found" }));
  }
});

server.listen(4300, "127.0.0.1", () => {
  const address = server.address();
  console.log(`Server is running on port ${address.port}`);
});
