import { IconMoon, IconSun } from "../icons"

interface ButtonChangeThemeProps {
    theme: string
    changeTheme: () => void
}

export default function ButtonChangeTheme(props: ButtonChangeThemeProps) {
    return props.theme === 'dark' ? (
        <div onClick={props.changeTheme} className={`
            hidden sm:flex items-center cursor-pointer justify-between
            bg-gradient-to-r from-yellow-300 to-yellow-600 
            w-14 lg:w-24 h-8 p-2 rounded-full
        `}>
            <div className={`
            flex items-center justify-center bg-white text-yellow-600
            w-6 h-6 rounded-full
        `}>
                {IconSun(4)}
            </div>
            <div className={`
            hidden lg:flex items-center text-white
        `}>
                <span className="text-sm">Light</span>
            </div>
        </div>
    ) : (
        <div onClick={props.changeTheme} className={`
            hidden sm:flex items-center cursor-pointer justify-between
            bg-gradient-to-r from-gray-500 to-gray-900 
            w-14 lg:w-24 h-8 p-2 rounded-full
        `}>
            <div className={`
            hidden lg:flex items-center text-gray-300
        `}>
                <span className="text-sm">Dark</span>
            </div>
            <div className={`
            flex items-center justify-center bg-black text-gray-300
            w-6 h-6 rounded-full
        `}>
                {IconMoon(4)}
            </div>
        </div>
    )
}
