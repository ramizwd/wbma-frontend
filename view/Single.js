import React from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Image, Text} from 'react-native-elements';
import {Icon} from 'react-native-elements';

const Single = ({route}) => {
  const {file} = route.params;

  console.log('route', route);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: uploadsUrl + file.filename}}
        containerStyle={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text style={styles.text} h4>
        {file.title}
      </Text>
      <View style={styles.row}>
        <Icon name="image" style={styles.icon} size={26} />
        <Text style={styles.text}>{file.description}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  icon: {
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: '90%',
    height: 350,
  },
  text: {
    padding: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
