import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import * as firebase from 'firebase';
import {Ionicons} from '@expo/vector-icons';

export default class RegisterScreen extends React.Component{
    static navigationOptions = {
        header: null
    }; 

  state={
      name: '',
      email:'',
      password:'',
      errorMessage: null
  };

  handleSignUp = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                diplayName: this.state.name
            });
        })
        .catch(error => this.setState({ errorMessage: error.message}));
  };

render() {
  return (
    <View style={styles.container}>
        <StatusBar barStyle='light-content'></StatusBar>

        <View style={{top:64, alignItems: 'center', width:'100%'}}>
            <Text style={styles.greeting}>{'Preencha o\nFormulário'}</Text>
            <TouchableOpacity  style={styles.avatar}>
                <Ionicons name='ios-add' size={40} color='red' style={{marginTop:8, marginLeft:2}} />
            </TouchableOpacity>
        </View>

        <View style={styles.errorMessage}>
            {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
            <View>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput 
                    style={styles.input} 
                    autoCapitalize='none' 
                    onChangeText={name => this.setState({name})}
                    value={this.state.name}
                ></TextInput>
            </View>

            <View>
                <Text style={styles.inputTitle}>Email</Text>
                <TextInput 
                    style={styles.input} 
                    autoCapitalize='none' 
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                ></TextInput>
            </View>

            <View>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput 
                    style={styles.input} 
                    secureTextEntry 
                    autoCapitalize='none'
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                ></TextInput>
            </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={{color:'#FFF'}}>Registrar</Text>
        </TouchableOpacity>
        
        <View style={{alignSelf:'center', marginTop:32, flexDirection:'row'}}>
            <Text style={{color:'black'}}>Ainda não tens conta? </Text>
            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{  color:'red'}}>Entra</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greeting:{
    marginTop:32,
    fontSize:18,
    textAlign:'center'
  },
  errorMessage:{
      height:72,
      alignItems:'center',
      justifyContent:'center',
      marginHorizontal:30
  },
  error:{
      color:'red',
      fontSize:13,
      textAlign:'center'
  },
  form:{
      marginBottom:48,
      marginHorizontal:30
  },
  inputTitle:{
      color:'orange',
      fontSize:10,
      textTransform:'uppercase'
  },
  input:{
      borderBottomColor:'blue',
      borderBottomWidth: StyleSheet.hairlineWidth,
      height:40,
      fontSize:15,
      color:'green'
  },
  button:{
      marginHorizontal:30,
      backgroundColor:'orange',
      borderRadius:4,
      height:52,
      alignItems:'center',
      justifyContent:'center'
  }, 
  avatar:{
      width:80,
      height:80,
      borderRadius:50,
      backgroundColor: '#E1E2E6',
      marginTop:20,
      justifyContent:'center',
      alignItems:'center'
  }
});
