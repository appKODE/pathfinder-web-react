import React from 'react'
import { Button } from '../../atoms/button'
import { memo, MouseEventHandler, ReactNode } from 'react'
import { CloseIcon } from '../../atoms/close-icon'
import styles from './header.module.css'

type Props = {
  children: ReactNode
  onClose: MouseEventHandler<HTMLButtonElement>
}

export const Header = memo(({ children, onClose }: Props) => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>{children}</h1>
    <div className={styles.action}>
      <Button transparent onClick={onClose}>
        <CloseIcon width={16} height={16} />
      </Button>
    </div>
  </div>
))

export default Header
