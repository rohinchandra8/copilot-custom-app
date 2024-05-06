import Image from 'next/image';
import { TokenGate } from '@/components/TokenGate';
import { getSession } from '@/utils/session';  
import Table from '@/components/Table';

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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table CompanyID={companyID}></Table>
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
