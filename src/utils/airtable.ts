
import { Task, TaskPriority, TaskStatus } from "@/components/Task";
import { need } from "@/utils/need";
import Airtable  from "airtable"

export async function getTasksFromAirtable(CompanyID: string) {
    const authToken = need<string>(
        process.env.AIRTABLE_AUTH_TOKEN,
        'AIRTABLE_AUTH_TOKEN is required, guide available at: https://docs.copilot.com/docs/custom-apps-setting-up-your-first-app#step-2-register-your-app-and-get-an-api-key',
      );
    const base = new Airtable({ apiKey: authToken}).base("apphoSlbv6QLidu3F")
    
    const table = base('Tasks').select({ 
        view: 'Grid view', 
      })
    
      const Tasks: Task[] = []
    
      try {
        await table.eachPage((records, processNextPage) => {
          records.forEach(({ fields, id }) => {
            const recordCompanyID = fields.CompanyID as string;
            if (recordCompanyID === CompanyID) {
              Tasks.push({
                id,
                companyID: recordCompanyID,
                title: fields.Task as string,
                description: fields.Description as string,
                deadline: new Date(fields.Deadline as string),
                status: fields.Status as TaskStatus,
                priority: fields.Priority as TaskPriority
              })
            }
          });
          processNextPage();
        });
      } catch (error) {
        console.log(error);
      }

      return Tasks;
}

export async function setTaskStatus(id: string, status: TaskStatus){
    const authToken = need<string>(
        process.env.AIRTABLE_AUTH_TOKEN,
        'AIRTABLE_AUTH_TOKEN is required, guide available at: https://docs.copilot.com/docs/custom-apps-setting-up-your-first-app#step-2-register-your-app-and-get-an-api-key',
      );
    const base = new Airtable({ apiKey: authToken}).base("apphoSlbv6QLidu3F")
  
    base('Tasks').update([
        {
            "id": id,
            "fields": {
                "Status": status
            }
        }
    ])
}