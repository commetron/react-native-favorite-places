import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import IconButton from './components/ui/IconButton';
import { GlobalStyles } from './constants/styles';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import Map from './screens/Map';
import { Place } from './types/places';

export type StackNavParams = {
  AllPlaces: { place: Place };
  AddPlace: { pickedLocation?: { lat: number; lng: number } };
  Map: undefined;
};

const StackNav = createNativeStackNavigator<StackNavParams>();

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <StackNav.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalStyles.colors.primary500,
            },
            headerTintColor: GlobalStyles.colors.gray700,
            contentStyle: {
              backgroundColor: GlobalStyles.colors.gray700,
            },
          }}
        >
          <StackNav.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon='add'
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <StackNav.Screen
            name='AddPlace'
            component={AddPlace}
            options={{
              title: 'Add a New Place',
            }}
          />
          <StackNav.Screen
            name='Map'
            component={Map}
            options={{
              title: 'Map',
            }}
          />
        </StackNav.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
