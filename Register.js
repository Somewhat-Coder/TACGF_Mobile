import { StyleSheet , View , Text , Image , ScrollView , SafeAreaView , TouchableOpacity,Button} from "react-native";
import { TextInput , RadioButton , HelperText} from 'react-native-paper';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { useState } from "react";
import CheckBox from "./Components/CheckBox";
import axios from "axios";

const Register = ({navigation}) => {
    const [checked, setChecked] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [gender, setGender] = useState('');
    const [mode, setMode] = useState('');
    const [hr, setHr] = useState('');

    const [maths, setMaths] = useState(false);
    const [addmaths, setAddmaths] = useState(false);
    const [biology, setBiology] = useState(false);
    const [science, setScience] = useState(false);
    const [computer, setComputer] = useState(false);
    const [history, setHistory] = useState(false);
    const [geography, setGeography] = useState(false);

    const [budget , setBudget] = useState('');
    const [emailerror , setEmailerror] = useState('');
    const [contacterror , setContacterror] = useState('');
    const [budgeterror , setBudgeterror] = useState('');
    const [error, setError] = useState('');

    
    const homeHandler = () => {
       navigation.navigate('Home');
    }
    const submitHandler = async () => {     


        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailerror('Invalid Email');
        }
        else {
            setEmailerror('');
        }
        if (contact.length !== 11) {
            setContacterror('Invalid number');
        }
        else {
            setContacterror('');
        }
        if (budget <= 0) {
            setBudgeterror('Invalid number');
        }
        else {
            setBudgeterror('');
        }
        if (name == '' && email == '' && contact == '' && gender == '' && mode == ''
         && hr == '' && budget == '' ) {                                                  // No checkbox validation
            setError("Please complete the form");
        }
        else {

            var subjects = [];

            if (maths){
                subjects.push("Maths");
            }
            if (addmaths){
                subjects.push("Add Maths");
            }
            if (biology){
                subjects.push("Biology");
            }
            if (computer){
                subjects.push("Computer Science");
            }
            if (history){
                subjects.push("History");
            }
            if (geography){
                subjects.push("Geography");
            }


            const data = {
                fullName : name,
                gender : gender,
                phoneNumber : contact,
                mode : mode,
                hours : parseInt(hr),
                courses : subjects,
                expFees : parseInt(budget)
            }
    
            try {
                    await axios.post("https://localhost:44323/api/RegisterStudent", 
                        data
                    )
                .then((responce) => {
                    if (responce.data === "Success"){
                        
                        navigation.navigate("Submitted", {nname : name})
    
                    }
                    else{
                        // setSubmitResponce("A technical issue has been occured")
                        // setSubmitStatus("Submission Failed")
                    }
                })
                } catch (error) {
                    console.error(error)
            }
            
        }

        
    }
    return (
        <View style = {style.container}>
            <View style={{flexDirection:'row' , justifyContent:'space-between', marginTop:30 , padding:20}}>
            <TouchableOpacity
        onPress={homeHandler}
        style={style.roundButton1}>
        <Image 
  source={require('./Images/circleleft.png')}  
  style={{width: 50, height: 50 , margin: "auto"}} 
/>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={submitHandler}
        style={style.roundButton1}>
        <Image 
  source={require('./Images/circleright.png')}  
  style={{width: 50, height: 50 , margin: "auto"}} 
/>
      </TouchableOpacity>
            </View>

        <View style = {style.mainpic}>
       
        <Image 
  source={require('./Images/happyguy.png')}  
  style={{width: 300, height: 300 , margin: "auto"}} 
/>
          </View>
          <View style={style.rform}>
            <Text style={{textAlign: "center" , marginTop: 20 , fontWeight: "bold" , fontSize: 25}}> Welcome Students! </Text>
            <Text style={{textAlign: "center"}}> Ready to ace all your subjects? </Text>
            
            <ScrollView style={{backgroundColor:'#ffd656', marginTop:10 , padding:10}}>
                <SafeAreaView>
                <Text style={{fontWeight: "bold" , fontSize: 15}}> Personal Info </Text>
                <View style={{padding:20}}>
                <TextInput
      label="Name"
      mode = 'outlined'
      selectionColor="black"
      value={name}
      onChangeText = {name => setName(name)}
      placeholder=""
      outlineColor="black"
      activeOutlineColor="black"
      style={style.text}
    />

    <TextInput
      label="Email"
      mode = 'outlined'
      selectionColor="black"
      value={email}
      onChangeText = {email => setEmail(email)}
      placeholder=""
      outlineColor="black"
      activeOutlineColor="black"
      style={style.text}
    />
    {emailerror && <HelperText type="error"> {emailerror} </HelperText>}
    <TextInput
      label="Contact"
      mode = 'outlined'
      selectionColor="black"
      value={contact}
      onChangeText = {contact => setContact(contact)}
      placeholder=""
      outlineColor="black"
      activeOutlineColor="black"
      style={style.text}
    />
     {contacterror && <HelperText type="error"> {contacterror} </HelperText>}
    <Text style={{marginTop:10}}> Gender: </Text>
    <RadioButton.Group>
        <View style={{flexDirection:"row"}}>
            <RadioButton color="black" value="female" status={gender == 'Female' ? 'checked' : 'unchecked'} onPress={()=>setGender('Female')}/>
            <Text style={{padding:7}}> Female </Text>
        </View>
        <View style={{flexDirection:"row"}}>
            <RadioButton color="black" value="male" status={gender == 'Male' ? 'checked' : 'unchecked'} onPress={()=>setGender('Male')}/>
            <Text style={{padding:7}}> Male </Text>
        </View>
        <View style={{flexDirection:"row"}}>
            <RadioButton color="black" value="other" status={gender == 'Other' ? 'checked' : 'unchecked'} onPress={()=>setGender('Other')}/>
            <Text style={{padding:7}}> Other </Text>
        </View>
    </RadioButton.Group>

    </View>
                <Text style={{fontWeight: "bold" , fontSize: 15}}> Tuition Details </Text>
                <View style={{padding:20}}>
                <Text style={{fontWeight: "bold"}}> Mode: </Text>
    <RadioButton.Group>
        <View style={{flexDirection:"row"}}>
            <RadioButton value="home tuition" color="black" status={mode == 'Home Tuition' ? 'checked' : 'unchecked'} onPress={()=>setMode('Home Tuition')}/>
            <Text style={{padding:7}}> Home Tuition </Text>
        </View>
        <View style={{flexDirection:"row"}}>
            <RadioButton value="coaching center" color="black" status={mode == 'Coaching Center' ? 'checked' : 'unchecked'} onPress={()=>setMode('Coaching Center')}/>
            <Text style={{padding:7}}> Coaching center </Text>
        </View>
        <View style={{flexDirection:"row" }}>
            <RadioButton value="online" color="black" status={mode == 'Online' ? 'checked' : 'unchecked'} onPress={()=>setMode('Online')}/>
            <Text style={{padding:7}}> Online </Text>
        </View>
    </RadioButton.Group>


    <Text style={{fontWeight: "bold"}}> Hours per day: </Text>
    <RadioButton.Group>
        <View style={{flexDirection:"row"}}>
            <RadioButton value="1" color="black" status={hr == '1' ? 'checked' : 'unchecked'} onPress={()=>setHr('1')}/>
            <Text style={{padding:7}}> 1 </Text>
        </View>
        <View style={{flexDirection:"row" }}>
            <RadioButton value="2" color="black" status={hr == '2' ? 'checked' : 'unchecked'} onPress={()=>setHr('2')}/>
            <Text style={{padding:7}}> 2 </Text>
        </View>
        <View style={{flexDirection:"row"}}>
            <RadioButton value="3" color="black" status={hr == '3' ? 'checked' : 'unchecked'} onPress={()=>setHr('3')}/>
            <Text style={{padding:7}}> 3 </Text>
        </View>
        <View style={{flexDirection:"row"}}>
            <RadioButton value="4" color="black" status={hr == '4' ? 'checked' : 'unchecked'} onPress={()=>setHr('4')}/>
            <Text style={{padding:7}}> 4 </Text>
        </View>
    </RadioButton.Group>
                </View>
                <Text style={{fontWeight: "bold" , fontSize: 15}}> Subjects </Text>
                <View style={{padding:20}}>
                <CheckBox label="Maths" status={maths ? "checked" : "unchecked"} onPress={()=>{setMaths(!maths)}} />
                <CheckBox label="Add Maths" status={addmaths ? "checked" : "unchecked"} onPress={()=>{setAddmaths(!addmaths)}} />
                <CheckBox label="Biology" status={biology ? "checked" : "unchecked"} onPress={()=>{setBiology(!biology)}} />
                <CheckBox label="Science" status={science ? "checked" : "unchecked"} onPress={()=>{setScience(!science)}} />
                <CheckBox label="Computer Science" status={computer ? "checked" : "unchecked"} onPress={()=>{setComputer(!computer)}} />
                <CheckBox label="History" status={history ? "checked" : "unchecked"} onPress={()=>{setHistory(!history)}} />
                <CheckBox label="Geography" status={geography ? "checked" : "unchecked"} onPress={()=>{setGeography(!geography)}} />
  
                </View>

                <Text style={{fontWeight: "bold" , fontSize: 15}}> Your Budget </Text>
                <View style={{padding:20}}>
                <TextInput
      label="Budget"
      mode = 'outlined'
      selectionColor="black"
      value={budget}
      onChangeText = {budget => setBudget(budget)}
      placeholder=""
      outlineColor="black"
      activeOutlineColor="black"
      style={style.ltext}
    />
      {budgeterror && <HelperText type="error"> {budgeterror} </HelperText>}
      {error && <HelperText type="error"> {error} </HelperText>}
    </View>
   
                </SafeAreaView>
         
            </ScrollView>
            
            <View>

            </View>
          </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fffcf1",
    },
    mainpic : {
        backgroundColor: "#fffcf1",
        justifyContent: 'center',
        alignItems: 'center',
    },
    rform : {
        backgroundColor: "#ffd656",
        flex: 1,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        marginLeft: 15,
        marginRight: 15,
        textAlign: "center"
    },
    title: {
      fontSize: 12,
      color: "#000",
      height: "300px",
      width: "300px"
   },
   text: {
    backgroundColor:'#ffd656',
    fontSize: 14,
    width: 300,
    padding: 0,
    height: 40,
    marginBottom:10
   },
   ltext: {
    backgroundColor:'#ffd656',
    fontSize: 14,
    width: 300,
    padding: 0,
    height: 40,
    marginBottom:30,
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
})


export default Register;