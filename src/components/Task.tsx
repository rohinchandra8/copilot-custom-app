import { StatusSelector } from "@/components/StatusSelector";
import { setTaskStatus } from "@/utils/airtable";


export enum TaskStatus {
  NEW = "New",
  IN_PROGRESS = "In progress",
  READY_FOR_REVIEW = "Ready for review",
  COMPLETE = "Complete",
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}
export type Task = {
  id: string;
  companyID: string;
  title: string;
  description: string;
  deadline: Date;
  status: TaskStatus;
  priority: TaskPriority;
}
export default async function Tasks({ Task }: { Task: Task }) {

    async function callSetTaskStatus(recordId: string, status: TaskStatus) {
      "use server"
      setTaskStatus(recordId, status)
    }
    const deadlineString = new Intl.DateTimeFormat('en-US').format(Task.deadline)
    return (
      <div className="p-8 border-solid border-2 border-neutral-100 rounded-3xl shadow mb-4 font-archivo">
        <b className="text-xl pl-12">{ Task.title }</b>
        <div className="flex flex-row items-baseline">
          <div className="pl-12 pr-12 pt-2 pb-2 flex-1">
            <p className="text-gray-500 pb-1">Description</p>
            <p className="text-neutral-950 text-sm">{ Task.description }</p>    
          </div>
          <div className="pl-12 pr-12 pt-2 pb-2 flex-1">
            <p className="text-gray-500 pb-1">Deadline</p>
            <p className="text-neutral-950 text-sm">{ deadlineString }</p>        
          </div>
          <div className="pl-12 pr-12 pt-2 pb-2 flex-1">
            <div>
              <p className="text-gray-500 pb-1">Priority</p>
              <p className="text-neutral-950 text-sm">{ Task.priority }</p>    
            </div>
          </div>
          <div className="pl-12 pr-12 pt-2 pb-2 flex-1">
            <StatusSelector 
              recordId = { Task.id }
              status={ Task.status }
              setStatus={callSetTaskStatus}
            >
            </StatusSelector>
          </div>
        </div>
      </div>
    );
}
