import weaviate from 'weaviate-client';

const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080'
});

async function fetchJobs() {
  const result = await client.graphql.get()
    .withClassName('Job')
    .withFields([
      'title',
      'company',
      'location',
      'skills',
      'salary',
      'type',
      'image_url',
      'responsibilities',
      'qualifications',
      'created_at'
    ])
    .do();
  console.log(result.data.Get.Job);
}

fetchJobs();
