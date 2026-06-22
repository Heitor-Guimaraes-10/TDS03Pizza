import React from "react";
import { View, Text, Image, StyleSheet, Platform, Alert, TextInput, Button, ToastAndroid, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../Aula03_app";

//Componentes
import { COLORS } from '../../theme/AppTheme';
import { RoundedButton } from '../../../components/RoundedButton';
import { CustomTextInput } from "../../../components/CustomTextInput";

//view models

import useViewModel from "./ViewModel";

export const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const{ userEmail, userPassword, onChange, login } = useViewModel();

   const testOS = () => {
    if (Platform.OS === 'android') {
      // Android usa o ToastAndroid para exibir mensagens
      ToastAndroid.show('Teste de login! - Android', ToastAndroid.SHORT);
    } else if (Platform.OS === 'web') {
      // Navegador usa o alert do JS classico
      alert('Teste de login! - Web');
    } else {
      // Outros sistemas operacionais podem usar o alert como fallback
     Alert.alert('Aviso!','Teste de login! - Iphone');
    }
  };
 

  return (
    <View style={styles.container}>
 
      <Image
        source={require('../../../../assets/img/bg-smartphone.jpg')}
        style={styles.ImgBg}
      />

   
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../assets/img/logo.png')}
          style={styles.logoImg}
        />
        <Text style={styles.logoTxt}>Restaurante GuiVida</Text>
      </View>

  
      <View style={styles.frm}>
        <Text style={styles.frmTitle}>Entrar</Text>

        <CustomTextInput
          image={require('../../../../assets/img/user.png')}
          placeholder="Digite seu Email / Usuário"
          keyboardType="email-address"
          secureTextEntry={false}
          property="userEmail"
          onChangeText={onChange} 
          value={ userEmail }
          
          
        />
       <CustomTextInput
          image={require('../../../../assets/img/password.png')}
          placeholder="Digite sua senha"
          keyboardType="default"
          secureTextEntry={true}
          property='userPassword'
          onChangeText={onChange}
          value={ userPassword }
          
          
        />
         <View style={styles.frmReset}>
      
         
        <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}> 
          <Text style={styles.txtReset}> Redefinir senha </Text>
        </TouchableOpacity>
        </View>

        
     
        
     
        <View style={{ marginTop: 40 }}>

          <RoundedButton
            title="Entrar"
            onPress={() => login()}
/>
        </View>

   
        <View style={styles.frmRegistre}>
          <Text>Crie sua conta!</Text>
         
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}> 
          <Text style={styles.txtRegistre}> Registre-se </Text>
        </TouchableOpacity>
        </View>
       
      </View>
    </View>
  );
};

//
 
// Folha de estilo
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
    top: '15%',
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
    bottom: '20%',
  },

  logoTxt:{
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 26,
  },

  frm:{
    width: '100%',
    height: '40%',
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
},
frmRegistre:{
  flexDirection:'row',
  justifyContent: 'center',
  marginTop:12,
},
frmReset:{
  flexDirection:'row',
  justifyContent:"flex-start",
  marginTop:4,

},
txtReset:{
  fontStyle: 'italic',
  fontWeight: 'bold',
  borderBottomColor: COLORS.secondary,
  borderBottomWidth: 1,
  marginLeft: 3,
  color: COLORS.secondary,
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
  

 
 
//export default HomeScreen;