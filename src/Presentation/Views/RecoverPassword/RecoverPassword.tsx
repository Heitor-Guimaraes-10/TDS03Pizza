import React from "react";
import { View, Text, Image, StyleSheet, Platform, Alert, TextInput, Button, ToastAndroid } from 'react-native';
import { COLORS } from '../../theme/AppTheme';
import { RoundedButton } from '../../../components/RoundedButton';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../Aula03_app";
import { useNavigation } from '@react-navigation/native';
import { CustomTextInput } from "../../../components/CustomTextInput";
import useViewModel from "./ViewModel" ;



export const RecoverPasswordScreen = () => {

      
       const {userToken, userEmailName, userPassword, userConfirmPassword, recoverPassword, onChange} = useViewModel();
       
       const testOS = () => {
        if (Platform.OS === 'android') {
          // Android usa o ToastAndroid para exibir mensagens
          ToastAndroid.show('Teste de Redefinição de Senha! - Android', ToastAndroid.SHORT);
        } else if (Platform.OS === 'web') {
          // Navegador usa o alert do JS classico
          alert('Teste de Redefinição de Senha! - Web');
        } else {
          // Outros sistemas operacionais podem usar o alert como fallback
         Alert.alert('Aviso!','Teste de Redefinição de Senha! - Iphone');
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
                      <Text style={styles.logoTxt}>Redefina a senha</Text>
                    </View>
                 <View style={styles.frm}>
      
                    <CustomTextInput
                            image={require('../../../../assets/img/email.png')}
                            placeholder="Digite o Token do Email"
                            keyboardType="numeric"
                            onChangeText={onChange} 
                            value={ userToken }
                            secureTextEntry={false}
                            property="userToken"
                          />
                    <CustomTextInput
                            image={require('../../../../assets/img/user.png')}
                            placeholder="Digite seu nome ou Email"
                            keyboardType="email-address"
                            onChangeText={onChange} 
                            value={ userEmailName }
                            secureTextEntry={false}
                            property="userEmailName"
                          />

                          <CustomTextInput
                            image={require('../../../../assets/img/password.png')}
                            placeholder="Digite sua nova senha"
                            keyboardType="default"
                            onChangeText={onChange} 
                            value={ userPassword }
                            secureTextEntry={true}
                            property="userPassword"
                          />

                          <CustomTextInput
                            image={require('../../../../assets/img/confirm_password.png')}
                            placeholder="Digite seu nome ou Email"
                            keyboardType="default"
                            onChangeText={onChange} 
                            value={ userConfirmPassword }
                            secureTextEntry={true}
                            property="userConfirmPassword"
                          />

                          <View style={{ marginTop: 40 }}>
                                  
                                            <RoundedButton
                                              title="Redefinir Senha"
                                              onPress={() => recoverPassword()}
                                              
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
    height: '55%',
    backgroundColor: COLORS.bgColor,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
    });

    export default RecoverPasswordScreen;
     