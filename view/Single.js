import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Button, Image, ListItem, Text} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {Video} from 'expo-av';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {useFavorite, useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Single = ({route}) => {
  const {file} = route.params;
  const videoRef = useRef(null);
  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const {postFavorite, getFavoritesByFileId, deleteFavorite} = useFavorite();
  const [owner, setOwner] = useState({username: 'fetching...'});
  const [avatar, setAvatar] = useState('http://placekitten.com/180');
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(file.user_id, token);
      setOwner(userData);
    } catch (error) {
      // TODO: how should user be notified?
      console.error('fetch owner error', error);
      setOwner({username: '[not available]'});
    }
  };

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      if (avatarArray.length === 0) return;
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
      console.log('single.js avatar', avatar);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData = await getFavoritesByFileId(file.file_id);
      setLikes(likesData);
    } catch (error) {
      console.error('fetchLikes() error', error);
    }
  };

  const createFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await postFavorite(file.file_id, token);
    } catch (error) {
      console.error('createFavorite error', error);
    }
  };

  const removeFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await deleteFavorite(file.file_id, token);
    } catch (error) {
      console.error('removeFavorite error', error);
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
    fetchLikes();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <ListItem>
          <Avatar source={{uri: avatar}} />
          <Text>{owner.username}</Text>
        </ListItem>

        {file.media_type === 'image' ? (
          <Image
            source={{uri: uploadsUrl + file.filename}}
            containerStyle={styles.image}
            PlaceholderContent={<ActivityIndicator />}
          />
        ) : (
          <Video
            ref={videoRef}
            style={styles.image}
            source={{
              uri: uploadsUrl + file.filename,
            }}
            usePoster={{
              uri: uploadsUrl + file.screenshot,
            }}
            useNativeControls
            isLooping
            resizeMode="contain"
            onError={(error) => {
              console.log('<Video> error', error);
            }}
          ></Video>
        )}

        <Text style={styles.text} h4>
          {file.title}
        </Text>
        <View style={styles.row}>
          <Icon name="image" style={styles.icon} size={26} />
          <Text style={styles.text}>{file.description}</Text>
        </View>
        <ListItem>
          <Text>Like count: {likes.length}</Text>
          <Button
            disabled={userLike}
            title="Like"
            onPress={() => {
              createFavorite();
            }}
          />
          <Button
            disabled={!userLike}
            title="Unlike"
            onPress={() => {
              removeFavorite();
            }}
          />
        </ListItem>
      </SafeAreaView>
    </ScrollView>
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
