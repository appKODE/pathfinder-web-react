import React from 'react'
import { ChangeEvent } from 'react'
import styles from './upload-spec.module.css'

type Props = {
  onLoad: (data: any) => void
}

export const UploadSpec = ({ onLoad }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const blob = event.target.files
    if (blob && blob[0]) {
      const reader = new FileReader()
      reader.onload = handleReaderLoad
      reader.readAsText(blob[0])
    }
  }
  const handleReaderLoad = (event: ProgressEvent<FileReader>) => {
    if (event.target && typeof event.target.result === 'string') {
      const json = JSON.parse(event.target.result)
      onLoad(json)
    }
  }

  return (
    <label className={styles.label} htmlFor='upload-spec'>
      <div className={styles.text}>Загрузить спецификацию</div>
      <input
        id='upload-spec'
        className={styles.hide}
        type='file'
        onChange={handleChange}
        accept='application/json'
      />
    </label>
  )
}
