const faker = require('faker');
const makeProfilesArray = () => {
    return [
        {
            id: 1,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            nickname: faker.random.word(),
            image_url: faker.image.imageUrl(),
            relationship_level: 1,
            admirable_qualiities: faker.lorem.paragraph(3),
            notes: faker.lorem.paragraphs(3),
        },
        {
            id: 2,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            nickname: faker.random.word(),
            image_url: faker.image.imageUrl(),
            relationship_level: 2,
            admirable_qualiities: faker.lorem.paragraph(3),
            notes: faker.lorem.paragraphs(3),
        },
        {
            id: 3,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            nickname: faker.random.word(),
            image_url: faker.image.imageUrl(),
            relationship_level: 3,
            admirable_qualiities: faker.lorem.paragraph(3),
            notes: faker.lorem.paragraphs(3),
        },
        {
            id: 4,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            nickname: faker.random.word(),
            image_url: faker.image.imageUrl(),
            relationship_level: 4,
            admirable_qualiities: faker.lorem.paragraph(3),
            notes: faker.lorem.paragraphs(3),
        },
        {
            id: 4,
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            nickname: faker.random.word(),
            image_url: faker.image.imageUrl(),
            relationship_level: 5,
            admirable_qualiities: faker.lorem.paragraph(3),
            notes: faker.lorem.paragraphs(3),
        }
    ]
};

module.exports = {makeProfilesArray};