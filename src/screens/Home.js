import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, FlatList, StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../constants/styles'
import RestoButton from '../components/RestoButton'
import colors from '../constants/colors'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Geolocation from '@react-native-community/geolocation'
import MapView from 'react-native-maps'
import { createRegion } from '../utils/map'
import { getAddressFromCoords } from '../utils/getAddress'
import BottomSheet, { useBottomSheetScrollableCreator, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Skeleton from "react-native-reanimated-skeleton";

export default function Home() {

  const bottomSheetRef = useRef();
  const navigation = useNavigation();
  const [position, setPosition] = useState(null);
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const [sortType, setSortType] = useState('distance'); // 'distance' | 'rating'
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddressClick, setIsAddressClick] = useState(false);

  const [key, setKey] = useState(0);

  const ScrollableFlatList = useBottomSheetScrollableCreator(FlatList);
  const data = require('../constants/Restuarants.json');

  const getCurrentPosition = useCallback(() => {
    setLoading(true)
    Geolocation.getCurrentPosition(
      async (pos) => {
        const coordinates = pos.coords;
        setPosition(coordinates);
        const addr = await getAddressFromCoords(coordinates.latitude, coordinates.longitude);
        setAddress(addr);
        setLoading(false)
      },
      (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
        fastestInterval: 3000,
        useSignificantChanges: false,
        showsBackgroundLocationIndicator: false,
      }
    )
  })

  Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'whenInUse',
  });

  const watchId = useRef(null);


  useEffect(() => {
    getCurrentPosition()
  }, []);

  // const watchId = useRef(null);



  // 🔹 Calculate distance between two coordinates
  const getDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      0.5 - Math.cos(dLat) / 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  };

  // 🔹 Filter and sort restaurants
  const filteredData = data
    .filter(item => item.isActive)
    .map(item => ({
      ...item,
      distance: position
        ? getDistance(position.latitude, position.longitude, item.latitude, item.longitude)
        : 0
    }))
    .sort((a, b) => {
      if (sortType === 'distance') return a.distance - b.distance;
      if (sortType === 'rating') return b.rating - a.rating;
      return 0;
    });

    const refresh =()=>{
      getCurrentPosition()
      setKey(key+1)
    }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.homeHeader}>
        <View style={styles.row}>
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
              containerStyle={{ flex: 1, width: 300, height: 50,zIndex:6 }}
              isLoading={loading}
              layout={[
                { key: "address", width: WINDOW_WIDTH / 1.45, height: 25, marginBottom: 6 }
              ]}
            >
              <TouchableOpacity style={[styles.row,{alignItems:'center'}]} onPress={() => {setIsAddressClick(true)}}>
                <Text style={[styles.title14, { width: WINDOW_WIDTH / 1.4, height: 22 }]} numberOfLines={1}>{address.replace(/^[A-Z0-9+]+\s*,\s*/i, '')}</Text>
                <FontAwesome6 name='chevron-down' size={12} color={colors.black900} />
              </TouchableOpacity>
            </Skeleton>


          {isAddressClick && (
            <TouchableOpacity onPress={()=>setIsAddressClick(false)} style={styles.addressFull}>
            <Text style={styles.title14}>{address}</Text>
            </TouchableOpacity>
          )}
          </View>
        </View>


        <View style={{ marginTop: 16 }}>
          <View style={[styles.row, { justifyContent: 'space-between' }]}>
            <Text style={[styles.text14, { color: colors.primary,fontWeight:'700' }]}>{filteredData.length} <Text style={{fontWeight:'400'}}>Restaurants Found</Text></Text>
            <TouchableOpacity
              style={[styles.row, { alignItems: 'center', padding: 8, borderWidth: 1, borderColor: colors.shadow, borderRadius: 6, zIndex: 10 }]}
              onPress={() => setMenuOpen(!menuOpen)}
            >
              <Feather name="filter" size={16} color={colors.primary} style={{ marginRight: 6 }} />
              <Text style={styles.text14}>Sort By: {sortType.charAt(0).toUpperCase() + sortType.slice(1)}</Text>
              <Feather name={menuOpen ? "chevron-up" : "chevron-down"} size={14} color={colors.primary} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </View>
          {menuOpen && (
            <View style={{ backgroundColor: colors.background, borderWidth: 1, borderColor: colors.shadow, borderRadius: 6, marginTop: 4, overflow: 'hidden', position: 'absolute', zIndex: 5, top: 36, right: 0 }}>
              <TouchableOpacity
                style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
                onPress={() => { setSortType('distance'); setMenuOpen(false); }}
              >
                <Feather name="map-pin" size={16} color={colors.primary} style={{ marginRight: 6 }} />
                <Text style={[styles.text14,{fontWeight:sortType=='distance'?'700':'400'}]}>Distance</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
                onPress={() => { setSortType('rating'); setMenuOpen(false); }}
              >
                <Feather name="star" size={16} color={colors.primary} style={{ marginRight: 6 }} />
                <Text style={[styles.text14,{fontWeight:sortType=='rating'?'700':'400'}]}>Rating</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <FlatList
      key={key}
        data={filteredData}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        style={{backgroundColor:colors.background}}
        renderItem={({ item, index }) => (
          <Animatable.View key={index} animation={'fadeInLeft'} delay={index * 100}>
            <TouchableOpacity style={styles.restaurantCard} onPress={() => { navigation.navigate('Restaurant', { restaurant: item }) }}>
              <Image source={{ uri: item.photos[0] }} style={styles.restaurantCardImage} />
              <View>
                <View style={[styles.row, { justifyContent: 'space-between', width: WINDOW_WIDTH - 166 }]}>
                  <Text style={styles.title14}>{item.name}</Text>
                  <View style={styles.row}>
                    <AntDesign name={'star'} size={16} color={colors.primary} />
                    <Text style={[styles.text14, { color: colors.black300, paddingLeft: 8 }]}>{item.rating}</Text>
                  </View>
                </View>
                <View style={[styles.row, { width: WINDOW_WIDTH - 182, paddingTop: 8 }]}>
                  <Feather name="map-pin" size={16} color={colors.primary} />
                  <Text style={[styles.text14, { color: colors.black300, paddingLeft: 8 }]} numberOfLines={1}>{item.address}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        )}
      />
      {menuOpen && (
        <TouchableOpacity onPress={()=>setMenuOpen(false)} style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.2)' }]} />
      )}
      {isAddressClick && (
        <TouchableOpacity onPress={()=>setIsAddressClick(false)} style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.2)' }]} />
      )}

      <TouchableOpacity style={styles.FAB} onPress={()=>refresh()}>
        <SimpleLineIcons name='refresh' color={colors.primary} size={36} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
