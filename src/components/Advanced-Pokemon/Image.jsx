export default function Image({image, moves, className}){
    return(
        <div>
            <div>
<img
className={className} 
src={image}/>
</div>


<div>

<p>{moves}</p>

</div>



</div>
    )
}