import * as express from "express";
import { config } from "./config";
import * as multer from "multer";
import * as cors from "cors";
import { ImportController } from "./controllers/import.controller";
import { ExportController } from "./controllers/export.controller";
import path = require("path");
import { User, UserRepository } from "./repositories/user.repository";

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const userRepository = new UserRepository(
  new Map([
    ["1", new User("1", "Ignacio", "Rueda", 26, 1998)],
    ["2", new User("2", "Jorge", "Perez", 19, 2003)],
    ["3", new User("3", "Maria", "Santos", 25, 1998)],
    ["4", new User("4", "Luis", "Gonzalez", 30, 1993)],
    ["5", new User("5", "Ana", "Martinez", 28, 1995)],
    ["6", new User("6", "Carlos", "Lopez", 22, 2001)],
    ["7", new User("7", "Laura", "Fernandez", 24, 1999)],
    ["8", new User("8", "Diego", "Sanchez", 21, 2002)],
    ["9", new User("9", "Isabel", "Rodriguez", 27, 1996)],
    ["10", new User("10", "Alejandro", "Hernandez", 23, 1999)],
    ["11", new User("11", "Sofia", "Diaz", 18, 2004)],
    ["12", new User("12", "Mateo", "Torres", 29, 1992)],
  ])
);

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.post("/users/import", upload.single("file"), (req, res) =>
  new ImportController(userRepository).handle(req, res)
);

app.get("/users/export", (req, res) =>
  new ExportController(userRepository).handle(req, res)
);

app.listen(config.serverPort, () => {
  console.log(
    `Servidor escuchando en ${config.serverHost}:${config.serverPort}`
  );
});
