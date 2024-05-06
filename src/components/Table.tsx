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
export default async function Table({ bugs }: { bugs: Bug[] }) {

    let headers = ["Bug", "Description", "Status", "Priority"]

    async function callSetBugStatus(recordId: string, status: BugStatus) {
      "use server"
      setBugStatus(recordId, status)
    }
    return (
      <table>
        <thead>
          <tr>
            {headers.map((head, headID) => (
            <th key={headID}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bugs.map(bug => {
            return (
              <tr key={bug.id}>
                <td>{ bug.title }</td>
                <td>{ bug.description }</td>
                <td>
                  <StatusSelector 
                    recordId = { bug.id }
                    status={ bug.status }
                    setStatus={callSetBugStatus}
                  >
                  </StatusSelector></td>
                <td>{ bug.priority }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}
