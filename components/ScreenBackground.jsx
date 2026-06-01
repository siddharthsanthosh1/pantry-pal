import { LinearGradient } from 'expo-linear-gradient';
import { APP_GRADIENT } from '../constants/gradient';

/**
 * Full-screen brand gradient used on login and all main screens.
 */
export default function ScreenBackground({ children, style }) {
  return (
    <LinearGradient
      colors={APP_GRADIENT.colors}
      start={APP_GRADIENT.start}
      end={APP_GRADIENT.end}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </LinearGradient>
  );
}
