import { View, StyleSheet, Image , Text } from "react-native";
import { Button} from 'react-native-paper';
const Home = ({navigation}) => {
    const loginhandler = () => {
        navigation.navigate('Login');
    }
    const signuphandler = () =>{
        navigation.navigate('Signup');
    }
return (
    <View style={style.container}>
     <View style = {style.mainpic}>
       
       <Image 
 source={require('./Images/learning.png')}  
 style={{width: 300, height: 300 , margin: "auto"}} 
/>
         </View>
         <View style={style.content}>
<Button mode="contained" style={style.bstyle} onPress={loginhandler}> Teacher </Button>
<Button mode="contained" style={style.bstyle} onPress={signuphandler} > Student </Button>
         </View>
    </View>
);
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffcf1",
        justifyContent: "space-evenly"
    },
    mainpic: {
        marginTop:80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 30
    },
    bstyle: {
        backgroundColor: '#ffd656',
        margin: 10
    }
})


export default Home;