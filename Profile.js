import { View, StyleSheet, TouchableOpacity, Text, Image, SafeAreaView } from 'react-native';
import {  Button , List } from 'react-native-paper';
import ChangePassword from './ChangePassword';
import Navigation from './TNavigation';
import ANavigation from './ANavigation';
import { useState, useEffect } from 'react';
import TNavigation from './TNavigation';
import axios from "axios";



const Profile = ({navigation}) => {
    const [admin , setadmin] = useState(true);
    const [change , setchange] = useState(false);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    useEffect( () =>{

      const updateData = async () =>{

              try {
                await axios.get("https://localhost:44323/api/GetRole")
                .then((responce) => {
                if (responce.data === "admin"){
                  setadmin(true)
                }
                else if (responce.data === "teacher"){
                 setadmin(false)
                }
            })
            } 
            catch (error) {
                console.error(error)
            }

            try {
              await axios.get("https://localhost:44323/api/GetProfileInfo")
              .then((responce) => {

                  setName(responce.data['firstName'])
                  setEmail(responce.data['email'])
          })
          } 
          catch (error) {
              console.error(error)
          }
      
  
      }
      
      updateData();

  },[])


    const backHandler = () => {
         navigation.goBack();
    }

    
    const homeHandler = async () => {

          try {
            await axios.post("https://localhost:44323/api/Logout", 
                {
                    task : "logout"
                }
            )
            .then((responce) => {
            if (responce.data === "Success"){
              navigation.navigate('Home');
            }

        })
        } catch (error) {
              
                console.error(error)
          }

    }

    const teacherHandler = () => {
        navigation.navigate('TeacherHome');
    }
    const studentHandler = () => {
        navigation.navigate('StudentHome');
    }
    const studentdetailsHandler = () => {
        navigation.navigate('StudentDetails');
    }
 return (
    <View style={style.container}>
     <View style={{flexDirection:'row', justifyContent:'flex-start', marginTop:30 , padding:20}}>
            <TouchableOpacity
        onPress={backHandler}
        style={style.roundButton1}>
        <Image 
  source={require('./Images/circleleft.png')}  
  style={{width: 50, height: 50 , margin: "auto"}} 
/>
      </TouchableOpacity>
      </View>
    <View style={style.content} >
        <View style={{  justifyContent: 'center',alignItems: 'center'}}>
        <Text style={{textAlign: "center" , marginTop: 20 , fontWeight: "bold" , fontSize: 25 , marginBottom:20}}> Profile </Text>
        <Image source={require('./Images/maleteacher.png')}  style={{width: 100, height: 120 , margin: "auto" , backgroundColor:'orange', borderRadius:5}} />
        <Text style={{textAlign: "center" , marginTop: 10 , fontWeight: "bold" , fontSize: 20 }}> {name} </Text>
        <Text style={{margin:2}}> {email} </Text>
        <Button mode='contained' textColor="black" style={style.bstyle} onPress={homeHandler}> Log out  </Button>
          </View>
          <SafeAreaView>
    {admin ?  <View style={{padding:20}}>
        <List.Item
        title="Student data"
        left={props => <List.Icon {...props} icon={require('./Images/deletestudent.png')}/>}
        onPress={()=>{studentHandler()}}
      
      />
      <List.Item
        title="Teacher Data"
        left={props => <List.Icon {...props} icon={require('./Images/details.png')}/>}
        onPress={()=>{teacherHandler()}}
      />
      <List.Item
        title="Change Password"
        left={props => <List.Icon {...props} icon={require('./Images/settings.png')}/>}
      onPress={()=>{setchange(true)}}
      />
        </View> :  
        
    <View style={{padding:20}}>
      
      <List.Item
        title="Student Details"
        left={props => <List.Icon {...props} icon={require('./Images/details.png')} />}
        onPress={()=>{studentdetailsHandler()}}
      />
      <List.Item
        title="Change Password"
        left={props => <List.Icon {...props} icon={require('./Images/settings.png')}/>}
        onPress={()=>{setchange(true)}}
      />
        </View>}
    <ChangePassword visible={change} setvisible={()=>setchange(false)}/>
    </SafeAreaView>
    </View>
    </View>
 );
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffd656",
        justifyContent: "space-evenly"
    },
    roundButton1: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#fffcf1',
      },
    content: {
        flex:1,
    },
    bstyle: {
        backgroundColor: '#fffcf1',
        margin: 10
    }
})
export default Profile;