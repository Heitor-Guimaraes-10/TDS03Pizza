import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button, Image, Dimensions } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";


const {width, height} = Dimensions.get ('window')

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);

  if (!permission) {
    return(
      <View style={ styles.container }>
        <Text style={ styles.textLight }>
          Carregando permissões...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return(
      <View style={ styles.container }>
        <Text style={ styles.textPermissao }>
          Precisamos da sua permissão para mostrar a câmera!
        </Text>
        <Button
          onPress={requestPermission}
          title="Conceder Permissão"
        />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {


        const option = { quality: 0.8, skipProcessing: false }

        const photo = await cameraRef.current.takePictureAsync(option);

        if (photo && photo.uri){

            console.log("Foto tirada com sucesso! Caminho: ", photo.url);
            setCapturedImage(photo.uri);
        }
    }


  };

  return(
  <View style={ styles.container }>
    {capturedImage ? (
      // tela de preview da foto
      <View style={ styles.previewContainer }>
        <Image
          source={{ uri: capturedImage }}
          style={ styles.preview }
          resizeMode="cover" // Garante que a foto preencha o espaço total do SmartPhone
        />
        <View style={ styles.previewButtons }>
          <Button 
            title="Tirar outra foto!"
            onPress={() => setCapturedImage(null)}
          />
        </View>
      </View>
    ) : (
      // Tela da Câmera
      <View style={ styles.cameraContainer }>
        <CameraView style={ styles.camera } facing="front" ref={cameraRef} />

        <View style={ styles.buttonContainer }>
          <TouchableOpacity
            style={ styles.button }
            onPress={takePicture}
          >

            <Text style={ styles.textBtn }>Tirar Foto</Text>
         </TouchableOpacity>
        </View>
      </View>
    )};
</View>
  );
}
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  textPermissao: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1, 
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    width: 150,
    alignItems: 'center',
  },
  textBtn: {
    color: '#000',
    fontWeight: 'bold',
  },
  textLight: {
    color: '#fff',
    textAlign: 'center',
  },
  previewContainer: {
    flex: 1,
    width: '100%',
  },
  preview: {
    flex: 1,
    width: '100%',
  },
  previewButtons: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
});