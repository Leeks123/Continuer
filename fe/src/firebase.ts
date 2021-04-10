import firebase from 'firebase/app';

import "firebase/analytics";
import "firebase/storage";
import "firebase/firestore";

import { firebaseConfig } from './config';

// setting
export let db:any;
let auth:any;
export const initFB = () => {
    console.log('initFB');
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
}

// auth
export async function fbAuthentication():Promise<boolean> {
    const result = auth.currentUser;
    if(result){
        return true
    } else {
        return false;
    }
}

export async function fbLogIn() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(googleAuthProvider);
    console.log('fbLogin',result);
    if(result.operationType === 'signIn') {
        const { displayName, email, uid } = result.user as firebase.User;
        db.collection('users').doc(uid).get().then((result:any) => {
            if(!result.exists) {
                db.collection('users').doc(uid).set({
                    name: displayName,
                    email: email,
                }).then(() =>{
                    db.collection(`users/${auth.currentUser?.uid}/cards`).add({
                        uid: auth.currentUser.uid,
                        id: -1,
                        text: 'first Card, if you want to delete this card, swipe this!',
                        createdAt: 0
                    });
                })
            }
        });
        
        return true;
    } else {
        return false;
    }
    
}
export async function fbLogout() {
    firebase.auth().signOut();
}

// firestore
export async function fbLoadInitialData() {
    const cardCollection = db.collection('users').doc(auth.currentUser.uid).collection('cards');
    const cards = await cardCollection
        .orderBy('createdAt','asc')
        .limit(10)
        .get();
    const ret = [];
    for(const doc of cards.docs){
        console.log(doc.id, '=>', doc.data());
        const { id, text, createdAt } = doc.data();
        const obj = {
            id: id, text: text, createdAt: createdAt.toDate().toString()
        }
        ret.push(obj);
        console.log(id,text,createdAt,ret)
    }
    console.log('fbloadInit',ret)
    return ret;
}
export async function fbLoadPageData(lastId:number) {
    const cardCollection = db.collection('users').doc(auth.currentUser.uid).collection('cards');
    const cards = await cardCollection
        .orderBy('createdAt','desc')
        .startAfter('numId',lastId)
        .limit(10)
        .get();
    const ret = [];
    for(const doc of cards.docs){
        console.log(doc.id, '=>', doc.data());
        const { id, text, createdAt } = doc.data();
        ret.push({
            id,
            text,
            createdAt: createdAt.toDate().toString()
        });
    }
    return ret;
}
export async function fbDeleteCard(cardId:number) {
    const data = await  db.collection('users').doc(auth.currentUser.uid).collection('cards')
        .where('id','==',cardId)
        .get();
    console.log('fbdelete',data);
    data.forEach((doc:any) => {
        doc.ref.delete();
    });
}
export async function fbAddCard(cardText:string) {
    const cardCollection = db.collection('users').doc(auth.currentUser.uid).collection('cards');
    const cards = await cardCollection
        .orderBy('id','desc')
        .limit(1)
        .get();
    const lastCard = cards.docs[0].data();
    console.log('lastcard',lastCard);
    const newCard = cardCollection.doc();
    const createdTime = firebase.firestore.Timestamp.now();
    const data = {
        createdAt: createdTime,
        text: cardText,
        id: (lastCard.id as number)+1,
        image: null
    }
    newCard.set(data);
    return {
        ...data,
        createdAt: createdTime.toDate().toString()
    };
}

