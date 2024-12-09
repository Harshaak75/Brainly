
interface ButtonUi {
    sizeStyles: "lg" | "sm" | "md";
    varient: "primary" | "secondary";
    text: string;
    icons?: React.ReactElement;
    onclose?: () => void;
    fullWidth?: boolean;
    loading?:boolean;
}

const sizeStyles = {
    "lg": "px-8 py-4 text-xl rounded-xl",
    "md": "px-4 py-2 text-md rounded-md",
    "sm": "px-2 py-1 text-sm rounded-sm",
}

const varienStyle = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600",
}

const btnstyle = "flex items-center justify-center ml-5"

function Button(props : ButtonUi){
    return <button disabled={props.loading} onClick={props.onclose} className={varienStyle[props.varient] + " " + sizeStyles[props.sizeStyles] + " " + btnstyle + " " + `${props.fullWidth ? "w-full" : ""} ${props.loading ? "opacity-45 cursor-not-allowed" : ""}`}><div className="mr-2 flex items-center justify-center">{props.icons}</div>  {props.text}</button>
}

export default Button;