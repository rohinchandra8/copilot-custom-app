
'use client'
import { Listbox } from '@headlessui/react'
import { useState } from "react";
enum BugStatus {
  NEW = "New",
  IN_PROGRESS = "In progress",
  READY_FOR_TESTING = "Ready for testing",
  VERIFIED = "Verified",
}
export function StatusSelector({ recordId, status, setStatus }: { recordId: string, status: BugStatus, setStatus: any }) {
  const options = [
    { id: BugStatus.NEW, name: BugStatus.NEW, unavailable: false },
    { id: BugStatus.IN_PROGRESS, name: BugStatus.IN_PROGRESS, unavailable: false },
    { id: BugStatus.READY_FOR_TESTING, name: BugStatus.READY_FOR_TESTING, unavailable: false },
    { id: BugStatus.VERIFIED, name: BugStatus.VERIFIED, unavailable: false },
  ]
    let initialValueIndex = options.findIndex((option) => option.id === status)
    const [selectedOption, setSelectedOption] = useState(options[initialValueIndex])

    function onSelection(value: { id: BugStatus; name: BugStatus; unavailable: boolean; }) {
      setSelectedOption(value)
      setStatus(recordId, value.name)
    }
    return (
      <Listbox value={selectedOption} onChange={onSelection}>
        <Listbox.Button>{selectedOption.name}</Listbox.Button>
        <Listbox.Options>
          {options.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              disabled={option.unavailable}
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    )}
