import Airtable  from "airtable"

const base = new Airtable({ apiKey: process.env.AIRTABLE_AUTH_TOKEN}).base("apphoSlbv6QLidu3F")

export default base;