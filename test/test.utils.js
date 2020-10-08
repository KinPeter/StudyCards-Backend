module.exports = {
  user: {
    username: 'api-test',
    password: 'pass123',
  },

  handleError(error, done) {
    if (error) {
      console.log('[ERROR RESPONSE]');
      console.log(error);
      return done(error);
    }
    done();
  },
};
