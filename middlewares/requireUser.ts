import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

const verifyUser = (req: any, res: Response, next: NextFunction) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res
      .status(401)
      .send({ message: "Authorization header is required" });
  }

  const accessToken = req.headers.authorization.split(" ")[1];

  try {
    const decoded: any = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY!
    );
    req._id = decoded._id;
    next();
  } catch (e) {
    return res.status(401).send({ message: "Invalid access token" });
  }
};

export default verifyUser;
