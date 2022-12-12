import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://softops.com" target="_blank" rel="noopener noreferrer">
          Soft Ops
        </a>
        <span className="ms-1">&copy; 2022 ~ Mainframe Made Simple.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Design by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          CoreUI for React
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
