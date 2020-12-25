const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const faker = require('faker');

const {makeProfilesArray} = require('./profiles.fixtures');

describe(`Profiles endpoints`, () => {
    let db;

    before(`make knex instance`, () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db', db)
    })

    after(`disconnect from db`, () => db.destroy() )

    before(`clean table`, () => {
        return db
        .raw('TRUNCATE TABLE profiles RESTART IDENTITY CASCADE')
    })

    afterEach(`clean table`, () => {
        return db
            .raw('TRUNCATE TABLE profiles RESTART IDENTITY CASCADE')
    })

    describe(`GET /api/profiles`, () => {
        context(`Given no profiles`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get(`/api/profiles`)
                    .expect(200, [])
            })
        })

        context(`Given there are profiles in the database`, () => {
            const testProfiles = makeProfilesArray();
            
            beforeEach(`insert profiles`, () => {
                return db
                    .into('profiles')
                    .insert(testProfiles)
            })

            it(`responds with 200 and the expected profiles`, () => {
                return supertest(app)
                    .get(`/api/profiles`)
                    .expect(200, testProfiles)
            })
        })
    })
    
    describe(`GET /api/profiles/:profile_id`, () => {
        const testProfiles = makeProfilesArray();
            
        beforeEach(`insert profiles`, () => {
            return db
                .into('profiles')
                .insert(testProfiles)
        })
        
        it(`responds with 200 and the expected profile`, () => {
            const profileId = 2
            const expectedProfile = testProfiles[profileId - 1]
            return supertest(app)
                .get(`/api/profiles/${profileId}`)
                .expect(200, expectedProfile)
        })
    })

    describe(`POST /api/profiles`, () => {
        
        it(`responds with 201 when profile is added
             and returns new profile with id`, () => {

            const newProfile = {
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                nickname: faker.random.word(),
                image_url: faker.image.imageUrl(),
                relationship_level: 5,
                admirable_qualities: faker.lorem.paragraph(3),
                notes: faker.lorem.paragraphs(3),
            }

            return supertest(app)
                .post('/api/profiles')
                .send(newProfile)
                .expect(201)
                .expect(res => {
                    expect(res.body.first_name).to.eql(newProfile.first_name)
                    expect(res.body.last_name).to.eql(newProfile.last_name)
                    expect(res.body.nickname).to.eql(newProfile.nickname)
                    expect(res.body.image_url).to.eql(newProfile.image_url)
                    expect(res.body.relationship_level).to.eql(newProfile.relationship_level)
                    expect(res.body.admirable_qualities).to.eql(newProfile.admirable_qualities)
                    expect(res.body.notes).to.eql(newProfile.notes)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/api/profiles/${res.body.id}`)
                })
                .then(response => {
                    supertest(app)
                        .get(`/api/profiles/${response.body.id}`)
                        .expect(response.body)
                })
                
        })

    })

    describe(`DELETE /api/profiles/:profile_id`, () => {
        context(`Given no profiles`, () => {
            it(`responds with 404`, () => {
                const profileId = 1;
                return supertest(app)
                    .delete(`/api/profiles/${profileId}`)
                    .expect(404, {error: { message: `Profile doesn't exist` }})
            })
        })

        context(`Given profiles`, () => {
            const testProfiles = makeProfilesArray();
            
            beforeEach(`insert profiles`, () => {
                return db
                    .into('profiles')
                    .insert(testProfiles)
            })

            it(`Responds with 204 and removes the profile`, () => {
                const idToRemove = 2
                const expectedProfiles = testProfiles.filter(profile => profile.id !== idToRemove )
                return supertest(app)
                    .delete('/api/profiles/2')
                    .expect(204)
                    .then(() => {
                        return supertest(app)
                            .get(`/api/profiles`)
                            .expect(200, expectedProfiles)

                    })
            })
        })
    })

    describe(`PATCH /api/profiles/:profile_id`, () => {
        
        context(`Given no profiles`, () => {
            it(`responds with 404`, () => {
                const profileId = 1;
                return supertest(app)
                    .patch(`/api/profiles/${profileId}`)
                    .expect(404, {error: { message: `Profile doesn't exist` }})
            })
        })
        context(`Given profiles`, () => {
            const testProfiles = makeProfilesArray();
            
            beforeEach(`insert profiles`, () => {
                return db
                    .into('profiles')
                    .insert(testProfiles)
            })

            it(`responds with 204 and updates the profile`, () => {
                const idToUpdate = 2;
                const updatedProfile = {                
                    nickname: ' new nick',
                    relationship_level: 5,
                    admirable_qualities: 'moderation, courage, honesty',
                    notes: 'regularly contemplate admirable characteristics' 
                };

                

                const expectedProfile = {
                    ...testProfiles[idToUpdate - 1],
                    ...updatedProfile
                }

                return supertest(app)
                    .patch(`/api/profiles/${idToUpdate}`)
                    .send(updatedProfile)
                    .expect(204)
                    .then( res => {
                        return supertest(app)
                        .get(`/api/profiles/${idToUpdate}`)
                        .expect(expectedProfile)
                })
            })

        })

    })
  
})
