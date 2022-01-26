import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {MainContext} from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Text, Button, Avatar} from 'react-native-elements';

const Profile = () => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {postTag, getFilesByTag} = useTag();
  console.log('Profile', user);

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.error(error.message);
    }
  };

  const createAvatar = async (mediaId) => {
    const data = {
      file_id: mediaId,
      tag: 'avatar_' + user.user_id,
    };
    try {
      const result = await postTag(data, 'correct token should be here');
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
    // createAvatar(95); for testing
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Avatar size={200} rounded source={{uri: avatar}} />
      {/* <Image
        source={{uri: avatar}}
        style={{width: '80%', height: '50%'}}
        resizeMode="contain"
      /> */}
      <View style={styles.info}>
        <Text>{user.username}</Text>

        <Text>{user.email}</Text>
        <Text>{user.full_name}</Text>
      </View>
      <Button
        title="LOGOUT!"
        onPress={async () => {
          // Log out
          await AsyncStorage.clear();
          setIsLoggedIn(false);
        }}
        buttonStyle={{
          borderRadius: 6,
          marginHorizontal: 20,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100,
  },
  info: {
    padding: 20,
    alignItems: 'center',
  },
});

export default Profile;
