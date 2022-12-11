import { View, StyleSheet, Image , Text, ScrollView } from "react-native";
import { Button , Card, List , IconButton , ToggleButton} from 'react-native-paper';
import Stats from "./Components/Stats";
import { useEffect, useState } from 'react';
import axios from "axios";


const StudentDetails = ({navigation})=> {
   


    const [registrations, setRegis] = useState([["hello"],["world"]]);
 


    useEffect( () =>{

        const updateData = async () =>{

            try {
                await axios.get("https://localhost:44323/api/GetRegistrationsTeacher",)
                .then((responce) => {
                    console.log("teacher panel")
                    setRegis(responce.data)
            })
            } 
            catch (error) {
                console.error(error)
            }
    
        }
        
        updateData();
        
    },[])


    const onButtonToggle = () => {
        navigation.navigate('Profile')
    }
//     const actions = () => {
//         return (
//             <View style={{flexDirection:'row'}}>
//                 <IconButton
//     icon={require('./Images/trash.png')}
//     size={20}
//     mode="default"
//     onPress={()=>{deletefunctionality}}
//   />
//   <IconButton
//   icon={require('./Images/edit.png')}
//   size={20}
//   mode="default"
//   onPress={()=>{editfunctionality}}
// />
// </View>
//         );
//     }
 return (
<View style={style.container}>
<View style={{marginTop:30, flexDirection:'row-reverse'}}>
    <ToggleButton
      icon={require('./Images/menu.png')}
      value="bluetooth"
      onPress={onButtonToggle}
    />

    </View>
     <View style={style.mainpic}> 
    <Stats number={133} description={"Total students"}/>
    <Stats number={7} description={"Total subjects"}/>
     </View>
     <View style={style.data}>
       <View> 
       <Text style={{textAlign: "center" , marginTop: 20 , fontWeight: "bold" , fontSize: 25}}> Students </Text>
         </View>
        <ScrollView style={{padding:10}}>      

        

            {registrations.map((student) =>{

            return <List.Section>
            <List.Item style={style.list} title={student[1]} description={student[5]} > </List.Item>
            </List.Section>

          })}
            


        </ScrollView>
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
        flexDirection: 'row'
    },
    content: {
        flex:1,
        backgroundColor: '#ffd656',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        marginLeft: 15,
        marginRight: 15,
    },
    data: {
        flex:1,
        backgroundColor: '#ffd656',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10
    },
    list: {
        backgroundColor:'#fffcf1' ,
        borderRadius:15
    }
   
})

export default StudentDetails;