import React, { ReactNode } from 'react'
import { Pathfinder } from '@kode-frontend/pathfinder-web-react'
import { storage } from '@kode-frontend/pathfinder-web-local-storage'
import { openApiResolver } from '@kode-frontend/pathfinder-web-open-api'

type Props = {
  children: ReactNode
}

export const PathfinderProvider = ({ children }: Props) => {
  return (
    <Pathfinder
      children={children}
      resolver={openApiResolver}
      storage={storage}
      active={process.env.NODE_ENV !== 'production'}
    />
  )
}
