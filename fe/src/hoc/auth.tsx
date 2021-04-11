/* eslint-disable import/no-anonymous-default-export */
import firebase from 'firebase';
import { useState } from 'react';
import { useLayoutEffect } from 'react';


//  @param specificComponent - 감쌀 컴포넌트
//  @param option            - null: 아무나 출인이 가능한 페이지, true: 로그인한 유저만 출입가능, false: 로그인한 유저는 접속불가능항 페이지
//  @returns {*}
export default function<P extends object>( SpecificComponent:React.ComponentType<P>, option:null|boolean) {
    function AuthenticationCheck( props: { history: string[]; } ) {
        const [visible,setVisible] = useState<boolean>(false);

        useLayoutEffect( () => {
            firebase.auth().onAuthStateChanged((user: any) => {
                if (!user) {
                    if( option ) {
                        props.history.push( '/' );
                    } else if (option === null ) {
                        setVisible(true);
                    }
                } else {
                    console.log('isAuth')
                    setVisible(option === null ? true : option );
                }
              });
            
        }, [props.history] );

        return (
            <>
                {visible && <SpecificComponent {...props as P}/>}
            </>
        )
    }
    return AuthenticationCheck
}