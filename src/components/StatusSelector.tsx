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
    const valuesMap = new Map<BugStatus, string>([
      [BugStatus.NEW, "new"],
      [BugStatus.IN_PROGRESS, "inProgress"],
      [BugStatus.READY_FOR_TESTING, "readyForTesting"],
      [BugStatus.VERIFIED, "verified"]
      ]
    )
    const statusMap = new Map<string, BugStatus>([
      ["new", BugStatus.NEW],
      ["inProgress", BugStatus.IN_PROGRESS],
      ["readyForTesting", BugStatus.READY_FOR_TESTING],
      ["verified", BugStatus.VERIFIED]
      ]
    )
    const colorMap = new Map<string | undefined, string>([
      ["new", "bg-red-100"],
      ["inProgress", "bg-orange-100"],
      ["readyForTesting", "bg-green-100"],
      ["verified", "bg-green-500",]
    ])
    const initialSelectedOption = valuesMap.get(status)
    const [selectedoption, setSelectedOption] = useState(initialSelectedOption)
    const [color, setColor] = useState(colorMap.get(initialSelectedOption))

    function onSelection(value: string | undefined) {
      if (value) {
        setSelectedOption(value)
        setStatus(recordId, statusMap.get(value))
        setColor(colorMap.get(value))
      }
    }
    return (
      <Select className={`${color} border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5`} 
              value={ selectedoption } 
              onChange={(e) => onSelection(e.target.value)}>
        <option value="new">New</option>
        <option value="inProgress">In Progress</option>
        <option value="readyForTesting">Ready For Testing</option>
        <option value="verified">Verified</option>
      </Select>
    )}
