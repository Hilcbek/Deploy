import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { ErrorShower } from "../Error/error.js";
export let Register = asyncHandler(async (req, res, next) => {
  try {
    let { username, password } = req.body;
    let genSalt = await bcrypt.genSalt(10);
    if (!username || !password)
      return next(ErrorShower(500, "All fields are required."));
    let newUser = await User.create({
      ...req.body,
      password: await bcrypt.hash(password, genSalt),
    });
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
});
export let Login = asyncHandler(async (req, res, next) => {
  try {
    let { username, password } = req.body;
    if (!username || !password)
      return next(ErrorShower(500, "All fields are required."));
    let Username = await User.findOne({ username });
    if (!Username) return next(ErrorShower(500, "wrong username"));
    let Password = await bcrypt.compare(password, Username.password);
    if (!Password) return next(ErrorShower(500, "wrong username or password"));
    res.status(200).json(Username);
  } catch (error) {
    next(error);
  }
});
export let GetUser = asyncHandler(async (req, res, next) => {
  try {
    let Users = await User.find({});
    res.status(200).json(Users);
  } catch (error) {
    next(error);
  }
});
