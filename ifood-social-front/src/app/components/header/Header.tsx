import Link from "next/link";
import { Avatar } from "primereact/avatar";

export function Header() {
    return (
        <header className="bg-orange-500 flex items-center justify-between px-16 py-4 text-white">
            <h1 className="text-4xl"><Link href={"/"}>IFoodSocial</Link></h1>
            <Avatar icon="pi pi-user" size="large"
            style={{ backgroundColor: "rgb(226 232 240)", color: 'black' }} shape="circle" />
        </header>
    );
}
