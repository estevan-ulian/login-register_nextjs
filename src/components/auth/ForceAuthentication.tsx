import Head from "next/head"
import Image from "next/image"
import router from 'next/router'
import useAuth from "../../data/hook/useAuth"

const ForceAuthentication = (props) => {

    const {user, loading} = useAuth()

    function renderContent() {
        return (
            <>
                <Head>
                    <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            if(!document.cookie?.includes('admin-template-auth')) {
                                window.location.href = '/autenticacao'
                            }  
                        `
                    }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderLoading() {          
        return (
            <div className="flex justify-center items-center h-screen">
                <Image src='http://localhost:3000/images/loading.jpg' width='100' height='100' alt='loading' />
            </div>
        )
    }

    if(!loading && user?.email) {
        return renderContent()
    } else if (loading) {
        return renderLoading();
    } else {
        router.push('/autenticacao')
        return null;
    }
}

export default ForceAuthentication