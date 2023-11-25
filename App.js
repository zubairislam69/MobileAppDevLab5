import 'react-native-gesture-handler'

import Home from './src/Home';
import NewNote from './src/NewNote';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name='Home'
        />
        <Stack.Screen
          component={NewNote}
          name='NewNote'
        />
      </Stack.Navigator >
    </NavigationContainer >
  );
}

export default App;