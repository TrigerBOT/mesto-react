 class Api{
    constructor(baseUrl,headers){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _fetchApi(url, method, additionalHeaders, body) {
        const fetchOptions = {
          method: method,
          headers: { ... this._headers, ...additionalHeaders },
        };
        if (body) {
          fetchOptions.body = JSON.stringify(body);
        }
    
        return fetch(`${this._baseUrl}${url}`, fetchOptions).then(res => {
            if (res.ok) {
              return res.json();
            }
    
            return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
          });
      }

      getInitialsCards() {
        return this._fetchApi('/cards', "GET");
      }
      postCard(card) {
        return this._fetchApi('/cards', 'POST', {'Content-Type': 'application/json'}, card);
      }
    
      removeCard(cardId) {
        return this._fetchApi(`/cards/${cardId}`, 'DELETE');
      }
    
      likeCard(cardId) {
        return this._fetchApi(`/cards/likes/${cardId}`, 'PUT');
      }
    
      unlikeCard(cardId) {
        return this._fetchApi(`/cards/likes/${cardId}`, 'DELETE');
      }
    
      //Операции с данными пользователя
      getUserInfo() {
        return this._fetchApi('/users/me', 'GET');
      }
    
      editUserInfo(info) {
        return this._fetchApi('/users/me', "PATCH", {'Content-Type': 'application/json'}, info);
      }
    
      editAvatar(link) {
        return this._fetchApi('/users/me/avatar', 'PATCH', {'Content-Type': 'application/json'},  link);
      }
    }
  
     const api= new Api("https://mesto.nomoreparties.co/v1/cohort-16", {
      authorization: "0100295d-ffab-4dd9-a2ae-64af071cc3da",
    });

    export default api
