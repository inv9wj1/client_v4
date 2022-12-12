import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
  cilSpeedometer,
  cilStar,
  cil3d,
  cilLightbulb,
  cilGroup,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Bulletin Space',
    to: '/bulletin',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Monitoring Space',
    to: '/monitoring',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },  {
    component: CNavItem,
    name: 'File Space',
    to: '/filespace',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'MBC Live',
    to: '/news',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Query Space',
    icon: <CIcon icon={cil3d} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Commands',
        to: '/queryspacecommand',
      },
      {
        component: CNavItem,
        name: 'Batch Jobs',
        to: '/queryspacebatch',
      },
      {
        component: CNavItem,
        name: 'Automation',
        to: '/queryspaceautomation',
        // badge: {
        //   color: 'success',
        //   text: 'Coming Soon',
        // },
      },
      // {
      //   component: CNavItem,
      //   name: 'Job Outputs',
      //   to: '/joboutput',
      // },
    ],
  },
  {
    component: CNavItem,
    name: 'Automation Space',
    to: '/automationspace',
    icon: <CIcon icon={cilLightbulb} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Help / Support',
    to: '/helpsupport',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'What\'s Next?',
  },
  {
    component: CNavGroup,
    name: 'Coming soon...',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Phase 2',
        to: '/phase2',
      },
      {
        component: CNavItem,
        name: 'Phase 3',
        to: '/phase3',
      },
      {
        component: CNavItem,
        name: 'Phase 4',
        to: '/phase4',
      },
    ],
  },
]

export default _nav
