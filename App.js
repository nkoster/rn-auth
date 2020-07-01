import React, { Component } from 'react'
import { View } from 'react-native'
import { Header, Button, Spinner } from './src/components/common'
import LoginForm from './src/components/LoginForm'
import firebase from 'firebase'
import fireCode from './firecode'

class App extends Component {
  state = { signedIn: null }
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
    switch (this.state.signedIn) {
      case true: 
        return <Button onPress={_ => firebase.auth().signOut()}>Sign Out</Button>
      case false: 
        return <LoginForm firebase={firebase}/>
      default:
        return <Spinner />
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
