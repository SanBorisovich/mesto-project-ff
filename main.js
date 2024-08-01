(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/cohort-magistr-2",headers:{authorization:"52c33c8e-9ff5-4713-8630-816491acbdcf","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}var n=document.querySelector("#card-template").content;function r(e,t,r,o,c){var a=n.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__image");a.querySelector(".card__title").textContent=e.name,i.src=e.link,i.alt=e.name,a.querySelector(".card__like-count").textContent=e.likes.length,a.dataset.id=e._id;var u=a.querySelector(".card__delete-button"),l=a.querySelector(".card__like-button");return e.owner._id!==t&&u.classList.add("card__delete-button-hidden"),e.likes.some((function(e){return e._id===t}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){o(a)})),u.addEventListener("click",(function(){r(a)})),i.addEventListener("click",(function(){c(e)})),a}function o(n){var r=n.querySelector(".card__like-button"),o=n.dataset.id,c=r.classList.contains("card__like-button_is-active");(function(n,r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:r?"DELETE":"PUT",headers:e.headers}).then(t)})(o,c).then((function(e){n.querySelector(".card__like-count").textContent=e.likes.length,c?r.classList.remove("card__like-button_is-active"):r.classList.add("card__like-button_is-active")})).catch((function(e){console.error("Ошибка: ".concat(e))}))}function c(n){var r,o=n.dataset.id;(r=o,fetch("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then(t)).then((function(){n.remove()})).catch((function(e){console.log("Ошибка: ".concat(e))}))}function a(e){e.classList.add("popup_is-opened","popup_is-animated"),document.addEventListener("keydown",u),e.addEventListener("click",l)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u),e.removeEventListener("click",l)}function u(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&i(t)}}function l(e){e.target.classList.contains("popup_is-opened")&&i(e.target)}var s={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},d=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},p=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},f=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){n.value="",d(e,n,t)})),p(n,r,t)};function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m=document.querySelector(".places__list"),y=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),h="",b=document.querySelector(".popup_type-avatar"),S=document.querySelector(".profile__image"),q=b.querySelector(".popup__form"),C=q.querySelector(".popup__input_type_url"),E=document.querySelector(".profile__edit-button"),L=document.querySelector(".popup_type_edit"),k=L.querySelector(".popup__form"),g=k.querySelector(".popup__input_type_name"),x=k.querySelector(".popup__input_type_description"),A=document.querySelector(".profile__add-button"),U=document.querySelector(".popup_type_new-card"),j=U.querySelector(".popup__form"),w=j.querySelector(".popup__input_type_card-name"),O=j.querySelector(".popup__input_type_url"),T=document.querySelector(".popup_type_image"),B=T.querySelector(".popup__image"),D=T.querySelector(".popup__caption");function P(e){a(T),B.src=e.link,B.alt=e.name,D.textContent=e.name}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,n,a=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];i.avatar,h=i._id,y.textContent=i.name,v.textContent=i.about,S.style.backgroundImage="url(".concat(i.avatar,")"),function(e,t){e.forEach((function(e){m.append(r(e,h,c,o,t))}))}(u,P)})).catch((function(e){console.log("Ошибка: ".concat(e))})),document.querySelectorAll(".popup").forEach((function(e){var t;(t=e).querySelector(".popup__close").addEventListener("click",(function(){return i(t)}))})),document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")})),S.addEventListener("click",(function(){a(b),f(b,s)})),E.addEventListener("click",(function(){f(L,s),g.value=y.textContent,x.value=v.textContent,a(L)})),A.addEventListener("click",(function(){j.reset(),a(U),f(U,s)})),k.addEventListener("submit",(function(n){var r;n.submitter.textContent="Сохранение...",n.preventDefault(),(r={name:g.value,about:x.value},fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify(r)}).then(t)).then((function(e){y.textContent=e.name,v.textContent=e.about,i(L)})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){n.submitter.textContent="Сохранить"}))})),j.addEventListener("submit",(function(n){n.submitter.textContent="Сохранение...",n.preventDefault();var a,u,l={name:w.value,link:O.value};(a=l.name,u=l.link,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a,link:u})}).then(t)).then((function(e){m.prepend(r(e,h,c,o,P)),i(U)})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){n.submitter.textContent="Сохранить"}))})),q.addEventListener("submit",(function(n){var r;n.submitter.textContent="Сохранение...",n.preventDefault(),(r={avatar:C.value},fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify(r)}).then(t)).then((function(e){S.style="background-image: url(".concat(e.avatar,")"),e.avatar,i(b)})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){n.submitter.textContent="Сохранить"}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(t,e)}))}(s)})();