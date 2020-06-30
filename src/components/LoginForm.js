import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Button, Card, CardSection, Input } from './common'
import firebase from 'firebase'
import fireCode from '../../firecode'

class LoginForm extends Component {
    state = { email: '', password: '', error: '' }
    UNSAFE_componentWillMount() {
        firebase.initializeApp(fireCode)
    }
    onButtonPress() {
        const { email, password } = this.state
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(_ => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(err => {
                        this.setState({ error: err.message })
                    })
            })
    }
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label='email'
                        placeholder='you@example.com'
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label='password'
                        placeholder='****************'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        secureTextEntry
                    />
                </CardSection>
                <Text style={styles.errorText}>{this.state.error}</Text>
                <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
    }
})

export default LoginForm
