import React, {useState,useEffect} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ImagePopup from './components/ImagePopup';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import AddPlacePopup from './components/AddPlacePopup';
import ConfirmDeleteCardPopup from './components/ConfirmDeleteCardPopup';
import api from './utils/Api';

function App() {
const [isEditProfilePopupOpen,setEditProfilePopupOpen]= useState(false);
const [isEditAvatarPopupOpen,setEditAvatarPopupOpen]= useState(false);
const [isAddPlacePopupOpen,setAddPlacePopupOpen]= useState(false);
const [isImagePopupOpen, setImagePopupOpen] = useState(false);
const [isConfirmDeleteCardPopupOpen, setConfirmDeleteCardPopupOpen] = useState(false);
const [selectedCard, setSelectedCard] = useState({});
const [userName,setUserName]=useState('');
const [userDescription,setUserDescription]=useState('');
const [userAvatar,setUserAvatar]=useState('');
const [cards,setCards]=useState([]);
useEffect(()=>{
    api.getUserInfo()
    .then((user)=>{
        setUserName(user.name);
        setUserAvatar(user.avatar);
        setUserDescription(user.about);
        
    })
    .catch((err)=>{
        console.log(err);
    })
})
useEffect(()=>{
    api.getInitialsCards()
    .then((cards)=>{
        setCards(cards);
        
    })
    
    .catch((err)=>{
        console.log(err+' карточки');
    })
},[])
function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true);
}
function handleEditProfileClick(){
    setEditProfilePopupOpen(true);
}
function handleAddPlaceClick(){
    setAddPlacePopupOpen(true);
}
function closeAllPopups(callback=null){
    if(callback){
        callback(false);
    }
}

function handleCardClick(card){
    setImagePopupOpen(true);
    setSelectedCard(card);
}


  return (
  <>
   <Header />
   <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups.bind(null, setEditAvatarPopupOpen)}
        
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups.bind(null, setEditProfilePopupOpen)}
        
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups.bind(null, setAddPlacePopupOpen)}
         
        />

        <ConfirmDeleteCardPopup
          isOpen={isConfirmDeleteCardPopupOpen}
          onClose={closeAllPopups.bind(null, setConfirmDeleteCardPopupOpen)}
        
        />
    <ImagePopup
    card={selectedCard}
    isOpen={isImagePopupOpen}
    onClose={closeAllPopups.bind(null,setImagePopupOpen)}
    />
   <Main 
   onAddPlace={handleAddPlaceClick}
   onEditProfile={handleEditProfileClick}
   onEditAvatar={handleEditAvatarClick}
   
   userName={userName}
   userDescription={userDescription}
   userAvatar={userAvatar}
   onCardClick={handleCardClick}
   cards={cards}
   />
   <Footer />   {console.log(cards)}
   </>
   );
}

export default App;
