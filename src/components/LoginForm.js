import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Button, Card, CardSection, Input, Spinner } from './common'
import firebase from 'firebase'
import fireCode from '../../firecode'

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false }
    componentDidMount() {
        firebase.initializeApp(fireCode)
    }
    onButtonPress() {
        const { email, password } = this.state
        this.setState({ error: '', loading: true })
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(err => {
                if (err.code === 'auth/wrong-password') {
                    this.setState({ error: err.message, loading: false })
                } else if (err.code === 'auth/too-many-requests') {
                    this.setState({ error: err.message, loading: false })
                } else {
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this))
                }
            })
    }
    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        })
    }
    onLoginFail() {
        this.setState({
            loading: false,
            error: 'Login failed'
        })
    }
    renderButton() {
        return this.state.loading
            ? <Spinner size='large' />
            : <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>
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
                {this.renderButton()}
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
