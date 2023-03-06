import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import BottomTab from './BottomTab';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import ChapterScreen from './screens/ChapterScreen';
import SelectedChapterScreen from './screens/SelectedChapterScreen';


const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/33ogiiz7p97p',
  cache,
  credentials: 'same-origin',
  headers: {
    Authorization: `Bearer b2B8t4ajcKqASjTkxkbvJn_tOW0Tq0fNj4Zorb3rdNc`,
  },
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}}name="Login" component={LoginScreen} />
          <Stack.Screen 
          name="Home"
          component={BottomTab}
          />
          <Stack.Screen name="ChapterScreen" component={ChapterScreen} />
          <Stack.Screen name="SelectedChapterScreen" component={SelectedChapterScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFD7E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  