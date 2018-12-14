import React from 'react'
import { Tab } from 'semantic-ui-react'
import AllPeople from './allPeople'
import Requested from './requested'
import Friends from './friends'

const panes = [
  {
    menuItem: 'All',
    render: () => <Tab.Pane attached={false}><AllPeople/></Tab.Pane>,
  },
  {
    menuItem: 'Requested',
    render: () => <Tab.Pane attached={false}><Requested /></Tab.Pane>,
  },
  {
    menuItem: 'Friends',
    render: () => <Tab.Pane attached={false}><Friends /></Tab.Pane>,
  },
]

const TabExampleText = () => <Tab menu={{ text: true, fluid: true }} panes={panes}  />

export default TabExampleText