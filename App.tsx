import { StyleSheet, Text, View } from 'react-native';
import { useState, useCallback, useMemo } from 'react';

import Roulette from './src/Roulette';
import WinnerText from './src/WinnerText';

const numberOfSections:number = 15;

export default function App() { 
  const [winner, setWinner] = useState('');
  
  const handleWinnerChange = useCallback((newWinner: string) => {
    setWinner(newWinner);
  }, []);

  const memoizedRoulette = useMemo(() => (
    <Roulette numberOfSections={numberOfSections} onWinnerChange={handleWinnerChange} />
  ), []);

  return (
    <View style={styles.container}>
      <Text style={styles.knob}>|</Text>
      <WinnerText winner={winner}/>
      {memoizedRoulette}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  knob: {
    position: 'absolute',
    fontSize: 50,
    zIndex: 1,
    top: '20%'
  }
});