import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Set up OpenAI client
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Define the job template
const jobTemplate = {
  jobTitle: 'UI/UX Designer',
  companyName: 'Apple',
  location: 'Cupertino, CA, USA',
  skills: [
    { name: 'HTML', color: 'blue' },
    { name: 'CSS', color: 'yellow' },
    { name: 'FIGMA', color: 'pink' },
    { name: 'Ad. XD', color: 'lime' },
    { name: 'Illustrator', color: 'blue' },
  ],
  salary: '$60K - $100K per year',
  jobType: 'Full Time',
  imageUrl: 'https://img.icons8.com/fluency/48/null/mac-os.png',
  jobDescription: {
    responsibilities: [
      'Design and improve user interfaces for Apple applications and websites.',
      'Collaborate with product and engineering teams.',
      'Create wireframes, prototypes, and high-fidelity designs.'
    ],
    qualifications: [
      'Bachelor’s degree in Design, Computer Science, or related field.',
      '3+ years of experience in UI/UX design.',
      'Proficiency in design tools such as Figma and Adobe XD.',
      'Strong portfolio showcasing design skills.'
    ]
  }
};

// Function to generate job description using OpenAI
async function generateJobDescription(job) {
  const skillsList = job.skills.map(skill => skill.name).join(', ');
  const responsibilitiesList = job.jobDescription.responsibilities.join(', ');
  const qualificationsList = job.jobDescription.qualifications.join(', ');

  const prompt = `
  Generate a detailed job description based on the following template:
  Job Title: ${job.jobTitle}
  Company Name: ${job.companyName}
  Location: ${job.location}
  Skills: ${skillsList}
  Salary: ${job.salary}
  Job Type: ${job.jobType}
  Image URL: ${job.imageUrl}
  Responsibilities: ${responsibilitiesList}
  Qualifications: ${qualificationsList}

  Please format the job description as follows:
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

  const response = await openai.Completion.create({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 500,
  });

  return response.choices[0].text.trim();
}

// Example usage
generateJobDescription(jobTemplate).then(jobDescription => console.log(`Generated Job Description:\n${jobDescription}`));
