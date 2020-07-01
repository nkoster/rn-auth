import React, { Component } from 'react'
import { View } from 'react-native'
import { Header, Button } from './src/components/common'
import LoginForm from './src/components/LoginForm'
import firebase from 'firebase'
import fireCode from './firecode'

class App extends Component {
  state = { signedIn: false }
  componentDidMount() {
    firebase.initializeApp(fireCode)
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ signedIn: true })
      } else {
        this.setState({ signedIn: false })
      }
    })
  }
  renderForm() {
    if (this.state.signedIn) {
      return (
        <Button onPress={_ => this.setState({ signedIn: false })}>Sign Out</Button>
      )
    } else {
      return (
        <LoginForm firebase={firebase}/>
      )
    }
  }
  render() {
    return (
      <View>
        <Header title='US Army Authentication' />
        {this.renderForm()}
      </View>
    )
  }
}

export default App
