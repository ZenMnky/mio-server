const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');

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
    })
    
    describe(`POST /api/profiles`, () => {})

    describe(`GET /api/profiles/:profile_id`, () => {})

    describe(`DELETE /api/profiles/:profile_id`, () => {})

    describe(`PATCH /api/profiles/:profile_id`, () => {})
  
})
