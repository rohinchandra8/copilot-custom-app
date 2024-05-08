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
        <p>{ bug.title }</p>
        <p>{ bug.description }</p>
        <p>
          <StatusSelector 
            recordId = { bug.id }
            status={ bug.status }
            setStatus={callSetBugStatus}
          >
          </StatusSelector></p>
        <p>{ bug.priority }</p>
      </div>
    );
}