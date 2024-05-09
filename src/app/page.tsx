import { TokenGate } from '@/components/TokenGate';
import { getSession } from '@/utils/session';  
import { getBugsFromAirtable } from '@/utils/airtable';
import Bug from '@/components/Bug';

export type Bug = {
  id: string;
  companyID: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}
async function Content({ searchParams }: { searchParams: SearchParams }) {
  const data = await getSession(searchParams);
  // Console log the data to see what's available
  // You can see these logs in the terminal where
  // you run `yarn dev`
  console.log({ data });
  const companyID = data.company?.id || '';
  const airtableBugs = await getBugsFromAirtable(companyID);
  console.log(airtableBugs)
  return (
    <main className="flex flex-col items-center p-24">
      <h1 className="text-3xl">Bugs</h1>
      <div className="flex flex-col">
        {airtableBugs.map(bug => {
          return <Bug key={bug.id} bug={bug}></Bug>
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
