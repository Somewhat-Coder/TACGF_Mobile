import { useEffect, useState } from 'react';
import { View , StyleSheet} from 'react-native';
import { TextInput ,Button, HelperText, Provider , Portal , Dialog} from 'react-native-paper';
import axios from "axios";



const ChangePassword = (props) => {
  const [password, setpassword] = useState('');
  const [cpassword , setcpassword] = useState('');
  const [error,seterror] = useState('');







  const submitHandler = async () => {
    if (password !== cpassword) {
        seterror('Passwords do not match');
    }
    else {
      

      try {
        await axios.post("https://localhost:44323/api/UpdatePassword",
        {
            password : password
        }
        )
        .then((responce) => {
        
            if (responce.data === "Success"){
              props.setvisible()
            }

            else{
              seterror('An error occured');
            }
    })
    } 
    catch (error) {
        console.error(error)
    }



    }
  }






  useEffect(()=>{console.log(error,password,cpassword)},[error,password,cpassword])
    return (
      <Provider>
      <View>
        <Portal>
          <Dialog style={{backgroundColor:'#fffcf1'}} visible={props.visible}>
            <Dialog.Title>Change Password</Dialog.Title>
            <Dialog.Content>
            <TextInput
      label="Password"
      mode = 'outlined'
      selectionColor="black"
      secureTextEntry={true}
      value={password}
      onChangeText= {password => setpassword(password)}
      placeholder=""
      outlineColor="black"
      activeOutlineColor="black"
      style={style.text}
    />
        <TextInput
      label="Confirm Password"
      mode = 'outlined'
      selectionColor="black"
      secureTextEntry={true}
      value={cpassword}
      onChangeText = {cpassword => setcpassword(cpassword)}
      placeholder=""
      outlineColor="black"
      activeOutlineColor="black"
      style={style.text}
    />
    {error && <HelperText type='error'>  {error} </HelperText>}
            </Dialog.Content>
           <View style={{flexDirection:'row', justifyContent:'center', margin:10}}>
            <Button onPress={()=>{props.setvisible()}} mode="contained" textColor="black" style={style.bstyle}> Back </Button>
    <Button onPress={()=>{submitHandler()}} mode="contained" textColor="black" style={style.bstyle}> Submit </Button>
          </View>
          </Dialog>
        </Portal>
      </View>
    </Provider>

    //     <View style={{padding:20, justifyContent:'center', alignItems:'center'}}>
   
    //  <TextInput
    //   label="Confirm Password"
    //   mode = 'outlined'
    //   selectionColor="black"
    //   secureTextEntry={true}
    //   value={cpassword}
    //   onChangeText = {cpassword => setcpassword(cpassword)}
    //   placeholder=""
    //   outlineColor="black"
    //   activeOutlineColor="black"
    //   style={style.text}
    // />
    // {error && <HelperText type='error'>  {error} </HelperText>}
    // <View style={{flexDirection:'row'}}>
    // <Button onPress={()=>{navHandler}} mode="contained" textColor="black" style={style.bstyle}> Back </Button>
    // <Button onPress={()=>{submitHandler}} mode="contained" textColor="black" style={style.bstyle}> Submit </Button>
    // </View>
    //     </View>
     );
}

const style = StyleSheet.create({
   text: {
    backgroundColor:'#fffcf1',
    fontSize: 14,
    width: 300,
    padding: 0,
    height: 40,
    margin:10
   },
   bstyle: {
    backgroundColor: '#ffd656',
    textColor: 'black',
    margin: 10,
    margin:10
}
})
export default ChangePassword