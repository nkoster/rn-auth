import React, { Component } from 'react'
import { View } from 'react-native'
import { Header } from './src/components/common'
import LoginForm from './src/components/LoginForm'

class App extends Component {
  render() {
    return (
      <View>
        <Header title='US Army Authentication' />
        <LoginForm />
      </View>
    )
  }
}

export default App
