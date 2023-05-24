
import { View, Image, TouchableOpacity, } from "react-native";
import { styles } from "../styles/styles";
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../hooks/authStore';

export default function Footer({route}){
    const navigation = useNavigation();
    const role = useStore((state) => state.role);

    return(
        <View style={styles.footerContainer}>
            <View style={styles.footerInfo}>
                <View style={styles.footerSection}>
                    <>
                      {route == "Home" ? <View style={styles.footerActive}></View> : "" }
                    </>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Home');}}>
                        <Image style={styles.footerImage} source={route == "Home" ? require("../../assets/images/home-icon-hover.png") :  require("../../assets/images/home-icon.png") }/>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerSection} >
                    <>
                    {route == "Details" ? <View style={styles.footerActive}></View> : "" }
                    </>
                    <TouchableOpacity  onPress={()=>{navigation.navigate('Details');} }>
                        <Image style={styles.footerImage} source={route == "Details" ? require("../../assets/images/details-icon-hover.png") :  require("../../assets/images/details-icon.png") }/>
                    </TouchableOpacity>
                </View>

                {role === "admin" ? 
                
                  <>
                <View style={styles.footerSection}>
                    <>
                    {route == "Inventory" ? <View style={styles.footerActive}></View> : "" }
                    </>
                    <TouchableOpacity onPress={()=>{navigation.navigate('Inventory');} }>
                        <Image style={styles.footerImage} source={route == "Inventory" ?  require("../../assets/images/inventory-icon-hover.png") :  require("../../assets/images/inventory-icon.png")}/>
                    </TouchableOpacity>
                </View>
                  </>
                : ""
                   }
            </View>
        </View>
    )
}