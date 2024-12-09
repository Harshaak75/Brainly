
interface inputtype {
    placeholder : string;
    reff?: any;
}

export function Input({placeholder, reff} : inputtype){
    return <div className="">
        <input ref={reff} type="text" placeholder={placeholder}  className="border p-2 rounded-lg w-[100%]"/>
    </div>
     
 
}