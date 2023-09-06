import jwt from "jsonwebtoken";
export const authenticate = async (req, res, next) => {
  const data = req.body.token;
  console.log(data);
  if (!req.body.token)
    return res.json({
      message: "token must be provided to authenticate!",
      statusCode: 404,
    });
  const decode = jwt.verify(req.body.token, process.env.SECRET_KEY);
  req.USER = decode;
  console.log(decode);
  next();
};

export const generateToken = (user) => {
  console.log(user);
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.SECRET_KEY
  );
  return token;
};
