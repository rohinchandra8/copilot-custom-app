import Image from 'next/image';
import { TokenGate } from '@/components/TokenGate';
import { getSession } from '@/utils/session';

async function Content({ searchParams }: { searchParams: SearchParams }) {
  const data = await getSession(searchParams);
  // Console log the data to see what's available
  // You can see these logs in the terminal where
  // you run `yarn dev`
  console.log({ data });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <iframe src="https://airtable.com/embed/appXLICEkXZA1sfmp/shr6PLn7PRzLmwDEL?backgroundColor=yellow&viewControls=on" width="100%" height="533"></iframe>
    </main>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <TokenGate searchParams={searchParams}>
      <Content searchParams={searchParams} />
    </TokenGate>
  );
}
