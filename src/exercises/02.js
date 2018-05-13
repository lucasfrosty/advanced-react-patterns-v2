// Compound Components

import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {

  // these elements will be like:
  // <Toggle.On>I'm on</Toggle.On>
  // <Toggle.Off>I'm off</Toggle.Off>
  // <Toggle.Button />
  // but we need to provide the "on" and "toggle" variable for them
  // and how we do this is via props
  static On = ({children, on}) => on && <div>{children}</div>;
  static Off = ({children, on}) => !on && <div>{children}</div>;
  static Button = ({ on, toggle, ...props }) =>  <Switch on={on} onClick={toggle} {...props} />

  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  
  render() {
    // this function will be responsible to get all the children elements
    // of "Toggle" and map through them. And each child element will be cloned
    // providing the extra props through the cloneElement function
    return React.Children.map(
      this.props.children,
      element => React.cloneElement(element, {
        on: this.state.on,
        toggle: this.toggle,
      })
    );
  };
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  )
}
Usage.title = 'Compound Components'

export {Toggle, Usage as default}
