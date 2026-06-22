import React from "react";
import { View, Text, Image, StyleSheet, Platform, Alert, TextInput, Button, ToastAndroid } from 'react-native';
import { COLORS } from '../../theme/AppTheme';
import { RoundedButton } from '../../../components/RoundedButton';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../Aula03_app";
import { useNavigation } from '@react-navigation/native';
import { CustomTextInput } from "../../../components/CustomTextInput";
import useViewModel from "./ViewModel";


export const RegisterScreen = () => {

       const {userName, nameuser, userPhone, userEmail, userPassword, userPasswordConfirm, onChange, register} = useViewModel();
       const testOS = () => {
        if (Platform.OS === 'android') {
          // Android usa o ToastAndroid para exibir mensagens
          ToastAndroid.show('Teste de Cadastro! - Android', ToastAndroid.SHORT);
        } else if (Platform.OS === 'web') {
          // Navegador usa o alert do JS classico
          alert('Teste de Cadastro! - Web');
        } else {
          // Outros sistemas operacionais podem usar o alert como fallback
         Alert.alert('Aviso!','Teste de login! - Iphone');
        }
      };
     
    return (
        <View style={styles.container}>
            <Image
                    source={require('../../../../assets/img/chef.jpg')}
                    style={styles.ImgBg}
                  />
            <Text>Registro de Usuário</Text>
        
        <View style={styles.logoContainer}>
                <Image
                  source={require('../../../../assets/img/user_image.png')}
                  style={styles.logoImg}
                />
                <Text style={styles.logoTxt}>Selecione uma imagem</Text>
              </View>
           <View style={styles.frm}>

              <CustomTextInput
                      image={require('../../../../assets/img/user.png')}
                      placeholder="Digite seu nome"
                      keyboardType="default"
                      onChangeText={onChange} 
                      value={ userName }
                      secureTextEntry={false}
                      property="userName"
                    />

                      <CustomTextInput
                              image={require('../../../../assets/img/my_user.png')}
                              placeholder="Digite seu nome de usuário"
                              keyboardType="default"
                              onChangeText={onChange} 
                              value={ nameuser }
                              secureTextEntry={false}
                              property="nameuser"
                              
                              
                            />

                            <CustomTextInput
                              image={require('../../../../assets/img/email.png')}
                              placeholder="Digite seu Email"
                              keyboardType="email-address"
                              onChangeText={onChange} 
                              value={ userEmail }
                              secureTextEntry={false}
                              property="userEmail"
                      
                            />

                     
                              
                              
                            

                            <CustomTextInput
                              image={require('../../../../assets/img/phone.png')}
                              placeholder="Digite seu telefone"
                              keyboardType="numeric"
                              onChangeText={onChange} 
                              value={ userPhone }
                              secureTextEntry={false}
                              property="userPhone"
                              
                              
                              
                            />

                            <CustomTextInput
                              image={require('../../../../assets/img/password.png')}
                              placeholder="Digite sua senha"
                              keyboardType="default"
                              onChangeText={onChange} 
                              value={ userPassword }
                              secureTextEntry={true}
                              property="userPassword"
                              
                              
                            />

                            
                            <CustomTextInput
                              image={require('../../../../assets/img/confirm_password.png')}
                              placeholder="Confirme sua senha"
                              keyboardType="default"
                              onChangeText={onChange} 
                              value={ userPasswordConfirm }
                              secureTextEntry={true}
                              property="userPasswordConfirm"
                              
                              
                            />


                            
          
              {/* <View style={styles.frm}>
                <Text style={styles.frmTitle}>Registre-se</Text>
        
             
                <View style={styles.frmInput}>
                  <Image
                    source={require('../../../../assets/img/user.png')}
                    style={styles.frmIco}
                  />
                  <TextInput
                    placeholder="Digite seu Nome"
                    keyboardType="email-address"
                    style={styles.txtInput}
                  />
                </View>

                <View style={styles.frmInput}>
                  <Image
                    source={require('../../../../assets/img/my_user.png')}
                    style={styles.frmIco}
                  />
                  <TextInput
                    placeholder="Digite Nome de Usuário"
                    keyboardType="email-address"
                    style={styles.txtInput}
                  />
                </View>

                   <View style={styles.frmInput}>
                  <Image
                    source={require('../../../../assets/img/email.png')}
                    style={styles.frmIco}
                  />
                  <TextInput
                    placeholder="Digite seu Email"
                    keyboardType="email-address"
                    style={styles.txtInput}
                  />
                </View>

                   <View style={styles.frmInput}>
                  <Image
                    source={require('../../../../assets/img/phone.png')}
                    style={styles.frmIco}
                  />
                  <TextInput
                    placeholder="Digite seu Telefone"
                    keyboardType="phone-pad"
                    style={styles.txtInput}
                  />
                </View>

                   <View style={styles.frmInput}>
                  <Image
                    source={require('../../../../assets/img/password.png')}
                    style={styles.frmIco}
                  />
                  <TextInput
                    placeholder="Digite a Senha"
                    keyboardType="email-address"
                    style={styles.txtInput}
                  />
                </View>
        
                <View style={styles.frmInput}>
                  <Image
                    source={require('../../../../assets/img/confirm_password.png')}
                    style={styles.frmIco}
                  />
                  <TextInput
                    placeholder="Confirme a Senha"
                    keyboardType="default"
                    secureTextEntry={true}
                    style={styles.txtInput}
                    
                  />
                </View> */}
        
             
                <View style={{ marginTop: 40 }}>
        
                  <RoundedButton
                    title="Cadastre-se"
                    onPress={() => register()}
                    
        />
                </View>
        
           
                
              </View>
            </View>
          );
        };
        
  const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: COLORS.bgBlack,
    alignItems: 'center',
    justifyContent:'center',

 
  },

  logoContainer:{
    position: 'absolute',
    alignItems: 'center',
    top: '5%',
  },

  logoImg:{
    width: 100,
    height: 100,
    alignSelf: 'center',
  },

  ImgBg:{
   opacity: 0.8,
    width: '100%',
    height: '100%',
    bottom: '28%',
  },

  logoTxt:{
    color: COLORS.bgColor,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 26,
  },

  frm:{
    width: '100%',
    height: '75%',
    backgroundColor: COLORS.bgColor,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
  frmTitle:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  frmInput:{
      flexDirection: 'row',
      marginTop: 30,
      
  },

  frmIco:{
  width: 25,
  height: 25,
  marginTop: 10,
},
txtInput:{
  flex:1,
  borderBottomWidth: 2,
  marginLeft: 15,
  borderColor: "#ccc",

},
frmRegistre:{
  flexDirection:'row',
  justifyContent: 'center',
  marginTop:15,
},

txtRegistre:{
  fontStyle: 'italic',
  fontWeight: 'bold',
  borderBottomColor: COLORS.secondary,
  borderBottomWidth: 1,
  marginLeft: 5,
  color: COLORS.secondary,
},


});