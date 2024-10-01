const Input = ({id,lableText,value,setState,placeholder,name}) => {
    return (
        <div>
            <label htmlFor={id}>{lableText}</label><br />
            <input type="text" id={id} onChange={(e) =>setState(e.target.value) } value={value} placeholder={placeholder} name={name}/>
        </div>
    )
}
export default Input;