import weaviate from 'weaviate-client';
import openai from 'openai';
import { load } from 'dotenv';

load();

// OpenAI API setup
openai.apiKey = process.env.OPENAI_API_KEY;

// Weaviate client setup
const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080'
});

const jobTemplates = [
  {
    title: "UI/UX Designer",
    company: "Apple",
    location: "Cupertino, CA, USA",
    skills: ["HTML", "CSS", "FIGMA", "Adobe XD", "Illustrator"],
    salary: "$60K - $100K per year",
    type: "Full Time",
    image_url: "https://img.icons8.com/fluency/48/null/mac-os.png",
    responsibilities: [
      "Design and improve user interfaces for Apple applications and websites.",
      "Collaborate with product and engineering teams.",
      "Create wireframes, prototypes, and high-fidelity designs."
    ],
    qualifications: [
      "Bachelor’s degree in Design, Computer Science, or related field.",
      "3+ years of experience in UI/UX design.",
      "Proficiency in design tools such as Figma and Adobe XD.",
      "Strong portfolio showcasing design skills."
    ]
  },
  // Add more job templates here...
];

async function generateJobDescription(template) {
  const skillsList = template.skills.join(', ');
  const responsibilitiesList = template.responsibilities.join(', ');
  const qualificationsList = template.qualifications.join(', ');

  const prompt = `
    Create a detailed job description based on the following information:
    Job Title: ${template.title}
    Company Name: ${template.company}
    Location: ${template.location}
    Skills: ${skillsList}
    Salary: ${template.salary}
    Job Type: ${template.type}
    Image URL: ${template.image_url}

    Responsibilities:
    ${responsibilitiesList}

    Qualifications:
    ${qualificationsList}

    Format the job description as follows:
    Title: [Job Title]
    Company: [Company Name]
    Location: [Location]
    Salary: [Salary]
    Job Type: [Job Type]
    Image: [Image URL]

    Responsibilities:
    - [Responsibility 1]
    - [Responsibility 2]
    - [Responsibility 3]

    Qualifications:
    - [Qualification 1]
    - [Qualification 2]
    - [Qualification 3]
  `;

  const response = await openai.ChatCompletion.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ]
  });

  return {
    title: template.title,
    company: template.company,
    location: template.location,
    skills: template.skills,
    salary: template.salary,
    type: template.type,
    image_url: template.image_url,
    responsibilities: template.responsibilities,
    qualifications: template.qualifications,
    created_at: new Date().toISOString()
  };
}

async function storeJobInWeaviate(job) {
  await client.dataObject.create(job, "Job");
  console.log('Job stored in Weaviate');
}

async function generateAndStoreJobs() {
  for (const template of jobTemplates) {
    const jobDescription = await generateJobDescription(template);
    await storeJobInWeaviate(jobDescription);
  }
}

generateAndStoreJobs();
