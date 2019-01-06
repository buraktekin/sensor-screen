import React, { Component } from 'react'
import { Image, Menu } from 'semantic-ui-react'

import logo from '../assets/images/logo_horizontal.png'

export default class Navbar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item>
        <Image
          alt='company logo'
          size='small'
          src={ logo }
          />
        </Menu.Item>

        {/* 
        Menu Item Example
        <Menu.Item name='name' active={activeItem === 'name'} onClick={this.handleItemClick}>
          Sign-in
        </Menu.Item>
        */}
      </Menu>
    )
  }
}
