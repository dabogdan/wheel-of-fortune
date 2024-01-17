import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { WinnerTextProps } from './interfaces';

const WinnerText: React.FC<WinnerTextProps> = ({ winner }) => {

    return (
      <View style={styles.winner}>
        <Text style={styles.winnerTxt}>Winner:  
            {winner ? winner : " be the first!"}
        </Text>
      </View>
    )
  }

export default WinnerText;

const styles = StyleSheet.create({
    winner: {
        position: 'absolute',
        top: "15%",
        zIndex: 1
    },
    winnerTxt: {
        fontSize: 30,
        fontWeight: 'bold'
    }
});