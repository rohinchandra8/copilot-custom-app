import { StatusSelector } from "@/components/StatusSelector";
import { setBugStatus } from "@/utils/airtable";


export enum BugStatus {
  NEW = "New",
  IN_PROGRESS = "In progress",
  READY_FOR_TESTING = "Ready for testing",
  VERIFIED = "Verified",
}

export enum BugPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}
export type Bug = {
  id: string;
  companyID: string;
  title: string;
  page: string;
  description: string;
  status: BugStatus;
  priority: BugPriority;
}
export default async function Bugs({ bug}: { bug: Bug }) {

    async function callSetBugStatus(recordId: string, status: BugStatus) {
      "use server"
      setBugStatus(recordId, status)
    }
    return (
      <div className="p-8 border-solid border-2 border-neutral-50 rounded-3xl shadow-sm mb-2 font-archivo">
        <b className="text-xl pl-12">{ bug.title }</b>
        <div className="flex flex-row items-baseline">
          <div className="pl-12 pr-12 pt-2 pb-2 flex-1">
            <p className="text-gray-500 pb-1">Page</p>
            <p className="text-neutral-950 text-sm">{ bug.page }</p>    
          </div>
          <div className="pl-12 pr-12 pt-2 pb-2 flex-1">
            <p className="text-gray-500 pb-1">Description</p>
            <p className="text-neutral-950 text-sm">{ bug.description }</p>        
          </div>
          <div className="pl-12 pr-12 pt-2 pb-2 flex-1">
            <div>
              <p className="text-gray-500 pb-1">Priority</p>
              <p className="text-neutral-950">{ bug.priority }</p>    
            </div>
          </div>
          <div className="pl-12 pr-12 pt-2 pb-2 flex-1">
            <StatusSelector 
              recordId = { bug.id }
              status={ bug.status }
              setStatus={callSetBugStatus}
            >
            </StatusSelector>
          </div>
        </div>
      </div>
    );
}
