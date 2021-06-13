import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export default function getAuthUsername(){
    firebase.auth().currentUser().email;
}