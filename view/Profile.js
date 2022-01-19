import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {MainContext} from '../context/MainContext';

const Profile = () => {
  const {setIsLoggedIn} = useContext(MainContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button
        title="Log Out"
        onPress={() => {
          // Log out
          setIsLoggedIn(false);
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
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;
