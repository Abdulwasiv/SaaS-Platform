const User = require('../models/user.model');

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = snowflake.generate();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists. Please choose a different email.' });
    }
    const newUser = new User({
      _id: userId,
      name,
      email,
      password,
    });
    await newUser.save();


    res.status(201).json({
      message: 'User successfully registered.',
      user: {
        id: userId,
        name,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. Please check your email and password.' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials. Please check your email and password.' });
    }


    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      'saasapp', 
      { expiresIn: '1h' } 
    );

    res.status(200).json({
      message: 'User successfully signed in.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
