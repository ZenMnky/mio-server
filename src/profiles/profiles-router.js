const express = require("express");
const {ProfilesService} = require('./profiles-service');
const xss = require('xss');
const path = require('path');

const ProfilesRouter = express.Router();
const bodyParser = express.json();

const sanitizeProfile = profile => ({
    id: profile.id,
    first_name: xss(profile.first_name),
    last_name: xss(profile.last_name),
    nickname: xss(profile.nickname),
    image_url: xss(profile.image_url),
    relationship_level: profile.relationship_level,
    admirable_qualities: xss(profile.admirable_qualities),
    notes: xss(profile.notes)
})

ProfilesRouter
  .route('/')
  .get((req, res, next) => {
    ProfilesService.getAllProfiles(req.app.get('db'))
      .then((profiles) => {
        return res.json(profiles.map(sanitizeProfile))
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
  
    const { first_name, last_name, nickname, image_url, relationship_level, admirable_qualities, notes } = req.body;
    let reqProfile = { 
        first_name: xss(first_name),
        last_name: xss(last_name),
        nickname: xss(nickname),
        relationship_level: relationship_level,
        admirable_qualities: xss(admirable_qualities),
        notes: xss(notes) 
        };
    
    let optionalProfile = { image_url: xss(image_url) };
    
    let newProfile = {
        ...reqProfile,
         ...optionalProfile
    };

    for (const [key, value] of Object.entries(reqProfile)) {
      if(value == null) {
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` }
        });
      }
    }


    ProfilesService.insertProfile(
      req.app.get('db'),
      newProfile
    )
    .then(profile => {
        res
            .status(201)
            .location(path.posix.join (req.originalUrl, `/${profile.id}`))
            .json(profile);
    })
    .catch(next);
  });

ProfilesRouter
  .route('/:profile_id')
  .all((req, res, next) => {
    ProfilesService.getById(
      req.app.get('db'),
      req.params.profile_id
    )
      .then(profile => {
        if (!profile) {
          return res.status(404).json({
            error: { message: `Profile doesn't exist` }
          });
        };
        res.profile = profile;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(sanitizeProfile(res.profile));
  })
  .delete((req, res, next) => {
    ProfilesService.deleteProfile(
      req.app.get('db'),
      req.params.profile_id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    const { first_name, last_name, nickname, image_url, relationship_level, admirable_qualities, notes } = req.body;
    
    let reqProfile = { first_name, last_name, nickname, image_url, relationship_level, admirable_qualities, notes }
    
    
    let optionalProfile = { image_url };
    
    let profileToUpdate = {
        ...reqProfile,
         ...optionalProfile
    };

    ProfilesService.updateProfile(
        req.app.get('db'),
        req.params.profile_id,
        profileToUpdate
    )
    .then(numRowsAffected => {
        return res.status(204).end()
    })
    .catch(next)
  });

module.exports = ProfilesRouter;
