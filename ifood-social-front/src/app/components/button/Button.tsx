import { Button as PrimeButton } from 'primereact/button';
import styles from './button.module.css';

export interface IButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    btnStyle?: "btnPrimary" | "btnSecondary";
    icon?: string;
    size?: "small" | "large" | undefined;
}

export function Button (props: IButtonProps) {
    const btnStyle = props.btnStyle ? styles[props.btnStyle] : styles.btnPrimary;
    const size = props.size ? props.size : undefined;

    return (
        <PrimeButton
        onClick={props.onClick}
        type={props.type}
        className={`${styles.btn} ${btnStyle}`}
        icon={props.icon}
        size={size}>
        {props.children}
        </PrimeButton>
    );
}
