import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button, Image, Dimensions, ActivityIndicator, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

// Pagamos a largura e altura da tela do dispositivo SmarthPhone, para garantir o tamanho da foto
const { width, height } = Dimensions.get('window');
// Variavel para controlar o ambiente (true = simula no front / false = envia pro servidor real)
const isTestMode = true;
export default function App() {
    const [permission, requestPermission] = useCameraPermissions();
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isUploading, setUploading] = useState(false);
    const cameraRef = useRef<any>(null);
    if (!permission) {
        return (
<View style={styles.container}>
<Text style={styles.textLight}>
                    Carregando permissões...
</Text>
</View>
        );
    }
    if (!permission.granted) {
        return (
<View style={styles.container}>
<Text style={styles.textPermissao}>
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
            // skipProcessing garante que o Android processe a imagem antes de entregar a URI
            const option = { quality: 0.8, skipProcessing: false };
            const photo = await cameraRef.current.takePictureAsync(option);
            if (photo && photo.uri) {
                // Isso vai aparecer no terminal do VsCode
                console.log('Foto tiranda com sucesso! Caminho:', photo.uri);
                setCapturedImage(photo.uri);
            }
        }
    };
    const uploadImage = async () =>{
        if (!capturedImage) return;
        setUploading(true);
        try{
            if(isTestMode) {
                // Modo de teste (apenas front)
                console.log('Modo de teste ativo: Simulando o Upload...');
                // Simula o tempo de uma requisição de rede" 2 segundos"
                await new Promise(resolve => setTimeout(resolve, 2000));
                console.log('Upload simulado com sucesso! A imagem está pronta para ser usada no app.');
                Alert.alert('Sucesso', 'Sua foto de perfil foi atualizada (Modo Test)!')
                // A partir daqui pode ser utilizada e atualizada a foto na UI, no Context ou Redux
            } else {
                /**
                 * MODO PRODUÇÃO (COMUNICAÇÃO COM BACKEND)
                 */
                //1. Resolve o erro do "Unsupported FormDataPart" transformando o arquivo local em um Blob padrão da Web
                const localImageResponse = await fetch(capturedImage);
                const blob = await localImageResponse.blob();
                // 2. Cria o FormData e anexa o blob (usando o padrão web que as versões novas do Expo exigem)
                const formData = new FormData ();
                formData.append('profilePicture', blob, 'profile.jpg');
                const UPLOAD_URL = 'https://sua-api/upload-endpoint'; //Substitua quando Tiver a 'API'
                const response = await fetch(UPLOAD_URL, {
                    method: 'POST', 
                    //DICA: Não coloque 'Content-type' : 'mulpipart/form-data' aqui nos headers
                    // O fetch cuida de gerar os 'boundaries' corretamente se você não forçar manualmente.
                    headers: {
                        //'Authorization' : 'Bearer SEU_TOKEN_USUARIO' --- Para usuários autenticados
                    },
                    body: formData,
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Upload concluído no servidor: ', data);
                    Alert.alert('Sucesso', 'Sua foto de perfil foi atualizada! - (BackEnd)');
                } else {
                    Alert.alert('Erro', 'Não foi possível salvar a imagem no servidor');
                }
            }
        } catch (error){
            console.error('Erro no upload: ', error);
            Alert.alert('Erro', 'Falha na conexão com o servidor.');
        } finally {
            setUploading(false); // Esconde o loading, independentemente de dar erro ou sucesso
        }
    }
    return (
<View style={styles.container}>
            {capturedImage ? (
                // tela de preview da foto 
<View style={styles.previewContainer}>
<Image
                        source={{ uri: capturedImage }}
                        style={styles.preview}
                        resizeMode="cover" // Garante que a foto preencha o espaço total do SmartPhone
                    />
<View style={styles.previewButtons}>
                        {isUploading ?(
<ActivityIndicator size='large' color='#00ff00' />
                        ): (
<>
<Button title="Usar como foto de Perfil" onPress={uploadImage} color='#28a745'/>
<View>
<Button
                                    onPress={() => setCapturedImage(null)}
                                    title="Tirar outra foto!"
                                />
</View>
</>
                        )}
</View>
</View>
            ) : (
                // Tela da Câmera
<View style={styles.cameraContainer}>
<CameraView style={styles.camera} facing="front" ref={cameraRef} />
<View style={styles.buttonContainer}>
<TouchableOpacity
                            style={styles.button}
                            onPress={takePicture}
>
<Text style={styles.textBtn}> Tirar Foto</Text>
</TouchableOpacity>
</View>
</View>
            )
            }
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
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000',
  },
  preview: {
    //Definindo tamanhos fixos baseado na tela do celular
    width: width * 0.85,
    height: height * 0.70,
    borderRadius: 12,
  },
  previewButtons: {
    marginTop:20,
    width:'80%',
  },
});