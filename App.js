import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { Video } from 'expo-av';

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const videoRef = useRef(null);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const playersData = [
    { id: '1', identificationNumber: '12345', firstName: '     Lionel', middleName: 'Andres', lastName: 'Messi', secondLastName: 'Cuccittini', documentType: 'C.C.', email: '      lionel@barca.com', password: 'lionel10' },
    { id: '2', identificationNumber: '54321', firstName: 'Andres', middleName: 'Iniesta', lastName: 'Luján', secondLastName: 'Soler', documentType: 'C.C.', email: 'andres@barca.com', password: 'andres8' },
    { id: '3', identificationNumber: '67890', firstName: 'Gerard', middleName: '', lastName: 'Piqué', secondLastName: 'Bernabeu', documentType: 'C.C.', email: 'gerard@barca.com', password: 'gerard3' },
  ];

  const PlayerItem = ({ player }) => (
    <View>
      {/* Línea que separa el encabezado de la tabla */}
      <View style={styles.separator}></View>
      <View style={styles.playerItem}>
        <Text style={[styles.playerText, styles.cellText]}>{player.identificationNumber}</Text>
        <Text style={[styles.playerText, styles.cellText]}>{player.firstName} {  player.lastName  }</Text>
        <Text style={[styles.playerText, styles.cellText]}>{player.email}</Text>
      </View>
    </View>
  );

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.replayAsync();
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/fondo.jpeg')} style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={styles.title}><Text style={styles.italic}>GHANJADROPS</Text></Text>
          <Text style={styles.subtitle}>¡Descubre el arte que te inspira!</Text>
          {menuVisible && (
            <View style={styles.menu}>
              <TouchableOpacity onPress={toggleMenu}>
                <Text style={styles.menuText}>Inicio</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleMenu}>
                <Text style={styles.menuText}>Galería</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleMenu}>
                <Text style={styles.menuText}>Contacto</Text>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <Text style={styles.menuButtonText}>Menú</Text>
          </TouchableOpacity>
          <View style={styles.videoContainer}>
            <Video
              ref={videoRef}
              source={require('./assets/portada.mp4')}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={true}
              isLooping={false}
              style={styles.video}
              useNativeControls
              onPlaybackStatusUpdate={(status) => {
                if (!status.isPlaying && status.didJustFinish) {
                  replayVideo();
                }
              }}
            />
          </View>
          <View style={styles.tableContainer}>
            {/* Encabezado de la tabla */}
            <View style={[styles.playerItem, styles.headerItem]}>
              <Text style={[styles.playerText, styles.headerText, styles.cellText]}>N° doc   </Text>
              <Text style={[styles.playerText, styles.headerText, styles.cellText]} >  Nombre</Text>
              <Text style={[styles.playerText, styles.headerText, styles.cellText]}>    Correo electrónico</Text>
            </View>
            <FlatList
              data={playersData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <PlayerItem player={item} />}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 70,
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  italic: {
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 28,
    color: 'white',
    marginBottom: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  menuButtonText: {
    color: 'white',
    fontSize: 16,
  },
  menu: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  menuText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5,
  },
  tableContainer: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
    zIndex: 1,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  playerText: {
    color: 'white',
    fontSize: 16,
  },
  headerText: {
    fontWeight: 'bold',
  },
  cellText: {
    textAlign: 'center',
  },
  headerItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '100%',
  },
  videoContainer: {
    width: 300,
    height: 200,
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 50,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
