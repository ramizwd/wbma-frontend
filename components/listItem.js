import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({navigation, singleMedia}) => {
  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <Image
        source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
        style={styles.image}
      />
      <View style={styles.text}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'lightgray',
    marginBottom: 7,
  },
  image: {
    flex: 1,
  },
  text: {
    flex: 2,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
