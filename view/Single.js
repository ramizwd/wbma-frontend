import React, {useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {MainContext} from '../context/MainContext';

const Single = ({route}) => {
  const {file} = route.params;
  const {isLoading} = useContext(MainContext);

  console.log('route', route);
  return (
    <SafeAreaView style={styles.container}>
      {!isLoading ? (
        <Image
          source={{uri: uploadsUrl + file.filename}}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      <Text>{file.title}</Text>
      <Text>{file.description}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width: 300,
    height: 300,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
