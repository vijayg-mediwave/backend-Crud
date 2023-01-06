const express = require("express");
const { json } = require("express");
const Sequelize = require("sequelize");
const PORT = 5001;

const sequel = new Sequelize("student", "postgres", "postgres", {
  HOST: "localhost",
  PORT: "5432",
  dialect: "postgres",
});

const db = {};
db.Sequelize = Sequelize;
db.sequel = sequel;

const app = express();
app.use(json());

const employeeData = db.sequel.define("employees", {
  eid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  eName: {
    type: Sequelize.STRING,
  },
});

const foo = async () => {
  try {
    await db.sequel.sync();
  } catch (err) {
    console.log(err);
  }
};
foo();

app.get("/get", async function (req, res) {
  try {
    const data = await employeeData.findAll({});
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/getOne/:id", async function (req, res) {
  try {
    const data = await employeeData.findOne({ where: { eid: req.params.id } });
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/post", async (req, res) => {
  try {
    const post = await employeeData.create({
      eid: req.body.eid,
      eName: req.body.eName,
    });
    //const DataToSave = await post.save();
    return res.send(post);
  } catch (error) {
    console.log(error);
  }
});

app.put("/update/:id", async function (req, res) {
  try {
    const data = await employeeData.update(req.body, {
      where: { eid: req.params.id },
    });
    return res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async function (req, res) {
  try {
    const data = await employeeData.destroy({ where: { eid: req.params.id } });
    return res.send(`DOcument with has been deleted...`);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, (err) => {
  if (err)
    return console.log(`Connot run on Port ${PORT} Due to Error: ${err}`);
  else return console.log(`backend running in ${PORT}`);
});
