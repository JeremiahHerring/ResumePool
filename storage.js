import schedule from 'node-schedule';
import { DateTime } from 'luxon';

const expiryDuration = 3; // Set job expiry duration in hours

async function deleteExpiredJobs() {
  const expiryDate = DateTime.now().minus({ hours: expiryDuration }).toISO();
  const query = {
    operator: "LessThan",
    path: ["created_at"],
    valueDate: expiryDate
  };
  const results = await client.query.get("Job", ["_additional { id }"]).withWhere(query).do();
  if (results && results.data && results.data.Get && results.data.Get.Job) {
    for (const job of results.data.Get.Job) {
      await client.dataObject.delete(job._additional.id);
    }
  }
  console.log("Deleted expired job descriptions.");
}

function jobGenerationCycle() {
  deleteExpiredJobs();
  generateAndStoreJobs();
}

// Schedule the job generation to run periodically
schedule.scheduleJob('0 0 * * *', jobGenerationCycle); // Run daily at midnight

jobGenerationCycle(); // Run immediately on startup
