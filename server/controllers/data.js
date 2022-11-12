const { hasUser } = require("../middlewares/guards");
const {
  getAll,
  create,
  getById,
  edit,
  deleteItem,
  getByUserId,
} = require("../services/item");
const { parseError } = require("../util/parser");

const dataController = require("express").Router();

dataController.get("/", async (req, res) => {
  let items = [];
  if (req.query.where) {
    const userId = JSON.parse(req.query.where.split("=")[1]);
    items = await getByUserId(userId)
  } else {
    items = await getAll();
  }
  res.json(items);
});

dataController.post("/", hasUser(), async (req, res) => {
  try {
    const data = Object.assign({ _ownerId: req.user._id }, req.body);
    const item = await create(data);
    res.json(item);
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

dataController.get("/:id", async (req, res) => {
  const item = await getById(req.params.id);
  res.json(item);
});

dataController.put("/:id", hasUser(), async (req, res) => {
  const item = await getById(req.params.id);
  if (req.user._id != item._ownerId) {
    return res.status(403).json({ message: "You cannot modify this record" });
  }
  try {
    const result = await edit(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

dataController.delete("/:id", hasUser(), async (req, res) => {
  const item = await getById(req.params.id);
  if (req.user._id != item._ownerId) {
    return res.status(403).json({ message: "You cannot modify this record" });
  }

  try {
    await deleteItem(item);
    res.status(204).end();
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

module.exports = dataController;
