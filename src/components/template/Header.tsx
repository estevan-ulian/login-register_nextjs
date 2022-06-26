import { useData } from "../../data/hook/useAppData"
import ButtonChangeTheme from "./ButtonChangeTheme"
import Title from "./Title"

interface HeaderProps {
    title: string
    subtitle: string
    children?: any
}

export default function Header(props: HeaderProps) {
    const { theme, changeTheme } = useData()

    return (
        <div className={`flex`}>
            <Title title={props.title} subtitle={props.subtitle} />
            <div className={`flex flex-grow justify-end`}>
                <ButtonChangeTheme theme={theme} changeTheme={changeTheme} />
            </div>
        </div>
    )
}