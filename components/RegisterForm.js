import React from 'react';
import {Alert, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useUser} from '../hooks/ApiHooks';
import {Input, Button} from 'react-native-elements';
import {PropTypes} from 'prop-types';

const RegisterForm = ({setFormToggle}) => {
  const {postUser, checkUsername} = useUser();
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      delete data.confirmPassword;
      const userData = await postUser(data);
      console.log('register onSubmit', userData);
      if (userData) {
        Alert.alert('Success', 'User created successfully. Move to login?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => setFormToggle(true)},
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          minLength: {
            value: 3,
            message: 'Username has to be at least 3 characters.',
          },
          validate: async (value) => {
            try {
              const available = await checkUsername(value);
              if (available) {
                return true;
              } else {
                return 'Username is already taken!';
              }
            } catch (error) {
              throw new Error(error.message);
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Username"
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          pattern: {
            value: /(?=.*[\p{Lu}])(?=.*[0-9]).{5,}/u,
            message:
              'Password must to be at least 5 characters with uppercase and a number.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            leftIcon={{type: 'material-icons', name: 'lock'}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Password"
            errorMessage={errors.password && errors.password.message}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          validate: (value) => {
            const {password} = getValues();
            if (value === password) {
              return true;
            } else {
              return 'Passwords do not match';
            }
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            leftIcon={{type: 'material-icons', name: 'lock'}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            secureTextEntry={true}
            placeholder="Confirm Password"
            errorMessage={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
        )}
        name="confirmPassword"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This is required.'},
          pattern: {
            value: /\S+@\S+\.\S+$/,
            message: 'Email is not valid',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            leftIcon={{type: 'material-icons', name: 'email'}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="Email"
            errorMessage={errors.email && errors.email.message}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          minLength: {
            value: 3,
            message: 'Full name has to be at least 3 characters.',
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            placeholder="Full name"
            errorMessage={errors.full_name && errors.full_name.message}
          />
        )}
        name="full_name"
      />

      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        buttonStyle={{
          borderRadius: 6,
          marginHorizontal: 10,
        }}
      />
    </View>
  );
};

RegisterForm.propTypes = {
  setFormToggle: PropTypes.func,
};

export default RegisterForm;