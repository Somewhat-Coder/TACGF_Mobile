import { View, StyleSheet, Image , Text, ScrollView } from "react-native";
import { Button , Card, List , IconButton, ToggleButton} from 'react-native-paper';
import Stats from "./Components/Stats";
import axios from "axios";
import { useEffect, useState } from 'react';


const TeacherData = ({navigation})=> {
    const onButtonToggle = () => {
       navigation.navigate('Profile');
    }
  
        const deletefunctionality = async (id) => {
            console.log('hello' , id)
                   try {
                       await axios.post("https://localhost:44323/api/RemoveTeacher", 
                           {
                               ids : [id]
                           }
                       )
                       .then((responce) => {
                       if (responce.data === "Success"){
           
                           console.log('Removed' , id)
           
                       }
                       else{
                           console.log('remove fail' , id)
                       }
                   })
                   } 
                   
                   catch (error) {
                       console.error(error)
                   }
    
}// Implement delete of data
    const editfunctionality = () => {}    // Implement edit of data



    const [teachers, setTeachers] = useState([["hello"],["world"]]);
 


    useEffect( () =>{

        const updateData = async () =>{

            try {
                await axios.get("https://localhost:44323/api/GetTeachers",)
                .then((responce) => {
      
                    setTeachers(responce.data)
            })
            } 
            catch (error) {
                console.error(error)
            }
    
        }
        
        updateData();
        
    },[])







    const actions = (id) => {
        return (
            <View style={{flexDirection:'row'}}>
                <IconButton
    icon={require('./Images/trash.png')}
    size={20}
    mode="default"
    onPress={()=>{deletefunctionality(id)}}
  />
  <IconButton
  icon={require('./Images/edit.png')}
  size={20}
  mode="default"
  onPress={()=>{editfunctionality}}
/>
</View>
        );
    }
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
    <Stats number={33} description={"Total teachers"}/>
    <Stats number={7} description={"Total subjects"}/>
     </View>
     <View style={style.data}>
       <View> 
       <Text style={{textAlign: "center" , marginTop: 20 , fontWeight: "bold" , fontSize: 25}}> Teachers </Text>
         </View>
        <ScrollView style={{padding:10}}>
        {teachers.map((teacher , index) =>{

        return <List.Section style={{flexDirection:'row', justifyContent:'space-between', backgroundColor:'#fffcf1' ,
        borderRadius:15}}>
        <List.Item style={style.list} title={teacher[1]} description={teacher[4]}> </List.Item>
        <IconButton
    icon={require('./Images/trash.png')}
    size={20}
    mode="default"
    onPress = {()=>{deletefunctionality(teacher[0])}}
  />
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

export default TeacherData;