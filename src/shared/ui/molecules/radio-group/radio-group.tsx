import React from 'react'
import styles from './radio-group.module.css'
import { TOption } from './types'

type TRadiogroupProps = {
  items: TOption[]
  id: string
  onChange: (id: string, value: string) => void
  value?: string
}

export const RadioGroup = ({
  id,
  items,
  value,
  onChange
}: TRadiogroupProps) => (
  <div className={styles.group}>
    {items.map((item) => (
      <label key={item.value} className={styles.label}>
        <input
          onChange={() => onChange(id, item.value)}
          type='radio'
          name={id}
          value={item.value}
          className={styles.input}
          checked={item.value === value}
        />
        {item.label}
      </label>
    ))}
  </div>
)

export default RadioGroup
