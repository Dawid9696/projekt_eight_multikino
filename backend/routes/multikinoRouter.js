/** @format */

const router = require("express").Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const passport = require("passport");

//MODELS
const ModelMovie = require("../models/movie");
const ModelUser = require("../models/user");
const ModelComment = require("../models/comment");

//UTILS
let Authentication = require("../authentication.js");

router.get("/allMovies", async (req, res) => {
	try {
		const Movies = await ModelMovie.find().select("id title genre photo duration released age description city seance");
		res.send(Movies);
	} catch (err) {
		throw new Error(err);
	}
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/movie/:id", async (req, res) => {
	try {
		const Movie = await ModelMovie.findById(req.params.id);
		res.send(Movie);
	} catch (err) {
		throw new Error(err);
	}
});

router.post("/addMovie", async (req, res) => {
	try {
		const newMovie = new ModelMovie(req.body);
		newMovie
			.save()
			.then(() => {
				res.send(newMovie);
			})
			.catch((err) => {
				res.status(400).send(err);
			});
	} catch (err) {
		throw new Error(err);
	}
});

router.delete("/deleteMovie/:id", async (req, res) => {
	try {
		const deletedMovie = await ModelMovie.findByIdAndDelete(req.params.id);
		res.send(deletedMovie);
	} catch (err) {
		throw new Error(err);
	}
});

router.patch("/updateMovie/:id", async (req, res) => {
	try {
		const updatedMovie = await ModelMovie.findByIdAndUpdate(req.params.id, req.body);
		res.send(updatedMovie);
	} catch (err) {
		throw new Error(err);
	}
});

//USER ROUTER

//REJESTRACJA UZYTKOWNIKA
router.post("/register", async (req, res) => {
	try {
		const newUser = new User(req.body);
		newUser
			.save()
			.then((newUser) => res.send(newUser))
			.catch((err) => res.status(400).json("Error: " + err));
	} catch (err) {
		throw new Error(err.msg);
	}
});

//WSZYSCY UŻYTKOWNICY
router.get("/Users", async (req, res) => {
	try {
		const Uzytkownicy = await User.find();
		res.send(Uzytkownicy);
	} catch (err) {
		res.status(400).send(err);
	}
});

//JEDEN UŻYTKOWNIK
router.get("/user/:id", async (req, res) => {
	const user = await User.findById(req.params.id);
	res.send(user);
});

//LOGOWANIE UZYTKOWNIKA
router.post("/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
		res.send({ user, token });
	} catch (e) {
		res.status(400).send("No acces!" + e);
	}
});

//WYLOGOWANIE UZYTKOWNIKA
router.post("/logout", Authentication, async (req, res) => {
	try {
		req.user.tokens = [];
		req.user
			.save()
			.then((user) => res.send("Logged Out"))
			.catch((err) => res.status(400).json("Error: " + err));
	} catch (err) {
		throw new Error(err);
	}
});

//PROFIL UŻYTKOWNIKA
router.get("/myprofile", Authentication, async (req, res) => {
	User.find(req.user._id)
		.then((profile) => res.json(profile))
		.catch((err) => res.status(400).json("Error: " + err));
});

//ZMIANA HASŁA
router.patch("/changePassword", Authentication, async (req, res) => {
	try {
		req.user.password = req.body.password;
		req.user
			.save()
			.then((user) => res.send(user))
			.catch((err) => res.status(400).json("Error: " + err));
	} catch (err) {
		res.status(400).send(err);
	}
});

router.patch("/changeProfileData", Authentication, async (req, res) => {
	try {
		await User.findByIdAndUpdate(req.params.id, req.body);
		res.send(req.user);
	} catch (err) {
		throw new Error(err);
	}
});

router.delete("/deleteProfile", Authentication, async (req, res) => {
	try {
		await User.findByCredentials(req.body.email, req.body.password);
		req.deletedUser
			.remove()
			.then(() => {
				res.send("User deleted!");
			})
			.catch((err) => {
				res.status(400).send(err);
			});
	} catch (err) {
		throw new Error(err);
	}
});

module.exports = router;
