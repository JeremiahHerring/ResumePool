import weaviate from 'weaviate-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080'
});

const jobSchema = {
  class: 'Job',
  description: 'A job description',
  properties: [
    { name: 'title', dataType: ['string'] },
    { name: 'company', dataType: ['string'] },
    { name: 'location', dataType: ['string'] },
    { name: 'skills', dataType: ['string[]'] },
    { name: 'salary', dataType: ['string'] },
    { name: 'type', dataType: ['string'] },
    { name: 'image_url', dataType: ['string'] },
    { name: 'responsibilities', dataType: ['string[]'] },
    { name: 'qualifications', dataType: ['string[]'] },
    { name: 'created_at', dataType: ['date'] }
  ]
};

async function createSchema() {
  await client.schema.classCreator().withClass(jobSchema).do();
  console.log('Schema created');
}

createSchema();
