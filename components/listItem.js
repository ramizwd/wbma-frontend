import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  Button,
  ButtonGroup,
  ListItem as NBListItem,
} from 'react-native-elements';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {Alert} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../context/MainContext';

const ListItem = ({navigation, singleMedia, myFilesOnly}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const doDelete = () => {
    Alert.alert('Delete', 'this file permanently', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(singleMedia.file_id, token);
            response && setUpdate(update + 1);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

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
        {myFilesOnly && (
          <ButtonGroup
            onPress={(index) => {
              if (index === 0) {
                navigation.navigate('Modify', {file: singleMedia});
              } else {
                doDelete();
              }
            }}
            buttons={['Modify', 'Delete']}
            rounded
          />
        )}
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
  myFilesOnly: PropTypes.bool,
};

export default ListItem;
