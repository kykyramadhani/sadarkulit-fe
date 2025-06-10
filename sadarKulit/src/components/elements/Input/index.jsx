import Input from "./Input";
import Label from "./Label";

export default function InputForm ({name, inputFor, type, placeholder}) {
  return (
    <div className="mb-4">
        <Label name={name} inputFor={inputFor}/>      
        <Input name={inputFor} type={type} placeholder={placeholder}/>
    </div>
  );
}