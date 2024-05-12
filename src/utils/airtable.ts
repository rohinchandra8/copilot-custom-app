
import { Bug, BugPriority, BugStatus } from "@/components/Bug";
import { need } from "@/utils/need";
import Airtable  from "airtable"

export async function getBugsFromAirtable(CompanyID: string) {
    const authToken = need<string>(
        process.env.AIRTABLE_AUTH_TOKEN,
        'AIRTABLE_AUTH_TOKEN is required, guide available at: https://docs.copilot.com/docs/custom-apps-setting-up-your-first-app#step-2-register-your-app-and-get-an-api-key',
      );
    const base = new Airtable({ apiKey: authToken}).base("apphoSlbv6QLidu3F")
    
    const table = base('Tasks').select({ 
        view: 'Grid view', 
      })
    
      const bugs: Bug[] = []
    
      try {
        await table.eachPage((records, processNextPage) => {
          records.forEach(({ fields, id }) => {
            const recordCompanyID = fields.CompanyID as string;
            if (recordCompanyID === CompanyID) {
              bugs.push({
                id,
                companyID: recordCompanyID,
                title: fields.Bug as string,
                page: fields.Page as string,
                description: fields.Description as string,
                status: fields.Status as BugStatus,
                priority: fields.Priority as BugPriority
              })
            }
          });
          processNextPage();
        });
      } catch (error) {
        console.log(error);
      }

      return bugs;
}

export async function setBugStatus(id: string, status: BugStatus){
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