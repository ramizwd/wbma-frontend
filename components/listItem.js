import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Button, ListItem as NBListItem} from 'react-native-elements';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';

const ListItem = ({navigation, singleMedia}) => {
  return (
    <NBListItem>
      <Avatar
        source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
        style={{height: 50, width: 50}}
      />
      <NBListItem.Content>
        <NBListItem.Title style={{fontWeight: 'bold'}}>
          {singleMedia.title}
        </NBListItem.Title>
        <NBListItem.Subtitle>{singleMedia.description}</NBListItem.Subtitle>
      </NBListItem.Content>
      <Button
        title="View"
        buttonStyle={{
          borderRadius: 6,
        }}
        containerStyle={{
          width: 80,
          marginHorizontal: 5,
          marginVertical: 1,
        }}
        onPress={() => {
          navigation.navigate('Single', {file: singleMedia});
        }}
      />
    </NBListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
