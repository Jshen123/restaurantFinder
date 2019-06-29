module.exports = function queriesAndFunctions(db) {
    return {
      // authenticate users
      Authenticate: (username, password, done) => {

        db.select('user_id')
        .from('users')
        .where({username:username})
        .andWhere({password:password}).then(done);
      },
    };
}