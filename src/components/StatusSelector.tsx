
'use client'
import { Listbox } from '@headlessui/react'
import { init } from 'next/dist/compiled/webpack/webpack';
import { useState } from "react";
enum BugStatus {
  NEW = "New",
  IN_PROGRESS = "In progress",
  READY_FOR_TESTING = "Ready for testing",
  VERIFIED = "Verified",
}
export function StatusSelector({ recordId, status }: { recordId: string, status: BugStatus }) {
  const options = [
    { id: BugStatus.NEW, name: BugStatus.NEW, unavailable: false },
    { id: BugStatus.IN_PROGRESS, name: BugStatus.IN_PROGRESS, unavailable: false },
    { id: BugStatus.READY_FOR_TESTING, name: BugStatus.READY_FOR_TESTING, unavailable: false },
    { id: BugStatus.VERIFIED, name: BugStatus.VERIFIED, unavailable: true },
  ]
    let initialValueIndex = options.findIndex((option) => option.id === status)
    const [selectedOption, setSelectedOption] = useState(options[initialValueIndex])

    return (
      <Listbox value={selectedOption} onChange={setSelectedOption}>
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
