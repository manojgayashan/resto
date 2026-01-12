import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import styles from '../constants/styles';
import Feather from 'react-native-vector-icons/Feather'
import colors from '../constants/colors';

const RestoMarker = ({ rating, name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.wrapper}>
      <View style={styles.bubble}>
        <TouchableOpacity style={styles.plus}>
          <View style={styles.plusText}>
            <Feather name='plus' size={12} color={colors.primary} />
          </View>
        </TouchableOpacity>

        <View style={styles.textWrap}>
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
        </View>
      </View>

      <View style={styles.pointer} />
    </TouchableOpacity>
  );
};

export default RestoMarker;
