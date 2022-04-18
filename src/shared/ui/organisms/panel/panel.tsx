import React, { useMemo, useState } from 'react'
import styles from './panel.module.css'

import { Header } from '../../molecules/header'
import { EndpointsList } from '../../organisms/endpoints-list'
import { UploadSpec } from '../../molecules/upload-spec/upload-spec'
import { RadioGroup } from '../../molecules/radio-group'
import { TOption } from '../../molecules/radio-group/types'

export type PanelEnv = { id: string; name: string }
export type PanelUrl = {
  id: string
  method: string
  template: string
  name: string
}
export type Config = {
  envList: PanelEnv[]
  urlList: PanelUrl[]
}

type Props = {
  config: Config
  defaultEnvId: string
  urlEnvInitialValues: Record<string, string>

  onClose: () => void
  onChangeDefaultEnv: (envId: string | null) => void
  onChangeUrlEnv: (urlId: string, envId?: string) => void
  onLoadSpec: (data: unknown) => void
}

export const Panel = ({
  config,
  defaultEnvId,
  onClose,
  onChangeDefaultEnv,
  onChangeUrlEnv,
  onLoadSpec,
  urlEnvInitialValues
}: Props) => {
  const [defaultEnv, setDefaultValue] = useState<string>(defaultEnvId || '')

  const environments = useMemo<TOption[]>(
    () =>
      config.envList.map((env) => ({
        value: env.id,
        label: env.name
      })),
    [config]
  )

  return (
    <div className={styles.wrapper}>
      <Header onClose={onClose}>Pathfinder</Header>
      <UploadSpec onLoad={onLoadSpec} />
      {environments.length > 0 && (
        <table className={styles.defaultControls}>
          <tr>
            <td>Использовать окружение для всех запросов:</td>
            <td>
              <RadioGroup
                onChange={(_, value) => {
                  onChangeDefaultEnv(value || null)
                  setDefaultValue(value)
                }}
                value={defaultEnv}
                id={'default'}
                items={[
                  ...environments,
                  {
                    label: 'Default',
                    value: ''
                  }
                ]}
              />
            </td>
          </tr>
        </table>
      )}
      {config.urlList.length > 0 && (
        <EndpointsList
          onChange={onChangeUrlEnv}
          environments={environments}
          items={config.urlList}
          initialValues={urlEnvInitialValues}
        />
      )}
    </div>
  )
}

export default Panel
