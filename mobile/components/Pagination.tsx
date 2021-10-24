// does not work!!

import React, { useRef } from 'react'
import { View, StyleSheet, Dimensions, Text, Animated, SafeAreaView, FlatList } from 'react-native'
import Board1Image from '../assets/images/o1.png'
import Board2Image from '../assets/images/o2.png'
import Board3Image from '../assets/images/o3.png'
import { ScalingDot } from 'react-native-animated-pagination-dots'
import PagerView, { PagerViewOnPageScrollEventData } from 'react-native-pager-view'

export interface Data {
    key: string;
    imgUrl: string;
    header: string;
    description: string;
    buttonName: string;
}

const APPDATA = [
    { imgUrl: Board1Image, 
      header: "Check your board game skills", 
      description: "Compete in board games and keep track of your win rate in each board game among your friends.", 
      buttonName: "" ,
      key: '1'
    },
    { imgUrl: Board2Image, 
      header: "We track the statistics for you", 
      description: "Play games and record whether you win or lose, we then calculate your ELO to show your skill at the board game.", 
      buttonName: "",
      key: '2'
    },
    { imgUrl: Board3Image, 
      header: "Explore what others are playing", 
      description: "View the activity of those within your social group, to find your next favorite board game!", 
      buttonName: "Let's Play!",
      key: '3'
    }
]

function handleClick() {

}

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

function PaginationDots() {
    const width = SLIDER_WIDTH
    const ref = React.useRef<PagerView>(null);
    const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const inputRange = [0, APPDATA.length];
    const scrollX = Animated.add(
      scrollOffsetAnimatedValue,
      positionAnimatedValue
    ).interpolate({
      inputRange,
      outputRange: [0, APPDATA.length * width],
    });
    const scrollX1 = React.useRef(new Animated.Value(0)).current;
    const keyExtractor = React.useCallback((_, index) => index.toString(), []);

    const renderItem = React.useCallback(({ item }) => {
        return (
            /*
            <View style={[styles.itemContainer]}>
                <Animated.Image
                style={{
                    width: imageW,
                    height: imageH,
                    borderRadius: 20,
                    resizeMode: 'cover',
                }}
                source={{ uri: item.image }}
                />
            </View>*/
            <Text></Text>
        );
      }, []);

    const onPageScroll = React.useMemo( () =>
        Animated.event<PagerViewOnPageScrollEventData>(
            [
                {
                    nativeEvent: {
                        offset: scrollOffsetAnimatedValue,
                        position: positionAnimatedValue,
                    },
                },
            ],
            {
              useNativeDriver: false,
            }
          ),[]
    );

    return (
        <SafeAreaView style={styles.flex}>
            <AnimatedPagerView
            initialPage={0}
            ref={ref}
            style={styles.PagerView}
            onPageScroll={onPageScroll}
            >
                {APPDATA.map(({ key }) => (
                <View key={key} style={styles.center}>
                    <Text style={styles.text}>{`Page Index: ${key}`}</Text>
                </View>
                ))}
            </AnimatedPagerView>
            <View style={styles.dotContainer}>
                <FlatList
                    data={APPDATA}
                    keyExtractor={keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX1 } } }],
                    {
                        useNativeDriver: false,
                    }
                    )}
                    pagingEnabled
                    horizontal
                    decelerationRate={'normal'}
                    scrollEventThrottle={16}
                    renderItem={renderItem}
                />
                <ScalingDot
                    data={APPDATA}
                    //@ts-ignore
                    scrollX={scrollX}
                    containerStyle={{
                        top: 30,
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    PagerView: {
      flex: 1,
    },
    container: {
      flexDirection: 'row',
      backgroundColor: '#63a4ff',
    },
    progressContainer: { flex: 0.1, backgroundColor: '#63a4ff' },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      padding: 20,
    },
    text: {
      fontSize: 30,
    },
    separator: {
      paddingVertical: 16,
      paddingHorizontal: 10,
    },
    touchableTitle: {
      textAlign: 'center',
      color: '#000',
    },
    touchableTitleActive: {
      color: '#fff',
    },
    dotsContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
    },
    dotContainer: {
      justifyContent: 'center',
      alignSelf: 'center',
    },
    contentSlider: {
      flex: 1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    dots: {
      flex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 310,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      margin: 5,
    },
  });

export default PaginationDots