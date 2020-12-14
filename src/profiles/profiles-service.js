const ProfilesService = {
  getAllProfiles(db) {
    return db
      .select('*')
      .from('profiles');
  },
  insertProfile(db, newProfile) {
    return db
      .insert(newProfile)
      .into('profiles')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  getById(db, id) {
    return db
      .select('*')
      .from('profiles')
      .where({ id: id })
      .first();
  },
  deleteProfile(db, id) {
    return db
      .from('profiles')
      .where({ id })
      .delete();
  },
  updateProfile(db, id, newData) {
    return db
      .from('profiles')
      .where({ id })
      .update(newData);
  }
}

module.exports = { ProfilesService }

