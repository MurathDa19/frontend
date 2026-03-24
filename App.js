import { AuthProvider } from './src/context/authContext';
import AppNavigator from './src/navigator/Appnavigator';


export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}