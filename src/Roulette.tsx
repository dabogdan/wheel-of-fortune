import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import * as d3Shape from 'd3-shape';
import color from 'randomcolor';

import Wheel from './Wheel';
import { RouletteProps } from './interfaces'
import { mapCoordinatesToDegrees, getVelocity, radiansToDegrees } from './helpers'

const { width, height } = Dimensions.get('screen');
const wheelSize = width * 0.9;
let sections: any[] = [];
const oneTurn = 360;
const centerX = width / 2;
const centerY = height / 2;
let colors: string[] = [];
let winnerTemp: number;
const angle = new Animated.Value(0);

const Roulette: React.FC<RouletteProps> = ({ numberOfSections, onWinnerChange }) => {
    const createWheel = () => {
        const data: number[] = Array.from<number>({length: numberOfSections}).fill(1);
        
        sections = d3Shape.pie()(data); 
        
        colors = color({
            luminosity: 'dark',
            count: numberOfSections
        })  
        
        return sections.map((s: any, i: number) => { 
            const instance = d3Shape
            .arc()
            .padAngle(0.01)
            .outerRadius(width / 2)
            .innerRadius(10);
            
            return {
            index: i,
            path: instance(s),
            color: colors[i],
            value: Math.round(Math.random() * 10 + 1) * 200,
            centroid: instance.centroid(s),
            startAngle: s.startAngle,
            endAngle: s.endAngle 
            }
        })
    }
    
    const weelPath = createWheel();

    angle.addListener((e) => {
        winnerTemp = ((270 - e.value) + 90) % 360;    
    })

    const pan = Gesture.Pan()
        .onUpdate((e) => {
            const { absoluteX, absoluteY, velocityX, velocityY } = e;
            const deg = Math.round(mapCoordinatesToDegrees(absoluteX, absoluteY, centerX, centerY));
            angle.setValue(deg);
            Animated.decay(angle, {
            velocity: getVelocity(velocityX, velocityY, deg) / 2000,
            deceleration: 0.999,
            useNativeDriver: true
            }).start(({finished}) => {
            if(finished){                
                sections.map((s, i) => {
                    if (
                        Math.round(radiansToDegrees(s.startAngle)) < winnerTemp &&
                        Math.round(radiansToDegrees(s.endAngle)) > winnerTemp
                    ){
                        console.log(colors[i]);
                        onWinnerChange(colors[i]);
                    }      
                })
            }         
            });
        })
        
    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={pan}>
                <Animated.View
                    style={styles.animatedWheel}
                >
                    <Wheel 
                    wheelSize={wheelSize} 
                    containerWidth={width} 
                    wheelPath={weelPath}
                    />
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    )
}

export default Roulette;

const styles = StyleSheet.create({
    animatedWheel: {
        alignItems: 'center',
        justifyContent: 'center',
        transform: [
          {
            rotate: angle.interpolate({
              inputRange: [-oneTurn, 0, oneTurn],
              outputRange: [`-${oneTurn}deg`, `0deg`, `${oneTurn}deg`]
            })
          }
        ]
      },
  });