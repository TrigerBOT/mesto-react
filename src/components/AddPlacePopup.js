import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({isOpen, onClose}){
  


    return (
        <PopupWithForm
          title="Новое место"
          name="addCard"
          isOpen={isOpen}
          onClose={onClose}
        >
         
            <input
              id="place-input"
              type="text"
              name="name"
              className="popup__input"
              placeholder="Название"
              minLength="1"
              maxLength="30"
              value=''
              
              required
            />
            <span id="place-input-error" className="popup__input-error"></span>
        
            <input
              id="url-input"
              type="url"
              name="link"
              className="popup__input"
              placeholder="Ссылка на картинку"
              required
            />
            <span id="url-input-error" className="popup__input-error"></span>
        
        </PopupWithForm>
      );
}