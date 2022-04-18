import React from 'react'
import { memo, MouseEventHandler, ReactNode } from 'react'
import styles from './button.module.css'
import { classNames } from '../../utils/class-names'

type Props = {
  children: ReactNode
  transparent?: boolean
  active?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = memo(
  ({ children, transparent, active, onClick }: Props) => (
    <button
      className={classNames([
        styles.wrapper,
        transparent && styles.transparent,
        active && styles.active
      ])}
      onClick={onClick}
    >
      {children}
    </button>
  )
)

export default Button
