import MenuItem from "./MenuItem"
import { IconAdjustments, IconBell, IconHome, IconLogout } from "../icons"
import Logo from "./Logo"

export default function SideMenu() {
    return (
        <aside className="
        flex flex-col bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-200
        ">
            
            <div className="
            h-20 w-20 bg-gradient-to-r from-indigo-500 to-purple-800 flex flex-col items-center justify-center
            ">
                <Logo />
            </div>

            <ul className="
            flex-grow
            ">
                <MenuItem url="/" text="Início" icon={IconHome} />
                <MenuItem url="/ajustes" text="Ajustes" icon={IconAdjustments} />
                <MenuItem url="/notificacoes" text="Notificações" icon={IconBell} />
            </ul>

            <ul className="
            
            ">
                <MenuItem onClick={(ev) => console.log('logout')}
                text="Sair"
                icon={IconLogout}
                className={`
                text-red-600 dark:text-red-400 hover:text-white dark:hover:text-white
                hover:bg-red-400
                `} />
            </ul>
            
        </aside>
    )
}