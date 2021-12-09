import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {View, ScrollView, ImageBackground} from 'react-native';
import {Text, Caption, TouchableRipple} from 'react-native-paper';
import {withProfiler} from '@sentry/react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'react-native-paper';
import {formSchema} from '@app/_modules/auth_signin/forms';

import Forms from '@app/components/_Forms/index';
import AppBar from '@app/components/AppBar';
import styles from '@app/_modules/auth_signin/styles';

/**
 * ---------------------------------------------------- *
 * @component AuthSigningView
 * @param {Object} Views.propTypes - defined using PropTypes
 * @summary View Component for Sign In
 * @returns Components
 * ---------------------------------------------------- *
 */

const Views = ({t, loading, onSignin, onError, onNavigateSignup}) => {
  const theme = useTheme();
  const {background} = _.get(theme, 'colors');

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
      <AppBar useBack title={t('login.title')} />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          resizeMode="cover"
          source={{
            uri: 'https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          }}>
          <View>
            <Text style={styles.title}>{t('login.titleScreen')}</Text>
            <Caption style={styles.caption}>{t('login.captionScreen')}</Caption>
          </View>
          <Forms
            fields={formSchema}
            onSubmit={onSignin}
            onError={onError}
            loading={loading}
            buttonTitle={t('login.button')}
          />
          <View style={styles.footerForm}>
            <Caption style={styles.foot}>{t('login.captionRegister')} </Caption>
            <TouchableRipple onPress={onNavigateSignup}>
              <Caption style={styles.btnSignup}>
                {t('login.buttonRegister')}
              </Caption>
            </TouchableRipple>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

Views.propTypes = {
  // use for displaying label from translation module
  t: PropTypes.func.isRequired,
  // use to determined loading state
  loading: PropTypes.bool,
  // use as callback function on Submit
  onSignin: PropTypes.func.isRequired,
  // use as callback function for onError from the useForm
  onError: PropTypes.func,
  // use as callback on register touchable
  onNavigateSignup: PropTypes.func.isRequired,
};

export default withProfiler(Views, {name: 'AuthSigninView'});
