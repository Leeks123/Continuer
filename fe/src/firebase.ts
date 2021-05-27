import firebase from 'firebase/app';

import "firebase/analytics";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

import { firebaseConfig } from './config';

// setting
export let db:any;
export let storage:any;
export let storageRef:any;
let auth:any;
export const initFB = () => {
    // console.log('initFB');
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    storage = firebase.storage();
    storageRef = storage.ref();
    auth = firebase.auth();
}

// storage
export async function fbFileUpload(file: { name: string; }):Promise<string> {
    let uploadTask = await storageRef.child(`${auth.currentUser.uid}/${file.name}`).put(file);
    const url = await uploadTask.ref.getDownloadURL();
    return url as string;
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
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const result = await firebase.auth().signInWithPopup(googleAuthProvider);
    console.log('fbLogin',result);
    if(result.operationType === 'signIn') {
        const { displayName, email, uid } = result.user as firebase.User;
        db.collection('users').doc(uid).get().then((result:any) => {
            if(!result.exists) {
                db.collection('users').doc(uid).set({
                    name: displayName,
                    email: email,
                    habitListOrder: []
                }).then(() =>{
                    db.collection(`users/${auth.currentUser?.uid}/cards`).add({
                        uid: auth.currentUser.uid,
                        id: -1,
                        text: 'first Card, if you want to delete this card, swipe this!',
                        createdAt: 0
                    });
                }).then(() =>{
                    db.collection(`users/${auth.currentUser?.uid}/habits`).add({
                        uid: auth.currentUser.uid,
                        id: -1,
                        text: 'first Habit',
                        desc: 'sample Habit',
                        checklist: [-1]
                    });
                });
            }
        });
        
        return true;
    } else {
        return false;
    }
    
}
export async function fbLogOut() {
    const result = await firebase.auth().signOut();
    console.log('fblogout',result);
    return false;
}
export async function fbSignOut() {
    await firebase.auth().currentUser?.delete();
    return false;
}

// firestore
//// timeline page
export async function fbLoadInitialData() {
    const cardCollection = db.collection('users').doc(auth.currentUser.uid).collection('cards');
    const cards = await cardCollection
        .orderBy('createdAt','desc')
        .limit(10)
        .get();
    const ret = [];
    for(const doc of cards.docs){
        // console.log(doc.id, '=>', doc.data());
        let { id, text, createdAt, images } = doc.data();
        const obj = {
            id: id, 
            text: text, 
            createdAt: createdAt !== 0 ? createdAt.toDate().toString() : '0', 
            images
        };
        ret.push(obj);
    }
    return ret.reverse();
}
export async function fbLoadPageData(lastId:number) {
    const cardCollection = db.collection('users').doc(auth.currentUser.uid).collection('cards');
    const cards = await cardCollection
        .orderBy('id','desc')
        .startAfter(lastId)
        .limit(10)
        .get();
    const ret = [];
    console.log('loadpage',cards);
    for(const doc of cards.docs){
        // console.log(doc.id, '=>', doc.data());
        const { id, text, createdAt,images } = doc.data();
        ret.push({
            id,
            text,
            createdAt: createdAt !== 0 ? createdAt.toDate().toString() : '0',
            images
        });
    }
    return ret.reverse();
}
export async function fbLoadDataByDate(date:string) {
    const cardCollection = db.collection('users').doc(auth.currentUser.uid).collection('cards');
    const cards = await cardCollection
        .where('createdAt','>=',new Date(date))
        .orderBy('createdAt')
        .get();
    const ret = [];
    console.log('loadDate',cards);
    for(const doc of cards.docs){
        console.log(doc.id, '=>', doc.data());
        const { id, text, createdAt,images } = doc.data();
        ret.push({
            id,
            text,
            createdAt: createdAt !== 0 ? createdAt.toDate().toString() : '0',
            images
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
export async function fbAddCard(cardData:{
    text: string, imgUrls: string[] | null
  }) {
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
        text: cardData.text,
        id: (lastCard.id as number)+1,
        images: cardData.imgUrls
    }
    console.log('fb AddCard', data);
    newCard.set(data);
    return {
        ...data,
        createdAt: createdTime.toDate().toString()
    };
}

//// habitTracker page
export async function fbLoadInitiaHabits() {
    const habitCollection = db.collection('users').doc(auth.currentUser.uid).collection('habits');
    const habits = await habitCollection.get();
    const ret:any[] = [];
    for(const doc of habits.docs){
        console.log(doc.id, '=>', doc.data());
        let { id, title, desc, checklist } = doc.data();
        const obj = {
            id, title, desc, checklist
        };
        ret.push(obj);
    }
    return ret;
}
export async function fbLoadListOrder() {
    const userRef = await db.collection('users').doc(auth.currentUser.uid);
    let ret = await userRef.get('habitListOrder').then((doc:any) => {
        if (doc.exists) {
            return doc.data().habitListOrder;
        } else {
            return [];
        }
    });
    return ret;
}
export async function fbUpdateListOrder(order:number[]){
    db.collection('users').doc(auth.currentUser.uid).update({
        habitListOrder: order
    });
}
export async function fbAddHabit(habitData:{
    id: number,
    title:string, 
    desc:string,
    checklist: string[]
  }) {
    const habitCollection = db.collection('users').doc(auth.currentUser.uid).collection('habits');
    const newHabit = await habitCollection.doc();
    newHabit.set(habitData);
}
export async function fbUpdateHabit(habitData:{
    id: number,
    title:string, 
    desc:string,
  }) {
    const habitCollection = db.collection('users').doc(auth.currentUser.uid).collection('habits');
    const habitDocSnapshot = await habitCollection.where('id','==',habitData.id).get();
    const docID = await habitDocSnapshot.docs[0].id;
    habitCollection.doc(docID).update({
        title: habitData.title, desc: habitData.desc
    });
}
export async function fbUpdateChecklist(habitData:{
    id: number,
    code: string
  }) {
    const habitCollection = db.collection('users').doc(auth.currentUser.uid).collection('habits');
    const habitDocSnapshot = await habitCollection.where('id','==',habitData.id).get();
    const docID = await habitDocSnapshot.docs[0].id;
    const docChecklist = await habitDocSnapshot.docs[0].data().checklist;
    
    let updateList = [];
    if(docChecklist.includes(habitData.code)) {
        updateList = docChecklist.filter((v:string) => v !== habitData.code)
    } else {
        updateList = [...docChecklist, habitData.code]
    }
    habitCollection.doc(docID).update({
        checklist: updateList
    });
}
export async function fbDeleteHabit(habitId:number) {
    const data =  db.collection('users').doc(auth.currentUser.uid).collection('cards')
        .where('id','==',habitId)
        .get();
    console.log('fbdelete',data);
    data.forEach((doc:any) => {
        doc.ref.delete();
    });
}