import jwt from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User }  from "../models/User";
import { Request } from "express";
import { NotFound } from "http-errors";
import config from "config";

export async function getToken (email: string) {
    const user = await User.findOne({email: email});
  const token = jwt.sign({ id: user?._id }, config.get("jwtSecret"), { expiresIn: config.get("jwtExpiration"),
}
    );
    return `Bearer ${token}`;
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jwtSecretToken",
};

export const authStrategy = (passport: any) => {
  passport.use(
    new Strategy(options, async (payload: any, done: any) => {
      const user = await User.findById(payload.id)
      .select("email id");
        if (user) {
            done(undefined, user);
        } else {
            done(undefined, false);
      }
    }));
};

export const authenticate = async (req: Request) => {
  try {
    const { authorization = "" } = req.headers;
    const token = authorization.split(" ")[1];
    const {payload}: any = jwt.verify(token, "jwtSecretToken", {complete: true});
    if (!payload) {
      throw new NotFound();
    }
    return payload.id;
  } catch (e) {
    return "Invalid or missing token";
  }
};
