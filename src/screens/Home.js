import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../constants/styles'
import RestoButton from '../components/RestoButton'
import colors from '../constants/colors'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RestoTextInput from '../components/RestoTextInput'
import Geolocation from '@react-native-community/geolocation'
import MapView, { Callout, Marker, MarkerAnimated } from 'react-native-maps'
import { createRegion } from '../utils/map'
import { getAddressFromCoords } from '../utils/getAddress'
import RestoMarker from '../components/RestoMarker'
import BottomSheet, { BottomSheetFlashList, BottomSheetScrollView, BottomSheetView, useBottomSheetScrollableCreator, WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import * as Animatable from 'react-native-animatable';
import RestoImageLoader from '../components/RestoImageLoader'

export default function Home() {
  // Geolocation.getCurrentPosition(info => console.log(info));
  const bottomSheetRef = useRef();
  const [position, setPosition] = useState(null)
  const [region, setRegion] = useState(null)
  const [address, setAddress] = useState('')
  const [restaurant, setRestaurant] = useState(null)
  const ScrollableFlatList = useBottomSheetScrollableCreator(FlatList);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, [])

  const data = require('../constants/Restuarants.json')

  const getCurrentPosition = () => {
    Geolocation.watchPosition(
      async (pos) => {
        let coordinates = pos.coords
        console.log(pos.coords)
        setPosition(coordinates);
        setRegion(createRegion(coordinates.latitude, coordinates.longitude))
        const address = await getAddressFromCoords(coordinates.latitude, coordinates.longitude);
        setAddress(address)
      },
      (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,      // 🔹 meters (update only if moved 10m)
        interval: 5000,          // 🔹 Android: 5 seconds
        fastestInterval: 3000,   // 🔹 Android: minimum time between updates
        useSignificantChanges: false,
        showsBackgroundLocationIndicator: false,
      }
    );
  };


  useEffect(() => {
    getCurrentPosition()

  }, [])

  const onMarkerPress = (marker) => {
    setRestaurant(null)
    console.log(marker)
    bottomSheetRef.current?.snapToIndex(1);
    setRestaurant(marker)
  }

  return (
    <View style={styles.container}>
      <View style={styles.homeHeader}>
        <View style={styles.row}>
          <RestoButton
            variant='outline'
            icon={<FontAwesome6 name='chevron-left' size={14} color={colors.black400} />}
            backgroundColor={colors.background}
            borderColor={colors.shadow}
            size='sm'
            marginRight={10}
          />
          <RestoButton
            variant='outline'
            icon={<Feather name='map-pin' size={18} color={colors.black400} />}
            backgroundColor={colors.background}
            borderColor={colors.shadow}
            size='sm'
            marginRight={10}
          />
          <View>
            <Text style={[styles.title12, { color: colors.black200 }]}>Offers Near</Text>
            <View style={styles.row}>
              <Text style={styles.title12}>{address.replace(/^[A-Z0-9+]+\s*,\s*/i, '')}</Text>

            </View>

          </View>
        </View>
      </View>
      <View style={styles.homeHeader}>
        <View>
          <RestoTextInput
            placeholder='Search for Location You Want to Get Offer'
            leftIcon={<Feather name='search' size={18} color={colors.black400} />}
            size='sm'
            fontSize={14}
          />
          
          <ScrollView style={{marginRight:-16}} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 16 }}>

            <RestoButton
              variant='outline'
              icon={<Feather name='align-center' size={16} color={colors.black400} />}
              backgroundColor={colors.background}
              borderColor={colors.shadow}
              size='xsm'
              marginRight={10}
            />


            <RestoButton
              variant='outline'
              icon={<Image source={require('../assets/chef-hat.png')} style={{ width: 16, height: 14, resizeMode: 'contain' }} />}
              backgroundColor={colors.background}
              borderColor={colors.shadow}
              textColor={colors.black400}
              size='xsm'
              marginRight={10}
              title='Cuisines'

            />


            <RestoButton
              variant='outline'
              icon={<Ionicons name='cafe-outline' size={16} color={colors.black400} />}
              backgroundColor={colors.background}
              borderColor={colors.shadow}
              textColor={colors.black400}
              size='xsm'
              marginRight={10}
              title='Cafe'
            />

            <RestoButton
              variant='outline'
              icon={<Ionicons name='restaurant-outline' size={16} color={colors.black400} />}
              backgroundColor={colors.background}
              borderColor={colors.shadow}
              textColor={colors.black400}
              size='xsm'
              marginRight={10}
              title='Restuaurents'
            />
            <RestoButton
              variant='outline'
              icon={<Ionicons name='restaurant-outline' size={16} color={colors.black400} />}
              backgroundColor={colors.background}
              borderColor={colors.shadow}
              textColor={colors.black400}
              size='xsm'
              marginRight={10}
              title='Pubs'
            />


          </ScrollView>
        </View>
        {/* <Text>{position.latitude}</Text> */}
      </View>
      {
        region !== null ?
          <MapView
            region={region}
            style={styles.map}
            mapType='terrain'
            moveOnMarkerPress={false}
            // showsUserLocation={true}
            
          >
            <View>
              {data.map((marker, index) => (
                marker.isActive &&
                <Marker
                  key={index}
                  coordinate={{ latitude: marker.latitude + position.latitude, longitude: marker.longitude + position.longitude }}
                  
                  style={{ elevation: 5 }}
                  onPress={() => onMarkerPress(marker)}
                  tracksViewChanges={false}
                  focusable={false}
                >
                  <RestoMarker rating={marker.rating} name={marker.name} />
                </Marker>
              ))}

              <MarkerAnimated coordinate={{ latitude: position.latitude, longitude: position.longitude }}>
                <View style={styles.positionWrapper}>
                  <View style={styles.position} >
                    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.positionDot} key={1} />
                  </View>
                </View>
              </MarkerAnimated>

            </View>
          </MapView>
          :
          null
      }
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={[WINDOW_HEIGHT/1.8, WINDOW_HEIGHT/1.8]}
        index={-1}
        enablePanDownToClose
      >
        <BottomSheetScrollView style={styles.contentContainer}>
          {
            restaurant !== null ?
              <View>
                <View style={styles.whiteContainer}>
                  <RestoImageLoader uri={restaurant.photos[0]} key={restaurant.id} />
                  <View style={[styles.row, { justifyContent: 'space-between', alignItems: 'flex-start' }]}>

                    <Text style={[styles.title, { paddingVertical: 12, width: WINDOW_WIDTH / 2 }]}>{restaurant.name}</Text>
                    <View style={styles.discount}>
                      <Text style={[styles.text14, { color: colors.secondary }]}>Discount upto {restaurant.discount}%</Text>
                    </View>
                  </View>
                  <Text style={[styles.text14, { color: colors.black400 }]}>⭐ {restaurant.rating} | {restaurant.address}</Text>
                  <View style={[styles.row, { justifyContent: 'space-between', paddingTop: 16 }]}>
                    <RestoButton
                      title='Direction'
                      icon={<MaterialIcons name='directions' size={24} color={colors.primary} />}
                      variant='solid'
                      backgroundColor={colors.secondary}
                      size='md'
                      textColor={colors.primary}
                      width={WINDOW_WIDTH / 2.25}
                    />
                    <RestoButton
                      title='Menu'
                      icon={<View style={{ height: 20, width: 20, borderRadius: 4, backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center' }}><AntDesign name='bars' size={16} color={colors.primary} /></View>}
                      variant='solid'
                      backgroundColor={colors.primary}
                      size='md'
                      textColor={colors.secondary}
                      width={WINDOW_WIDTH / 2.25}
                    />
                  </View>
                </View>
                <View style={[styles.whiteContainer, { marginTop: 16 }]}>
                  <BottomSheetFlashList
                    data={restaurant.photos.filter((_, index) => index !== 0)}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <Animatable.Image
                        source={{ uri: item }}
                        style={{    width: WINDOW_WIDTH-64,height: 140,marginRight:16,borderRadius:8}}
                        resizeMode="cover"
                        animation="fadeIn"
                        duration={300}
                      />
                    )}
                  />
                </View>
              </View>
              :
              null
          }
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  )
}