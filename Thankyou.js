import { Axios } from "axios";
import { useEffect } from "react";
import { View , StyleSheet , TouchableOpacity , Image , Text} from "react-native";
import axios from 'axios';

const Thankyou = ({route, navigation}) => {
    const {nname} = route.params;
    const [message , setmessage] = ('');
    useEffect (() => {
        azurefunction();
    },[])

    async function azurefunction() {
        let response = await fetch(`https://register20221207030944.azurewebsites.net/api/Thankyou?name=${nname}`, {  
            method: 'GET', 
            crossorigin: true,  
            mode: 'no-cors',     
          }) ;
        if (response) {
        console.log(nname);
        }
        }
    const homeHandler = () => {
        navigation.navigate('Home');
    }
 return (
    <View style={style.container}>
        <View style={{flexDirection:'row' , justifyContent:'space-between', marginTop:30 , padding:20}}>
        <TouchableOpacity
        onPress={homeHandler}
        style={style.roundButton1}>
        <Image 
  source={require('./Images/circleleft.png')}  
  style={{width: 50, height: 50 , margin: "auto"}} 
/>
</TouchableOpacity>
        </View>
        <View style={style.mainpic}>

        <Image 
 source={require('./Images/thankyou.png')}  
 style={{width: 300, height: 300 , margin: "auto"}} 
/>
        </View>
        <View style={style.mainpic}> 
        <Text style={{textAlign: "center" , marginTop: 20 , fontWeight: "bold" , fontSize: 25}}> Registered! </Text>
        <Text> Thank you for registering . </Text> 
            <Text> {nname} </Text>
        </View>
    </View>
 );
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffcf1",
    },
    mainpic: {
        marginTop:80,
        justifyContent: 'center',
        alignItems: 'center',
    },

})

export default Thankyou;