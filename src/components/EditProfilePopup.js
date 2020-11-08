import PopupWithForm from './PopupWithForm';
export default function EditProfilePopup({ isOpen, onClose }) {

    return (
        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          buttonName="Сохранить"
          isOpen={isOpen}
          onClose={onClose}
         
        >
          
            <input
              id="name-input"
              type="text"
              name="name"
              className="popup__input"
              placeholder="Ваше имя"
              required
              minLength="2"
              maxLength="40"
          
      
            />
            <span
              id="name-input-error"
              className="popup__input-error"
            ></span>
  
       
            <input
              id="about-input"
              type="text"
              name="about"
              className="popup__input"
              placeholder="О себе"
              required
              minLength="2"
              maxLength="200"
             
           
            />
            <span
              id="about-input-error"
              className="popup__input-error"
            ></span>
        </PopupWithForm>)
}