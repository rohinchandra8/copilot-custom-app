"use client"
import { Select } from '@headlessui/react'
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
    const [selectedoption, setSelectedoption] = useState(initialSelectedOption)

    function onSelection(value: string | undefined) {
      if (value) {
        setSelectedoption(value)
        setStatus(recordId, statusMap.get(value))
      }
    }
    return (
      <Select value={ selectedoption } onChange={(e) => onSelection(e.target.value)}>
        <option value="new">New</option>
        <option value="inProgress">In Progress</option>
        <option value="readyForTesting">Ready For Testing</option>
        <option value="verified">Verified</option>
      </Select>
    )}
