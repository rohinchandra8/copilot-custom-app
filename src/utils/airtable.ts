import { BugStatus } from "@/components/Table";
import Airtable  from "airtable"

const base = new Airtable({ apiKey: process.env.AIRTABLE_AUTH_TOKEN}).base("apphoSlbv6QLidu3F")

export default base;

export async function setBugStatus(id: string, status: BugStatus){
    base('Tasks').update([
        {
            "id": id,
            "fields": {
                "Status": status
            }
        }
    ])
}