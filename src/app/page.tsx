import { TokenGate } from '@/components/TokenGate';
import { getSession } from '@/utils/session';  
import { getTasksFromAirtable } from '@/utils/airtable';
import Task from '@/components/Task';

async function Content({ searchParams }: { searchParams: SearchParams }) {
  const data = await getSession(searchParams);
  // Console log the data to see what's available
  // You can see these logs in the terminal where
  // you run `yarn dev`
  console.log({ data });
  const companyID = data.company?.id || '';
  const airtableTasks = await getTasksFromAirtable(companyID);
  console.log(airtableTasks)
  return (
    <main className="flex flex-col items-center mt-12">
      <h1 className="flex-1 text-3xl mb-12 font-archivo font-semibold">Designs for {data.company?.name}</h1>
      <div className="flex flex-col">
        {airtableTasks.map(task => {
          return <Task key={task.id} Task={task}></Task>
        })}
      </div>
    </main>
  );
}

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  return (
    <TokenGate searchParams={searchParams}>
      <Content searchParams={searchParams} />
    </TokenGate>
  );
}
