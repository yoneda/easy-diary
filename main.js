const { ipcMain, app, BrowserWindow } = require("electron");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

ipcMain.handle("notes", async function (event, arg) {
  const notes = await db.get("notes").value();
  return notes;
});

ipcMain.handle("add-note", async function (event, arg) {
  const { note } = arg;
  const notes = await db.get("notes").push(note).write();
  return notes;
});

ipcMain.handle("edit-note", async function (event, arg) {
  const { id, body } = arg;
  await db.get("notes").find({ id }).set("body", body).write();
  const notes = await db.get("notes").value();
  return notes;
});

ipcMain.handle("remove-note", async function (event, arg) {
  const { id } = arg;
  await db
    .get("notes")
    .remove((note) => note.id === id)
    .write();
  const notes = await db.get("notes").value();
  return notes;
});

ipcMain.handle("user", async function (event, arg) {
  const user = await db.get("user").value();
  return user;
});

app.whenReady().then(() => {
  db.defaults({ notes: [], user: {} }).write();

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("./out/output/index.html");
});

app.on("window-all-closed", () => {
  console.log("window-all-closed");
});

app.on("activate", () => {
  console.log("activate");
});
