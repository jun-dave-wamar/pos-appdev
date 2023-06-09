import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00412A',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: StatusBar.currentHeight,
    height: '100%'
  },
  containerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: StatusBar.currentHeight,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
  },
  headerModal: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    position: 'relative',
    paddingVertical: 20,
  },
  headerLeft: {
    position: 'relative',
    width: '90%',
    flex: 1,
    marginRight: 15,
  },
  headerIcon: {
    position: 'absolute',
    zIndex: 1,
    left: 10,
    top: 10,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  headerInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    width: '100%',
    height: 40,
    paddingLeft: 37,
  },
  headerProfile: {
    width: '10%',
    display: 'flex',
    alignItems: 'flex-end',
    marginleft: 15,
  },
  mainInfo: {
    paddingHorizontal: 25,
    position: 'relative',
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#ffffff',
    zIndex: 999,
    paddingTop: 15,
  },
  heading: {
    fontFamily: 'NeuMontreal-Bold',
    fontSize: 20,
    paddingVertical: 10,
  },
   headingModal: {
    fontFamily: 'NeuMontreal-Bold',
    fontSize: 15,
    paddingVertical: 5,
  },
  mainBoxes: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 10,
    rowGap: 10,
    height: height,
    width: width,
  },
  mainSections: {
    width: '48%',
    height: 170,
    padding: 15,
    backgroundColor: '#00412A',
    borderRadius: 5,
    marginBottom: 10,
  },
  evenMainSections: {
    width: '48%',
    height: 170,
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 5,
    marginBottom: 10,
  },
  mainHeading: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'NeuMontreal-Bold',
  },
  heightFull:{
    height: '100%',
    position: 'relative',
    alignContent: 'space-between'
  },  
  mainText: {
    lineHeight: 30,
    color: '#fff',
    fontSize: 11,
  },
  mainTop:{
    flex: 1,
     alignItems: 'flex-end',
  },
  mainBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  footerContainer: {
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: width,
  },
  footerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  footerSection: {
    position: 'relative',
  },
  footerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  footerActive: {
    width: 65,
    height: 5,
    backgroundColor: '#00412A',
    borderRadius: 5,
    position: 'absolute',
    bottom: -16,
    left: '50%',
    transform: [{ translateX: -0.5 * 65 }],
  },
  detailInput: {
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#1a1a1a',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    width: 50,
    height: 50,
    backgroundColor: '#00412A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  pickerLabel: {
    color: '#ccc',
  },
  quantityInput: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#00412A',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },

  
  removeButton: {
    backgroundColor: '#1a1a1a',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: '#1a1a1a',
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  picker: {
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  totalPrice: {
    marginVertical: 10,
  },
  errText: {
    color: '#FF0000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tableContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#00412A',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  tableContainer2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  tableHeader1: {
    color: '#fff',
    width: '50%'
  },
  
tableHeader2: {
    color: '#fff',
      width: '25%',
       textAlign: 'right',
    alignItems: 'flex-end',
  },
  tableHeader5:{
    color: '#fff',
    width: '10%',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
   tableHeader6: {
    color: '#fff',
    width: '40%'
  },
  tableHeader3: {
    color: '#fff',
     width: '25%',
       textAlign: 'right',
    alignItems: 'flex-end',
  },
  tableCell1: {
   color: '#1a1a1a',
    width: '50%',
    textAlign: 'left',
    alignItems: 'flex-end',
  },
  tableCell5: {
   color: '#1a1a1a',
    width: '10%',
    textAlign: 'left',
    alignItems: 'flex-end',
  },
    tableCell6: {
   color: '#1a1a1a',
    width: '40%',
    textAlign: 'left',
    alignItems: 'flex-end',
  },
  tableCell2: {
    color: '#1a1a1a',
    width: '25%',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  tableCell3: {
     color: '#1a1a1a',
    width: '25%',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  tableRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  columnContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column1:{
    flex:1,
  },
  columnText:{
    color: '#1a1a1a',
    fontFamily: 'NeuMontreal-Bold',
    fontSize: 20,
    paddingVertical: 10,
    width: '50%'
  },
  columnButton: {
    backgroundColor: '#1a1a1a',
    width: '20%',
    height: 50,
    alignSelf: 'flex-end',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regText:{
    color: '#1a1a1a',
    fontFamily: 'NeuMontreal-Bold',
    fontSize: 15,
    paddingVertical: 2,
    marginBottom: 5
  },
  headerSidebar:{
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    right: 0,
    bottom: 0,
    width: '50%',
    backgroundColor: '#1a1a1a',
    height: height,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  sidebar: {
    position: 'relative',
    width: '100%',
    height: '100%',
    
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  sidebarCloseBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
  },
  sidebarCloseIcon: {
    width: 20,
    height: 20,
  },
  sidebarContent: {
    marginTop: 50,
    paddingLeft: 20,
  },
  sidebarItem: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  closeSidebar: {
    backgroundColor: '#00412A',
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarProfile:{
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems:'center'
  },
  headerProfile2: {
    width: '10%',
    alignItems: 'center',
  },
  sidebarHeading: {
    marginVertical: 15,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'NeuMontreal-Bold',
  },
  textRight: {
    textAlign: 'center',
    color: '#fff'
  },
  deleteButton:{
     backgroundColor: '#DF2D29',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  column2:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  buttonSection: {
    width: '48%',
  },
  marginTop:{
    marginVertical: 5,
  }
});
