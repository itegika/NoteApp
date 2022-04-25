import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainPage from './Pages/MainPage';
import AddTodoPage from './Pages/AddTodoPage';
import EditTodoPage from './Pages/EditTodoPage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import { ROUTE_KEYS } from './assets/constants';

const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function App() {
  const { MAIN, ADD_TODO, EDIT_TODO, REGISTER, LOGIN } = ROUTE_KEYS;
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Tab.Navigator>
          <Tab.Screen name={REGISTER} component={RegisterPage} />
          <Tab.Screen name={LOGIN} component={LoginPage} />
          <Tab.Screen
            name={MAIN}
            component={MainPage}
            options={{ headerShown: false }}
          />
          <Tab.Screen name={ADD_TODO} component={AddTodoPage} />
          <Tab.Screen name={EDIT_TODO} component={EditTodoPage} />
        </Tab.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
