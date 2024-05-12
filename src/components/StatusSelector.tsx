"use client"
import { Select } from '@headlessui/react'
import { useState } from "react";
export enum TaskStatus {
  NEW = "New",
  IN_PROGRESS = "In progress",
  READY_FOR_REVIEW = "Ready for review",
  COMPLETE = "Complete",
}
export function StatusSelector({ recordId, status, setStatus }: { recordId: string, status: TaskStatus, setStatus: any }) {
    const valuesMap = new Map<TaskStatus, string>([
      [TaskStatus.NEW, "new"],
      [TaskStatus.IN_PROGRESS, "inProgress"],
      [TaskStatus.READY_FOR_REVIEW, "readyForTesting"],
      [TaskStatus.COMPLETE, "complete"]
      ]
    )
    const statusMap = new Map<string, TaskStatus>([
      ["new", TaskStatus.NEW],
      ["inProgress", TaskStatus.IN_PROGRESS],
      ["readyForTesting", TaskStatus.READY_FOR_REVIEW],
      ["complete", TaskStatus.COMPLETE]
      ]
    )
    const colorMap = new Map<string | undefined, string>([
      ["new", "bg-red-100 text-gray-900"],
      ["inProgress", "bg-orange-100 text-gray-900"],
      ["readyForTesting", "bg-green-100 text-gray-900"],
      ["complete", "bg-green-600 text-neutral-100",]
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
      <Select className={`${color} border border-gray-300 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5`} 
              value={ selectedoption } 
              onChange={(e) => onSelection(e.target.value)}>
        <option value="new">New</option>
        <option value="inProgress">In Progress</option>
        <option value="readyForTesting">Ready For Review</option>
        <option value="complete">Complete</option>
      </Select>
    )}
