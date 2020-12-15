import React, { useState, useEffect } from 'react';
import Header from './Header';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';
import api from '../utils/Api';

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isConfirmDeleteCardPopupOpen, setConfirmDeleteCardPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    React.useEffect(() => {
        api
            .getUserInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) =>
                console.log(`Ошибка при загрузке информации о пользователе: ${err}`)
            );
    }, []);
    useEffect(() => {
        api.getInitialsCards()
            .then((cards) => {
                setCards(cards);

            })

            .catch((err) => {
                console.log(err + ' карточки');
            })
    }, []);
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        });
    }
    function handleCardDelete(cardToDelete) {

        api.removeCard(cardToDelete._id)
            .then(() => setCards(cards.filter((card) => card !== cardToDelete)))

    }
    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }
    function handleUpdateUser(userData) {
        api
            .editUserInfo(userData)
            .then((newUser) => setCurrentUser(newUser))
            .catch((err) => `Ошибка ${err}`)
        closeAllPopups();
    }
    function handleUpdateAvatar(newAvatar) {
        api.editAvatar(newAvatar)
            .then((newUser) => setCurrentUser(newUser))
            .catch((err) => `Ошибка ${err}`)
        closeAllPopups();
    }
   
    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);

    }
    function closeAllPopups(callback = null) {
        if (callback) {
            callback(false);
        }
    }

    function handleCardClick(card) {
        setImagePopupOpen(true);
        setSelectedCard(card);
    }
    function handleAddPlace(card) {
        
        api
          .postCard(card)
          .then((newCard) => setCards([newCard, ...cards]))
          .catch((err) =>
            console.log(`Ошибка при добавлении новой карточки: ${err}`)
          )
        closeAllPopups();
      }


    return (
        <>
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups.bind(null, setEditAvatarPopupOpen)}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups.bind(null, setEditProfilePopupOpen)}
                    onUpdateUser={handleUpdateUser}

                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups.bind(null, setAddPlacePopupOpen)}
                    onAddPlace={handleAddPlace}
                />

                <ConfirmDeleteCardPopup
                    isOpen={isConfirmDeleteCardPopupOpen}
                    onClose={closeAllPopups.bind(null, setConfirmDeleteCardPopupOpen)}

                />
                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups.bind(null, setImagePopupOpen)}
                />
                <Main
                    onAddPlace={handleAddPlaceClick}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onLikeClick={handleCardLike}
                    onDeleteClick={handleCardDelete}
                    cards={cards}
                />
                <Footer />   {console.log(cards)}
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
