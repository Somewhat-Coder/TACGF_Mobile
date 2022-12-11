import { useEffect, useState } from "react";
import { View, StyleSheet, Image , Text, SafeAreaView , TouchableOpacity} from "react-native";
import { Button , TextInput, HelperText } from 'react-native-paper';
import axios from "axios";



const Login = ({navigation}) => {



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState(false);
    const [role, setRole] = useState('');

    const homehandler = () => {
        navigation.navigate('Home');
    }

    useEffect(()=>{
        console.log("Role" , role)
    },[role])

    const getRole = async () =>{

        try {
            await axios.get("https://localhost:44323/api/GetRole")
            .then((responce) => {
                console.log("Get role axios hit")
            if (responce.data === "admin"){

              setRole('admin')
            }
            else if (responce.data === "teacher"){
                
                setRole('teacher')
            }
        })
        } 
        catch (error) {
            console.error(error)
        }


    }

    const submithandler = async () => {


        const data = {
            email : email,
            password : password
        }
      
        try {
                await axios.post("https://localhost:44323/api/Login", 
                    data
                )
                .then((responce) => {
                if (responce.data === "Success"){

                    getRole();
                    console.log(responce.data )
                    console.log(role);
                    if (role === "admin"){
                    navigation.navigate('TeacherHome');
                    }
                    else{
                        navigation.navigate('StudentDetails');
                    }

                }
                else{

                    console.log("error")
                }
            })
            } catch (error) {
                console.error(error)
        }
        
}

return (
    <View style={style.container}>
         <View style={{flexDirection:'row' , justifyContent:'flex-end', marginTop:30 , padding:10}}>
         <TouchableOpacity
        onPress={homehandler}
        style={style.roundButton1}>
        <Image 
  source={require('./Images/circleright.png')}  
  style={{width: 50, height: 50 , margin: "auto"}} 
/>
      </TouchableOpacity>
      </View>
     <View style = {style.mainpic}>
       
       <Image 
 source={require('./Images/teacher.png')}  
 style={{width: 300, height: 300 , margin: "auto"}} 
/>
         </View>
         <View style={style.content}>
              <View>
                <Text style={{textAlign: "center" , marginTop: 20 , fontWeight: "bold" , fontSize: 25}}> Welcome Aboard! </Text>
                <Text style={{textAlign: "center"}}> Ready to dessiminate knowledge? </Text>
                 </View>
                <View style={{justifyContent:'center', alignItems:'center', flex: 1}}>
                    <SafeAreaView>
                        {/* <TextInput  label="Email" style={style.text}  value= {credentials.email}   onChange={inputHandler.bind(this,'email')}/> */}
                    <TextInput
      label="Email"
      mode = 'outlined'
      selectionColor="black"
      placeholder=""
      outlineColor="black"
      activeOutlineColor="black"
      value={email}
      onChangeText={email => setEmail(email)}
      style={style.text}
    /> 
     <TextInput
     secureTextEntry={true}
      label="Password"
      mode = 'outlined'
      selectionColor="black"
      placeholder=""
      outlineColor="black"
      activeOutlineColor="black"
      value={password}
      onChangeText={password => setPassword(password)}
      style={style.text}
    />
    
    {error && <HelperText visible={error} type="error"> Email and Password are incorrect </HelperText>}

    <Button mode="contained" textColor="black" style={style.bstyle} onPress={submithandler}> Submit </Button>
                    </SafeAreaView>
                </View>
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
        marginTop:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex:1,
        backgroundColor: '#ffd656',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        marginLeft: 15,
        marginRight: 15,
    },
    text: {
        backgroundColor:'#ffd656',
        margin: 15,
        width: 300,
        height: 60,
        margin: 10,
        fontSize:12
       },
       bstyle: {
        backgroundColor: '#fffcf1',
        textColor: 'black',
        margin: 10
    }
})

export default Login;