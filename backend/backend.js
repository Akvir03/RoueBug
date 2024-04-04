const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();

app.use(cors()); // This will enable CORS for all routes
const port = 3001;
const { MongoClient } = require("mongodb");
const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.1";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connecté à MongoDB");
  } catch (e) {
    console.error(e);
  }
}

connectDB();

// Middleware pour parser le contenu JSON
app.use(bodyParser.json());

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
// Route de test
app.get("/", (req, res) => {
  res.send("Le serveur fonctionne !");
});

// Route d'inscription
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const usersCollection = client.db("test").collection("users");

  // Requête 1 : Vérifier si l'utilisateur existe
  const userExists = await usersCollection.findOne({ username });

  if (userExists) {
    return res.json({ message: false }); // Si l'utilisateur existe
  } else {
    // Requête 2 : insérer user
    await usersCollection.insertOne({ username, password });
    return res.json({ message: true }); // Utilisateur inséré
  }
});
// Route pour le login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const usersCollection = client.db("test").collection("users");

  // Requête : Vérifier les identifiants de l'utilisateur
  const user = await usersCollection.findOne({ username, password });

  return res.json({ message: !!user }); // Renvoie TRUE si l'utilisateur est trouvé, sinon FALSE
});

// Route enregistrement de la roue
app.post("/wheelregister", async (req, res) => {
  const { username, id1, id2, id3, id4, id5, id6, id7, id8 } = req.body;
  const wheelsCollection = client.db("test").collection("wheels");
  const restaurants = [id1, id2, id3, id4, id5, id6, id7, id8];

  // Requête 1 : Vérifier si la roue existe en se basant sur le username et la liste des restaurants
  const existingWheel = await wheelsCollection.findOne({
    username,
    restaurants: { $all: restaurants },
  });

  if (existingWheel) {
    // Requête 2 : Si la roue existe, implémenter nombre d'utilisation de +1
    await wheelsCollection.updateOne(
      { _id: existingWheel._id },
      { $inc: { utilisations: 1 } }
    );
    res.json({ message: "Nombre d'utilisations mis à jour" });
  } else {
    // Sinon, insérer la roue et mettre nb utilisation à 1
    await wheelsCollection.insertOne({
      username,
      restaurants,
      utilisations: 1,
    });
    res.json({ message: "Roue sauvegardée" });
  }
});

// Route des roues de l'utilisateur
app.post("/userwheels", async (req, res) => {
  const { username } = req.body;
  const wheelsCollection = client.db("test").collection("wheels");

  // Requête 1 : Sortir toutes les roues de l'utilisateur
  const userWheels = await wheelsCollection.find({ username }).toArray();

  // Renvoyer toutes les roues de l'utilisateur
  if (userWheels.length > 0) {
    res.json(userWheels);
  } else {
    res.json({ message: "Aucune roue trouvée pour cet utilisateur." });
  }
});

// Route des 5 roues les plus utilisées
app.get("/topwheels", async (req, res) => {
  const wheelsCollection = client.db("test").collection("wheels");

  // Requête 1 : Sortir les 5 roues les plus utilisées
  try {
    const topWheels = await wheelsCollection
      .find()
      .sort({ utilisations: -1 })
      .limit(5)
      .toArray();

    // Renvoyer les 5 roues trouvées
    res.json(topWheels);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des roues les plus utilisées",
    });
  }
});

app.get("/userwheels", async (req, res) => {
  const wheelsCollection = client.db("test").collection("wheels");

  try {
    const topWheels = await wheelsCollection
      .find()
      .sort({ utilisations: -1 })
      .limit(5)
      .toArray();

    res.json(topWheels);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des roues les plus utilisées",
    });
  }
});

app.get("/topwheels", async (req, res) => {
  const wheelsCollection = client.db("test").collection("wheels");

  try {
    const topWheels = await wheelsCollection
      .find()
      .sort({ utilisations: -1 })
      .limit(5)
      .toArray();

    res.json(topWheels);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des roues les plus utilisées",
    });
  }
});

app.delete("/userwheels", async (req, res) => {
  const wheelsCollection = client.db("test").collection("wheels");

  const wheelId = req.params.id;

  try {
    await wheelsCollection.deleteOne(wheelId);
    res.json({ message: "La roue a été supprimée" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la roue" });
  }
});
