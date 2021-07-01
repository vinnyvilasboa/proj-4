// Imports
require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");

// Models
const { Profile } = require("../models");

// Controllers
const index = async (req, res) => {
  console.log("inside of /api/profiles");
  try {
    const allProfiles = await Profile.find({});

    res.json({ profiles: allProfiles });
  } catch (error) {
    console.log("Error inside of /api/profiles");
    console.log(error);
    return res
      .status(400)
      .json({ message: "Profiles not found. Please try again!!" });
  }
};

const show = async (req, res) => {
  
  const { id } = req.params;
  try {
    // look for profile based on name
    const profile = await Profile.findById(id);
    res.json({ astro });
  } catch (error) {
    console.log("Error inside of /api/profiles/:id");
    console.log(error);
    return res.status(400).json({ message: "Profile not found. Try again..." });
  }
};

const create = async (req, res) => {
  const { name, email } = req.body;
  console.log('Here is a user', req.user);

  try {
    const newProfile = await Profile.create({
      name,
      email,
      user: req.user._id
    });
    console.log("new profile created", newProfile);
    res.json({ profile: newProfile });
  } catch (error) {
    console.log("Error inside of POST of /api/profiles");
    console.log(error);
    return res
      .status(400)
      .json({ message: "Profile was not created. Please try again..." });
  }
};

const update = async (req, res) => {
    //     console.log(req.body);
    try {
      const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body);
      const profile = await Profile.findById(req.params.id);
      console.log(updatedProfile);
      console.log(profile);
      res.json({ [profile]: updatedProfile });
    //   res.redirect(`/api/profiles/${req.params.id}`);
    } catch (error) {
      console.log("Error inside of UPDATE route");
      console.log(error);
      res.status(400).json({ message: "Profile could not be updated. Please try again..." });
    }
  };

const deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    const result = await Profile.findByIdAndRemove(id);
    console.log(result);
    // res.redirect("/api/profiles");
    res.json({message: `${id} was deleted.`})
  } catch (error) {
    console.log("inside of DELETE route");
    console.log(error);
    return res
      .status(400)
      .json({ message: "Profile was not deleted. Please try again..." });
  }
};

// GET api/profiles/test (Public)
router.get("/test", (req, res) => {res.json({ msg: "Profiles endpoint OK!" });
});

// GET -> /api/profiles/
router.get("/", passport.authenticate("jwt", { session: false }), index);
// GET -> /api/profiles/:name
router.get("/:id", passport.authenticate("jwt", { session: false }), show);

// POST -> /api/profiles
router.post("/", passport.authenticate("jwt", { session: false }), create);

router.put("/:id", passport.authenticate("jwt", { session: false }), update);

router.delete("/:id",passport.authenticate("jwt", { session: false }),deleteProfile);

module.exports = router;