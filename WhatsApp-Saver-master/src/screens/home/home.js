import React, { Component } from 'react'
import { View ,Text,PermissionsAndroid,Image,FlatList, Platform,} from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
var RNFS = require('react-native-fs');

async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    console.log('permission')
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }



 class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          imageData: [],
          videoData:[],
     
          index: 0,
            };
        this.timoutId = null
        this.intervalId = null
    
      }
//.Statuses
componentDidMount =async()=>
{
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
      }
    
  await  this.fetchImage();
    };


    fetchImage = () => {
        RNFS.readDir('file:///storage/emulated/0/WhatsApp/Media/.Statuses/',) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
    console.log('GOT RESULT', result.length);
    try {
            for (let i = 0; i < result.length - 1; i++) {

            
                if(result[i].path.endsWith("mp4"))
                {
                    this.setState({
                        videoData: [...this.state.videoData,
                          result[i].path,      ]
                      })
                }
                else{
                    this.setState({
                        imageData: [...this.state.imageData,
                          result[i].path,      ]
                      })
                }
              
             console.log("Image Data is ...",result[i].path.endsWith("mp4")?'video':'image');
            //  this.props.navigation.navigate('PlayVideo',{imageData:this.state.imageData});
    
   
          }
          return (this.state.imageData);
         }
          catch (e) {
            console.log(e)
          }
       



    // stat the first file
//     return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  })
  .then((statResult) => {



 
  })
//   .then((contents) => {
//     // log the file contents
//     console.log(contents);
//   })
//   .catch((err) => {
//     console.log(err.message, err.code);
//   });
     
        // CameraRoll.getAlbums({
        //   first: 10,
        
        //   assetType:'Photos'
        // //   include:['file:///storage/emulated/0/WhatsApp/Media/.Statuses/'],
        // //   groupName:'Status',
        // //    groupTypes: "SavedPhotos",
        // //    assetType: 'Photos',
        //     // album:'.Statuses',
        
          
        // }).then((data) => {
       
        //     console.log('data...', data.edges)
        //   try {
        // //     for (let i = 0; i < data.edges.length - 1; i++) {
        // //         this.setState({
        // //           imageData: [...this.state.imageData,
        // //           data.edges[i].node.image.uri,      ]
        // //         })
        // //      console.log("Image Data is ...", this.state.imageData);
        // //     //  this.props.navigation.navigate('PlayVideo',{imageData:this.state.imageData});
    
    
        // //   }
        // }
        //   catch (e) {
        //     console.log(e)
        //   }
        // });
      }
      renderItem = ({ item }) => {
        console.log('item',item)
   
        return (
          <View style={{ justifyContent: 'space-around' }}>
            <Image
              style={{ height: 100, width: 80, backgroundColor: 'red' }}
              source={{ uri: 'file://'+item }}
            />
          </View>);
      }
    render() {


        
        return (
        <   View>
        <FlatList
              numColumns={3}
              data={this.state.imageData}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
              extraData={this.state.imageData}
              
            />
      
         <Image style={{flex:1,margin:5,padding:10,width:200}}
            source={{uri: 'file:///storage/emulated/0/WhatsApp/Media/.Statuses/38bb7521903b4b63bc0fc46049ebf57d.jpg' }}/>
            </View>
        )
    }
}

export default HomeScreen;
