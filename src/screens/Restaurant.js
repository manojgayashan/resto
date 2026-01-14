import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, FlatList, StyleSheet } from 'react-native'
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
import { SafeAreaView } from 'react-native-safe-area-context'
import { openDirections } from '../utils/openDirections'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Skeleton from "react-native-reanimated-skeleton";

export default function Restaurant() {
  Geolocation.getCurrentPosition(info => console.log(info));
  const navigation = useNavigation()
  const route = useRoute()
  const bottomSheetRef = useRef();
  const [position, setPosition] = useState(null)
  const [region, setRegion] = useState(null)
  const [address, setAddress] = useState('')
  const [currentLocation, setCurrentLocation] = useState('')
  const [restaurant, setRestaurant] = useState(route.params?.restaurant)
    const [loading, setLoading] = useState(false);
    const [isAddressClick, setIsAddressClick] = useState(false);
    

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);

  }, [])
  Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
  });

  const data = require('../constants/Restuarants.json')

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos)
        let coordinates = pos.coords
        console.log(pos.coords)
        setPosition(coordinates);
        setRegion(createRegion(coordinates.latitude, coordinates.longitude))
        getAddress(coordinates)
      },
      (error) => console.log('GetCurrentPosition Error', JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 3000,
        useSignificantChanges: false,
        showsBackgroundLocationIndicator: false
      }
    );
  };

  // useEffect(() => {
  //   console.log('Restaurant mounted');
  //   getCurrentPosition();

  //   return () => getCurrentPosition();
  // });

  const watchId = useRef(null);

  useEffect(() => {
    setLoading(true)
    watchId.current = Geolocation.watchPosition(
      async (pos) => {
        console.log(pos)
        let coordinates = pos.coords
        console.log(pos.coords)
        setPosition(coordinates);
        setCurrentLocation(coordinates)
        setRegion(createRegion(coordinates.latitude, coordinates.longitude))
        getAddress(coordinates)
        setLoading(false)
      },
      error => {
        console.log('Location error:', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        timeout: 15000,
      }
    );

    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
        console.log('Geolocation stopped');
      }
    };
  }, []);

  const onMarkerPress = (marker) => {
    setRestaurant(null)
    console.log(marker)
    bottomSheetRef.current?.snapToIndex(1);
    setRestaurant(marker)
  }

  const getAddress = async (coordinates)=>{
        const address = await getAddressFromCoords(coordinates.latitude, coordinates.longitude);
        setAddress(address)

  }

  const onUseCurrentLocationPress=()=>{
setIsAddressClick(false)
getCurrentPosition()
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.white }]}>
      <View style={styles.homeHeader}>
        <View style={styles.row}>
          <RestoButton
            variant='outline'
            icon={<FontAwesome6 name='chevron-left' size={14} color={colors.black400} />}
            backgroundColor={colors.background}
            borderColor={colors.shadow}
            size='sm'
            marginRight={10}
            onPress={() => navigation.goBack()}
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
            <Text style={[styles.title14, { color: colors.black200 }]}>Offers Near</Text>
            <Skeleton
              containerStyle={{ flex: 1, width: 300, height: 50 }}
              isLoading={loading}
              layout={[
                { key: "address", width: WINDOW_WIDTH / 1.75, height: 25, marginBottom: 6 }
              ]}
            >
              <TouchableOpacity style={styles.row} onPress={() => {setIsAddressClick(true)}}>
                <Text style={[styles.title14, { width: WINDOW_WIDTH / 1.7, height: 22 }]} numberOfLines={1}>{address.replace(/^[A-Z0-9+]+\s*,\s*/i, '')} </Text>
                <FontAwesome6 name='chevron-down' size={12} color={colors.black900} />
              </TouchableOpacity>
            </Skeleton>
          {isAddressClick && (
            <View style={[styles.addressFull,{width:WINDOW_WIDTH/1.45,right:16}]}>
            <TouchableOpacity onPress={()=>setIsAddressClick(false)} style={{borderBottomWidth:0.6,paddingBottom:8,borderColor:colors.black100}}>
            <Text style={styles.title14}>{address}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row,{paddingTop:8}]} onPress={()=>{onUseCurrentLocationPress()}}>
              <FontAwesome6 name='location-crosshairs' size={14} color={colors.primary} />
              <Text style={[styles.title14,{paddingLeft:8,color:colors.primary}]}>Use Current Location</Text>
            </TouchableOpacity>
            </View>
          )}

          </View>
        </View>
      </View>
      <View style={styles.homeHeader}>
        <View>
          <View style={[styles.row,styles.addressInput]}> 
          <Feather name='search' size={18} color={colors.black400} />
          <GooglePlacesAutocomplete
            query={{
              key: 'AIzaSyDb3nFvDwC8faGTV4W3ohNMIbLaSoMvxF8',
              language: 'en', 
            }}
            fetchDetails
            onPress={(data, details) =>{
                        if (details) {
            const coord = details.geometry.location;
            const coordinates ={
              latitude:coord.lat,
              longitude:coord.lng
            }
            console.log('coordinates',coordinates)
        getAddress(coordinates)

            
        setPosition(coordinates);
        setRegion(createRegion(coordinates.latitude, coordinates.longitude))
        
            // console.log('location ',details)
          }
            }}
            placeholder='Search for Location You Want to Get Offer'
            textInputProps={{
              leftIcon: { type: 'font-awesome', name: 'chevron-left' },
              errorStyle: { color: 'red' },
            }}
            styles={{
              textInput: {
                fontSize: 16,
                lineHeight: 24,
                borderRadius: 50,
                height: 36,
                // height: verticalScale(48),
                // backgroundColor: 'red',
                color: colors.black,
                textAlignVertical: 'center',
                paddingLeft: 12,
                width: WINDOW_WIDTH - 32

              },
              predefinedPlacesDescription: {
                color: "#1faadb",
              },
              listView: {
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.black100,
                position: 'absolute',
                top: 48,
                zIndex: 9999,
                backgroundColor: colors.white,
                maxHeight: 164
              },
              separator: {
                backgroundColor: colors.white,
                marginVertical: -3
              }

            }}
          />
          </View>
          <ScrollView style={{ marginRight: -16 }} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 16 }}>

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
              title='Caffe'
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
              icon={<FontAwesome6 name='martini-glass-empty' size={14} color={colors.black400} />}
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
        snapPoints={[WINDOW_HEIGHT / 2, WINDOW_HEIGHT / 2]}
        enablePanDownToClose
        index={1}
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
                      onPress={() => openDirections(restaurant.latitude + position.latitude, restaurant.longitude + position.longitude)}
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
                        style={{ width: WINDOW_WIDTH - 64, height: 140, marginRight: 16, borderRadius: 8 }}
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

            {isAddressClick && (
              <TouchableOpacity onPress={()=>setIsAddressClick(false)} style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.2)',zIndex:5 }]} />
            )}
    </SafeAreaView>
  )
}