import PopupWithForm from './PopupWithForm';
export default function EditAvatarPopup({ isOpen, onClose}) {

    return (
        <PopupWithForm
          title="Обновить аватар"
          name="change-avatar"
          isOpen={isOpen}
          onClose={onClose}
        >
      
            <input
              id="avatar-input"
              type="url"
              name="avatar"
              className="popup__input"
              placeholder="Ссылка на аватар"
              required
            /> 

            <span id="avatar-input-error" className="popup__input-error"></span>

        </PopupWithForm>
      );
}