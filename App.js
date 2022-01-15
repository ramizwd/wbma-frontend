import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Settings} from 'react-native-feather';

const mediaArray = [
  {
    key: '0',
    title: 'Title 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales enim eget leo condimentum vulputate. Sed lacinia consectetur fermentum. Vestibulum lobortis purus id nisi mattis posuere. Praesent sagittis justo quis nibh ullamcorper, eget elementum lorem consectetur. Pellentesque eu consequat justo, eu sodales eros.',
    thumbnails: {
      w160: 'http://placekitten.com/160/161',
    },
    filename: 'http://placekitten.com/2048/1920',
  },
  {
    key: '1',
    title: 'Title 2',
    description:
      'Donec dignissim tincidunt nisl, non scelerisque massa pharetra ut. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. Vestibulum tincidunt sapien eu ipsum tincidunt pulvinar. ',
    thumbnails: {
      w160: 'http://placekitten.com/160/164',
    },
    filename: 'http://placekitten.com/2041/1922',
  },
  {
    key: '2',
    title: 'Title 3',
    description:
      'Phasellus imperdiet nunc tincidunt molestie vestibulum. Donec dictum suscipit nibh. Sed vel velit ante. Aenean quis viverra magna. Praesent eget cursus urna. Ut rhoncus interdum dolor non tincidunt. Sed vehicula consequat facilisis. Pellentesque pulvinar sem nisl, ac vestibulum erat rhoncus id. ',
    thumbnails: {
      w160: 'http://placekitten.com/160/167',
    },
    filename: 'http://placekitten.com/2039/1920',
  },
];

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="gray" barStyle="light-content" />

      <View style={styles.header}>
        <ImageBackground
          source={require('./assets/greeneyecat.jpg')}
          style={styles.mainImage}
          imageStyle={{borderBottomRightRadius: 65}}
        ></ImageBackground>
        <Settings
          stroke="white"
          width={32}
          height={32}
          style={styles.settingIcon}
        />
        <Text style={styles.imageTitle}>Green eyed cat</Text>
      </View>

      <View style={styles.mainInfo}>
        <View style={styles.catList}>
          <FlatList
            data={mediaArray}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles.catImage}>
                  <Image
                    style={styles.image}
                    source={{uri: item.thumbnails.w160}}
                  />
                  <View style={styles.catInfo}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>{item.description}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    height: '100%',
    paddingTop: 0,
    backgroundColor: 'rgb(153, 153, 153)',
  },
  header: {
    height: 270,
    backgroundColor: 'white',
  },
  mainImage: {
    width: '100%',
    height: 270,
    backgroundColor: 'rgb(153, 153, 153)',
  },
  menu: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  settingIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  imageTitle: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    color: 'white',
    backgroundColor: 'rgba(155, 255, 61, 0.3)',
    padding: 7,
    width: 200,
    fontSize: 19,
  },
  mainInfo: {
    flex: 6,
    flexDirection: 'column',
  },
  catList: {
    flex: 8,
    paddingTop: 15,
  },
  catImage: {
    width: '100%',
    backgroundColor: 'white',
    padding: 12,
    flexDirection: 'row',
    marginVertical: 5,
  },
  catInfo: {
    width: 250,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: 'rgb(105, 191, 25)',
  },
  image: {
    width: 100,
    height: 200,
    marginRight: 10,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 50,
  },
});

export default App;
