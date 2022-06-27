import route from 'next/router'
import { createContext, useEffect, useState } from 'react'
import User from '../../model/User'
import firebase from '../firebase/config'
import Cookies from 'js-cookie'

interface AuthContextProps {
    user?: User
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function normalUser(userFirebase: firebase.User): Promise<User> {
    const token = await userFirebase.getIdToken()
    return {
        uid: userFirebase.uid,
        name: userFirebase.displayName,
        email: userFirebase.email,
        token,
        provider: userFirebase.providerData[0].providerId,
        imageUrl: userFirebase.photoURL
    }
}

function manageCookie(signed: boolean) {
    if(signed) {
        Cookies.set('admin-template-auth', signed, {
            expires: 7
        })
    } else {
        Cookies.remove('admin-template-auth')
    }
}

export function AuthProvider(props) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>(null)

    async function sessionConfig(userFirebase) {
        if(userFirebase?.email) {
            const user = await normalUser(userFirebase)
            setUser(user)
            manageCookie(true)
            setLoading(false)
            return user.email
        } else {
            setUser(null)
            manageCookie(false)
            setLoading(false)
            return false
        }
    }

    async function loginGoogle() {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            sessionConfig(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function logout() {
        try {
            setLoading(true)
            await firebase.auth().signOut()
            await sessionConfig(null)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        if(Cookies.remove('admin-template-auth')) {
            const cancel = firebase.auth().onIdTokenChanged(sessionConfig)
            return () => cancel()
        }
    }, [])

    return(
        <AuthContext.Provider value={{
            user,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext