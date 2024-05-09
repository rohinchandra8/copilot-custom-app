import { StatusSelector } from "@/components/StatusSelector";
import { setBugStatus } from "@/utils/airtable";

export enum BugStatus {
  NEW = "New",
  IN_PROGRESS = "In progress",
  READY_FOR_TESTING = "Ready for testing",
  VERIFIED = "Verified",
}
export type Bug = {
  id: string;
  companyID: string;
  title: string;
  description: string;
  status: BugStatus;
  priority: string;
}
export default async function Bugs({ bug}: { bug: Bug }) {

    async function callSetBugStatus(recordId: string, status: BugStatus) {
      "use server"
      setBugStatus(recordId, status)
    }
    return (
      <div className="flex flex-row">
        <div className="flex-1">
          <p>{ bug.title }</p>
        </div>
        <div className="flex-1">
          <p>{ bug.description }</p>        
        </div>
        <div className="flex-1">
          <StatusSelector 
            recordId = { bug.id }
            status={ bug.status }
            setStatus={callSetBugStatus}
          >
          </StatusSelector></div>
        <div className="flex-1">
          { bug.priority }
        </div>
      </div>
    );
}
