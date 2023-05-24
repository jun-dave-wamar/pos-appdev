import { useFonts } from 'expo-font';

export default function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'NeuMontreal-Bold': require('../../assets/fonts/NeueMontreal-Bold.otf'),
    'NeuMontreal-Medium': require('../../assets/fonts/NeueMontreal-Medium.otf'),
    'NeuMontreal-Regular': require('../../assets/fonts/NeueMontreal-Regular.otf'),
    'PPGatwick-Bold': require('../../assets/fonts/PPGatwick-Bold.otf'),
  });

  return fontsLoaded;
}