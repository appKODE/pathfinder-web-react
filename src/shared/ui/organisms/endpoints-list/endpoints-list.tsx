import React from 'react'
import { useState } from 'react'
import styles from './endpoints-list.module.css'

import { RadioGroup } from '../../molecules/radio-group'
import { TOption } from '../../molecules/radio-group/types'

export type UrlItem = {
  id: string
  method: string
  template: string
  name: string
}

type Props = {
  className?: string
  environments: TOption[]
  items: UrlItem[]
  initialValues: Record<string, string>
  onChange: (urlId: string, envId?: string) => void
}

export const EndpointsList = ({
  environments,
  items,
  initialValues,
  onChange
}: Props) => {
  const [values, setValues] = useState(initialValues)

  return (
    <div className={styles.wrapper}>
      <table className={styles.endpointsTable}>
        {items.map((item) => (
          <tr key={item.id}>
            <td>
              <span className={`${styles[item.method]} ${styles.method}`}>
                {item.method}
              </span>
            </td>
            <td>
              {item.template}
              <div className={styles.endpointName}>{item.name}</div>
            </td>
            <td>
              <RadioGroup
                onChange={(id, value) => {
                  onChange(id, value || undefined)
                  setValues((prev) => ({ ...prev, [id]: value }))
                }}
                value={values[item.id]}
                id={item.id}
                items={[
                  ...environments,
                  {
                    label: 'Global',
                    value: ''
                  }
                ]}
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default EndpointsList
