import React from 'react'
import { Tab } from 'semantic-ui-react'
import AllPeople from './allPeople'
import Requested from './requested'
import Friends from './friends'
import { Menu, Icon, Divider } from 'semantic-ui-react';

const panes = [
  {
    menuItem: (
      <Menu.Item key='all'>
        <Icon name="list alternate outline" size="small"/> All
      </Menu.Item>
    ),
    render: () => <Tab.Pane as="h5"><AllPeople/></Tab.Pane>,
  },
  {
    menuItem: (
      <Menu.Item key='requested'>
        <Icon name="paper plane outline" size="small"/> Requested
      </Menu.Item>
    ),
    render: () => <Tab.Pane as="h5"><Requested /></Tab.Pane>,
  },
  {
    menuItem: (
      <Menu.Item key='friends'>
        <Icon name="handshake outline" size="small"/> Friends
      </Menu.Item>
    ),
    render: () => <Tab.Pane as="h5"><Friends /></Tab.Pane>,
  },
]

const TabExampleText = () => <Tab menu={{ text: true, fluid: true }} panes={panes}  />

export default TabExampleText