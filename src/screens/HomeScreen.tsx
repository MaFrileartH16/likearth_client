import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {getTest} from '../features/testSlice';

const HomeScreen = ({navigation}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const {data, status, error} = useSelector((state: RootState) => state.testSlice);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(getTest());
    }
  }, [status, dispatch]);
  
  if (status === 'loading') return <Text>Loading...</Text>;
  if (status === 'failed') return <Text>Error: {error}</Text>;
  
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      {data ? <Text>{data.message}</Text> : <Text>No data available</Text>}
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
