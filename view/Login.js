import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, Keyboard, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../context/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {ButtonGroup, Card} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LottieView from 'lottie-react-native';

const Login = ({navigation}) => {
  const animation = React.createRef();
  const [formToggle, setFormToggle] = useState(true);
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    // console.log('token value in async storage', userToken);
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      console.log('Token', userToken);

      setUser(userData);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkToken();
    animation.current?.play();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{flex: 1}}
      activeOpacity={1}
    >
      <Card.Image style={styles.fakeImage}>
        <LottieView
          ref={animation}
          source={require('../assets/lottie-animation.json')}
          style={styles.animation}
          loop={false}
        />
      </Card.Image>
      <KeyboardAwareScrollView>
        <Card>
          <ButtonGroup
            onPress={() => setFormToggle(!formToggle)}
            selectedIndex={formToggle ? 0 : 1}
            buttons={['Login', 'Register']}
          />
        </Card>
        {formToggle ? (
          <Card>
            <Card.Title>Login</Card.Title>
            <Card.Divider />

            <LoginForm />
          </Card>
        ) : (
          <Card>
            <Card.Title>Register</Card.Title>
            <Card.Divider />
            <RegisterForm setFormToggle={setFormToggle} />
          </Card>
        )}
      </KeyboardAwareScrollView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appTitle: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  animation: {
    justifyContent: 'center',
    flex: 1,
  },
  fakeImage: {
    backgroundColor: '#fff',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
