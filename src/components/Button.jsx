export default function Button(
    {className="px-3 py-3 bg-red"
    
    , name,
onClick}){
    return(
        <div>
            <button className={className}
            onClick={onClick}>
            {name}
            </button>

        </div>
    )
}