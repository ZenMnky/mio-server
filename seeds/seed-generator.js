const { image } = require('faker');
const faker = require('faker');
let profilesSeedArray = [];
let numberOfProfiles = 20;

for(let i=0; i < numberOfProfiles; i++){
    let id = i + 1;
    let first_name = faker.name.firstName();
    let last_name = faker.name.lastName();
    let nickname = faker.random.word();
    let image_url = faker.image.imageUrl();
    let relationship_level = faker.random.number(5);
    let admirable_qualiities = faker.lorem.paragraph(3);
    let notes = faker.lorem.paragraphs(3);

    if (relationship_level === 0){
        relationship_level += 1;
    }

    let seedProfile = `(${id}, '${first_name}', '${last_name}', '${nickname}', '${image_url}', ${relationship_level}, '${admirable_qualiities}', '${notes}')`;

    profilesSeedArray.push(seedProfile)
}

console.log(profilesSeedArray.join())
// remeber to add a semi colon to the end :)