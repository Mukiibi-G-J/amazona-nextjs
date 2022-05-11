import jwt from 'jsonwebtoken';

const signToken = (user) => {
  //! the sign function takes in an object
  //! then the 2nd parameter is secret
  //! then the 3rd parameter is an object of expiresIn-> 30days
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },

    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export { signToken };
