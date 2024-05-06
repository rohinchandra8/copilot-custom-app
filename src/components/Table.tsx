import base from "@/utils/airtable";
type Bug = {
  id: string;
  companyID: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}
export default async function Table({ CompanyID }: { CompanyID: string }) {
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
            description: fields.Description as string,
            status: fields.Status as string,
            priority: fields.Priority as string
          })
        }
      });
      processNextPage();
    });
  } catch (error) {
    console.log(error);
  }
    let headers = ["Bug", "Description", "Status", "Priority"]
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
                <td>{ bug.status }</td>
                <td>{ bug.priority }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}
