export default function Card( {card,onCardClick}){
    return(    
  <div class="card" >
    <img src={card.link} alt={card.name} className="card__photo" onClick={onCardClick.bind(null,card)} />
        
        <button
          className="card__delete"
         />
     
    <div className="card__text">
        <h3 className="card__title">{card.name}</h3>
      <div className="card__likearea">
            <button className="card__like"></button>
          <p className="card__counter">{card.likes.length}</p>    
      </div>
    </div>
</div>
)
}