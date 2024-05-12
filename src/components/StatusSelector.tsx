
'use client'
import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";
enum BugStatus {
  NEW = "New",
  IN_PROGRESS = "In progress",
  READY_FOR_TESTING = "Ready for testing",
  VERIFIED = "Verified",
}
export function StatusSelector({ recordId, status, setStatus }: { recordId: string, status: BugStatus, setStatus: any }) {
    let valuesMap = new Map<BugStatus, string>([
      [BugStatus.NEW, "new"],
      [BugStatus.IN_PROGRESS, "inProgress"],
      [BugStatus.READY_FOR_TESTING, "readyForTesting"],
      [BugStatus.VERIFIED, "verified"]
    ]
    )
    let statusMap = new Map<string, BugStatus>([
      ["new", BugStatus.NEW,],
      ["inProgress", BugStatus.IN_PROGRESS,],
      ["readyForTesting", BugStatus.READY_FOR_TESTING],
      ["verified", BugStatus.VERIFIED,]
    ]
    )
    const initialSelectedOption = valuesMap.get(status)
    const [selectedOption, setSelectedOption] = useState(initialSelectedOption)

    function onSelection(value: string | undefined) {
      setSelectedOption(value)
      if (value) {
        setStatus(recordId, statusMap.get(value))
      }
    }

    return (
      <div className="w-72">
        <Select value={ selectedOption } onChange={(val) => onSelection(val)}>
          <Option value="new">New</Option>
          <Option value="inProgress">In Progress</Option>
          <Option value="readyForTesting">Ready For Testing</Option>
          <Option value="verified">Verified</Option>
        </Select>
      </div>
    )}
