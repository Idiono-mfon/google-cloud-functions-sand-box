import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import {} from "firebase";
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/myrideApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    }); // returns a promise
    console.log(`MongoDB connected at: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const connectFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAWJqkgubqteH7FO6vZ7-hw7D8RUOYUdIE",
    authDomain: "myridetest-de205.firebaseapp.com",
    projectId: "myridetest-de205",
    storageBucket: "myridetest-de205.appspot.com",
    messagingSenderId: "441316313730",
    appId: "1:441316313730:web:e7a91f0dca848d9ac4c29b",
  };
  const app = initializeApp(firebaseConfig);

  return app;
};

const firebaseApp = connectFirebase();

const app = express();

const router = express.Router();

connectDB();

// Add cars to fire base
router.get("/", (req, res) => {
  const drivers = [
    {
      driverId: "6237ca4c813d96bbfba37bf2",
      location: { lat: -38.702349999999996, long: 20.71837 },
      status: 1,
      carCategory: "classic",
      onTrip: false,
    },
    {
      driverId: "6237ca4c813d96bbfba37ab4",
      location: { lat: -38.77335, long: 0.83337 },
      status: 1,
      carCategory: "premuim",
      onTrip: false,
    },
    {
      driverId: "6237ca4c813d96bbfba37ab5",
      location: { lat: -38.623349999999995, long: -38.623349999999995 },
      status: 1,
      carCategory: "corporate",
      onTrip: false,
    },
  ];

  drivers.forEach((d) => {
    const { driverId, ...others } = d;
    const db = getDatabase(firebaseApp);
    set(ref(db, "drivers/" + driverId), others);
  });

  return res.status(200).json({ message: "Welcome tried again" });
});

app.use(router);

// Test Starts Here

// Test Ends Here

app.listen(4000, () => {
  console.log("Server is running at PORT 4000");
});
