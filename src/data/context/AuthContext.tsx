import route from 'next/router'
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import firebase from '../firebase/config'
import User from '../../model/User'

interface AuthContextProps {
    user?: User
    loading?: boolean
    register?: (email: string, senha: string) => Promise<void>
    login?: (email: string, senha: string) => Promise<void>
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

    async function login(email, password) {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, password)
            
            await sessionConfig(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function register(email, password) {
        try {
            setLoading(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, password)
            
            await sessionConfig(resp.user)
            route.push('/')
        } finally {
            setLoading(false)
        }
    }

    async function loginGoogle() {
        try {
            setLoading(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            
            await sessionConfig(resp.user)
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
        if(Cookies.get('admin-template-auth')) {
            const cancel = firebase.auth().onIdTokenChanged(sessionConfig)
            return () => cancel()
        } else {
            setLoading(false);
        }
    }, [])

    return(
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            loginGoogle,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext