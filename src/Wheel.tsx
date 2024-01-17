import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path, G, TSpan } from 'react-native-svg';
import { WheelProps } from './interfaces';


const Wheel: React.FC<WheelProps> = ({ wheelSize, containerWidth, wheelPath }) => {
    
    return (
        <View style={styles.wheeContainer}>
            <Svg
                width={wheelSize}
                height={wheelSize}
                viewBox={`0, 0, ${containerWidth}, ${containerWidth}`}
            >
                <G y={containerWidth/2} x={containerWidth/2}>
                {wheelPath.map((s: any, i: number) => {
                    return(
                    <G key={`section-${i}`}>
                        <Path d={s.path} fill={s.color}>

                        </Path>
                    </G>
                    )
                })}
                </G>
            </Svg>        
      </View>
    )
}

export default Wheel;

const styles = StyleSheet.create({
    wheeContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  