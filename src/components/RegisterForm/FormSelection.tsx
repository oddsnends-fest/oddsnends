import React from 'react'
import Image from 'next/image'

type optionType = {
    value: string;
    label: string;
}

type formSelectionProps = {
    labelEn: string;
    labelTH: string;
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    options: optionType[];
}

const FormSelection = ({
    labelEn,
    labelTH,
    state,
    setState,
    options,
}: formSelectionProps) => {
  return (
    <div className={`flex flex-col gap-2 ${labelEn.length + labelTH.length >= 30 && "tracking-tight"}`}>
    <label htmlFor={labelEn}>{labelEn} <span className='ml-1 opacity-50'>{labelTH}</span></label>
    <div className='relative'>
      <select 
        onChange={(e) => setState(e.target.value)}
        className={`w-full appearance-none px-4 py-2 rounded-xl ${state === "" ? "text-gray-400" : "text-black"}`}
        required
        defaultValue={""}
      >
        <option value={""} disabled hidden className='text-gray-400'>
          {labelTH}
        </option>

        {options.map(({value, label}) => (
            <option key={value + ""} value={value + ""}>{label}</option>
        ))}
      </select>
      <Image 
        src={"/images/register/drop-down.png"}
        alt='dropdown'
        width={10}
        height={10}
        className='absolute right-4 top-1/2 -translate-y-1/2'
      />
    </div>
  </div>
  )
}

export default FormSelection