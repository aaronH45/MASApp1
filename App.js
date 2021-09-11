import React, {useState, useEffect} from 'react'; 
import { SafeAreaView, Text, View, Button, StyleSheet, TextInput } from 'react-native'; 
import Slider from '@react-native-community/slider';
import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'
import firestore from '@react-native-firebase/firestore';
import SegmentedControlTab from "react-native-segmented-control-tab";

const YourApp = () => {   

  const [num, updateYourNumber] = useState("No Choice")
  const [value, setValue] = useState(0) 


  const [placeID, setPlaceID] = useState(null)
  const [place, setPlace] = useState(null)
  const [addName, onChangeAddName] = React.useState(null);
  const [addMoney, onChangeAddMoney] = React.useState('$$');
  const [addCusine, onChangeAddCusine] = React.useState('Mexican');

  const [priceTab, changePriceTab] = React.useState(1);
  const [cusineTab, changeCusineTab] = React.useState(1);


  const [priceSelectTab, changepriceSelectTab] = React.useState(1);
  const [cusineSelectTab, changecusineSelectTab] = React.useState(1);
  const [chooseMoney, onChangeChooseMoney] = React.useState('$$');
  const [chooseCusine, onChangeChooseCusine] = React.useState('Mexican');

  const [numSelect, setnumSelect] = React.useState(1);
  // const [number, onChangeNumber] = React.useState(null);


  const [newPlace,setNewPlace] = useState('')


  useEffect( async () =>    {try{
    // const palcesIDs = await firestore().collection('places').get().then( snapshot => {snapshot.forEach(doc => {setPlaceID(doc)})});

    const places = query(firestore().collection('places'), where("money", "==", "$"))
    console.log(places)
    // await firestore().collection('places').get().then(snapshot => 
    //   {snapshot.forEach(
    //     doc => {
    //             setPlace(doc.data())
    //             setPlaceID(doc.id)
    //             console.log(doc.data(), doc.id)
    //             }
    //   )}
    //   );


  } catch (e) {
    console.log(e)
  }
  }, [num])



  useEffect( async () =>    {try{
    // const palcesIDs = await firestore().collection('places').get().then( snapshot => {snapshot.forEach(doc => {setPlaceID(doc)})});

    const palcesCollection = await firestore().collection('places').get().then(snapshot => 
      {snapshot.forEach(
        doc => {
                setPlace(doc.data())
                setPlaceID(doc.id)
                // console.log(doc.data(), doc.id)
                }
      )}
      );


  } catch (e) {
    console.log(e)
  }
  }, [num])







  return (     
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>      
    <Text>
    Random Resturaunt Selector
    </Text>
    <Text>
    </Text>

    <Text>            
    Price of Food:
    </Text> 
      <SegmentedControlTab
    style={tabStyle.Seperator}
    values={["$", "$$", "$$$"]} 
    selectedIndex={priceSelectTab}
    onTabPress={priceSelectTab => {changepriceSelectTab(priceSelectTab);
                      onChangeChooseMoney(["$", "$$", "$$$"][priceSelectTab])} }
      />
    <Text>    
          
    </Text> 
    <Text>    
    Type of Food:
    </Text> 
      <SegmentedControlTab
        style={tabStyle.Seperator}
        values={["American", "Mexican", "Asian"]} 
        selectedIndex={cusineSelectTab}
        onTabPress={cusineSelectTab => {changecusineSelectTab(cusineSelectTab);
                          onChangeChooseCusine(["American", "Mexican", "Asian"][cusineSelectTab])} }
      />
    <Text>            
     
    </Text> 

    <Text>            
    Choose your preferences then hit choose!
    </Text>   

    <Button
    onPress = {() => { firestore()
                              .collection('places')
                              .where('money', '==', chooseMoney)
                              .where('type', '==', chooseCusine)
                              .get().then(
                                querySnapshot => {
                                                  const entries = querySnapshot.size
                                                  console.log(entries)
                                                  const randInt = Math.floor(Math.random() * entries + 1)
                                                  setnumSelect(randInt)
                                                  console.log(numSelect) } )
                        firestore()
                              .collection('places')
                              .where('money', '==', chooseMoney)
                              .where('type', '==', chooseCusine)
                              .limit(numSelect).get().then(
                                querySnapshot => {
                                  querySnapshot.forEach(
                                        doc => {
                                            setPlace(doc.data())
                                            setPlaceID(doc.id)
                                              }
                                )})
                        }
              }
    color="#383875"
    title="Choose!"
    />

    <Text>            
     You should eat at {placeID}!
    </Text> 


    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      }}
    />

    <Text>            

    </Text>       
    <Text>            
    Add a new Resturaunt!
    </Text>   

      <TextInput
        style={textBoxStyle.input}
        onChangeText={addName => onChangeAddName(addName)}
        value={addName}
        placeholder="Resturant Name"
      />  


      <SegmentedControlTab
        style={tabStyle.Seperator}
        values={["$", "$$", "$$$"]} 
        selectedIndex={priceTab}
        onTabPress={priceTab => {changePriceTab(priceTab);
                          onChangeAddMoney(["$", "$$", "$$$"][priceTab])} }
      />
    <Text>            
     
    </Text> 
      <SegmentedControlTab
        style={tabStyle.Seperator}
        values={["American", "Mexican", "Asian"]} 
        selectedIndex={cusineTab}
        onTabPress={cusineTab => {changeCusineTab(cusineTab);
                          onChangeAddCusine(["American", "Mexican", "Asian"][cusineTab])} }
      />
    <Text>            
     
    </Text> 

    <Button
    onPress = {() => { firestore()
                              .collection('places').doc(addName)
                              .set({
                                type: addCusine,
                                money: addMoney,
                              })
                              .then(() => {
                                console.log('User added!');
                              });
                              onChangeAddName('')
                              changePriceTab(1)
                              changeCusineTab(1)

                          }
              }
    color="#383875"
    title="Add Resturant"
    />
    </View>   
    ); 
};

const textBoxStyle = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const tabStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  tabViewText: {
    color: '#444444',
    fontWeight: 'bold',
    marginTop: 50,
    fontSize: 18,
  },
  titleText: {
    color: '#444444',
    padding: 20,
    fontSize: 14,
    fontWeight: '500',
  },
  headerText: {
    padding: 8,
    fontSize: 14,
    color: '#444444',
  },
  tabContent: {
    color: '#444444',
    fontSize: 18,
    margin: 24,
  },
  Seperator: {
    marginHorizontal: -10,
    alignSelf: 'stretch',
    borderTopWidth: 1,
    borderTopColor: '#888888',
    marginTop: 24,
  },
  tabStyle: {
    borderColor: '#D52C43',
  },
  activeTabStyle: {
    backgroundColor: '#D52C43',
  },
  tabTextStyle: {
    color: '#D52C43',
  },
})

  export default YourApp;