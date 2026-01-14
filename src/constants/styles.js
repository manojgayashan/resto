import { Dimensions, StyleSheet } from 'react-native';
import colors from './colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    fontSize:18,
    fontWeight:'700',
    lineHeight:28
  },
  row:{
    flexDirection:'row',
    alignItems:'center'
  },
  homeHeader:{
    paddingHorizontal:20,
    paddingVertical:16,
    borderBottomWidth:0.3,
    borderBottomColor:colors.shadow
  },
  title12:{
    fontSize:12,
    fontWeight:'700',
    lineHeight:17
  },
  title14:{
    fontSize:14,
    fontWeight:'700',
    lineHeight:20
  },
  map:{
    flex:1,
    paddingTop:-200
  },
  position:{
    width:32,
    height:32,
    borderRadius:20,
    backgroundColor:colors.white,
    alignItems:'center',
    justifyContent:'center'
  },
  positionDot:{
    backgroundColor:colors.primary,
    height:24,
    width:24,
    borderRadius:20
  },
  positionWrapper:{
    backgroundColor:colors.primaryAlpha,
    padding:12,
    borderRadius:50
  },
    wrapper: {
    alignItems: 'center',
  },
  bubble: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 22,
  paddingVertical: 6,
  paddingRight: 14,

  elevation: 8,

  shadowColor: '#000',
  shadowOpacity: 0.18,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 }
  },
  plus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    marginRight: 10
  },
  plusText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    height:16,
    width:16,
    backgroundColor:colors.white,
    borderRadius:20,
    borderTopLeftRadius:1,
    alignItems:'center',
    justifyContent:'center'
  },
  textWrap: {
    justifyContent: 'center',
    width:75
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827'
  },
  name: {
    fontSize: 11,
    color: '#6B7280',
    maxWidth: 115
  },
  pointer: {
  width: 0,
  height: 0,
  borderLeftWidth: 7,
  borderRightWidth: 7,
  borderTopWidth: 7,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderTopColor: '#FFFFFF',
  marginTop: -1,

  shadowColor: '#000',
  shadowOpacity: 0.12,
  shadowRadius: 3,
  shadowOffset: { width: 0, height: 2 }
  },
  contentContainer:{
    backgroundColor:colors.background
  },
  discount:{
    backgroundColor:colors.primary,
    padding:4,
    paddingHorizontal:8,
    borderRadius:6,
    marginTop:12
  },
  text14:{
    fontSize:14,
    lineHeight:20
  },
  whiteContainer:{
    padding:16,
    backgroundColor:colors.white
  },
  restaurantCard:{
    backgroundColor:colors.white,
    marginHorizontal:16,
    marginTop:16,
    padding:16,
    borderRadius:16,
    borderWidth:0.6,
    borderColor:colors.black100,
    flexDirection:'row',
    alignItems:'center'
  },
  body:{
    backgroundColor:colors.background,
    flex:1
  },
  restaurantCardImage:{
    height:windowWidth/5,
    width:windowWidth/5,
    borderRadius:8,
    borderWidth:0.6,
    borderColor:colors.black100,
    marginRight:16
  },
  addressInput:{
     width: windowWidth - 32,
                justifyContent: 'center',
                height: 44,
                alignItems: 'center',
                position: 'relative',
                zIndex: 5,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: colors.black100,
                paddingHorizontal:16
  },
  addressFull:{ 
    backgroundColor: colors.background, 
    borderWidth: 1, 
    borderColor: colors.shadow, 
    borderRadius: 8, 
    overflow: 'hidden', 
    position: 'absolute', 
    zIndex: 11, 
    top: 20, 
    right: -10,
    padding:16,
    width:windowWidth/1.3
    
   },
   FAB:{
    backgroundColor:colors.white,
    position:'absolute',
    bottom:40,
    right:16,
    padding:16,
    borderRadius:50,

  elevation: 8,

  shadowColor: '#000',
  shadowOpacity: 0.18,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 }
   }
});

export default styles;
