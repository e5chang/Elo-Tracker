import React, { useRef } from 'react'
import { Button, View, StyleSheet, Dimensions, Image } from 'react-native'
import CarouselComp from 'react-native-snap-carousel'
import Board1Image from '../assets/images/o1.png'
import Board2Image from '../assets/images/o2.png'
import Board3Image from '../assets/images/o3.png'
import Slide1 from '../assets/images/s1.png'
import Slide2 from '../assets/images/s2.png'
import Slide3 from '../assets/images/s3.png'
import { Colors } from '../constants/Colors'
import { Header, Paragraph } from "../constants/Text";

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
      buttonName: "",
      slider: Slide1 
    },
    { imgUrl: Board2Image, 
      header: "We track the statistics for you", 
      description: "Play games and record whether you win or lose, we then calculate your ELO to show your skill at the board game.", 
      buttonName: "",
      slider: Slide2
    },
    { imgUrl: Board3Image, 
      header: "Explore what others are playing", 
      description: "View the activity of those within your social group, to find your next favorite board game!", 
      buttonName: "Let's Play!",
      slider: Slide3
    }
]

function handleClick() {

}

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselItem = ({ item, index }: { item: any; index: any}) => {
    return (
        <View style={styles.container} key={index}>
            <Image
                source={item.imgUrl}
                style={styles.image}
            />
            <Header style={{
                color: Colors.limeGreen, 
                textAlign: "center", 
                fontSize: 26, 
                width: 300,
                marginBottom: 30
            }}>
                {item.header}
            </Header>
            <Paragraph style={{
                fontSize: 14, 
                textAlign: "center", 
                width: 235,
                marginBottom: 30
            }}>
                {item.description}
            </Paragraph>
            <Button
                onPress={() => handleClick()}
                title={item.buttonName}
                color={Colors.accentGreen}
            />
            <Image
                source={item.slider}
                style={{height: 15, width: 75, marginTop: 150}}
            />
        </View>
    )
}


const Carousel = () => {
    const isCarousel = useRef(null)

    return (
        <View style={{ alignItems: "center" }}>
            <CarouselComp
                layout="default"
                layourCardOffest={9}
                ref={isCarousel}
                data={APPDATA}
                renderItem={CarouselItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
            />
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        backgroundColor: "white",
        borderRadius: 8,
        width: ITEM_WIDTH,
        paddingBottom: 40,
        elevation: 7,
        alignItems: "center",
    },
    image: {
        width: 300,
        height: 300
    }
})

export default Carousel