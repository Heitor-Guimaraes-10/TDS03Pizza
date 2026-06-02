import React from "react";

import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../Presentation/theme/AppTheme';

interface Props {
  title: string;
  onPress?: () => void;
  
}


export const RoundedButton  = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style = { styles.bnt}
        >
        <Text style={styles.Txtbnt}>{title}</Text>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
    bnt: {
        backgroundColor: COLORS.secondary,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },

    Txtbnt: {
        color : COLORS.bgBlack,
        fontWeight: 'bold',
        fontSize: 16,

    },

})