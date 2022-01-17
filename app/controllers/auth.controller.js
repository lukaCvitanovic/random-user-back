const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '87505140879-l615u46sm3pa2visq4scfnqas6g3bi2e.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

// Google auth example
exports.login = async (req, res) => {
    const { token } = req.body;
  
    client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    })
      .then((ticket) => res.send(ticket.getPayload()))
      .catch((error) => res.status(500).send({ message: error.message || 'You tried to login with unauthorized Google account.' }));
  };
