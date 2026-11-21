             //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       function _0x58ff(_0x419f3f,_0x444d3a){const _0x2c49d0=_0x2c49();return _0x58ff=function(_0x58ff2a,_0x11b122){_0x58ff2a=_0x58ff2a-0x1b0;let _0x303086=_0x2c49d0[_0x58ff2a];return _0x303086;},_0x58ff(_0x419f3f,_0x444d3a);}function _0x2c49(){const _0x2d7bc2=['location','hostname','6676703SbPAXy','none','145449rTUvLi','151115gTbesG','585880stXLvs','205988amIGQb','3iPJraU','904050xmbnFi','display','35zRiAbZ','10WgyCjU','30ZXXGEm','1025956MdmmOO'];_0x2c49=function(){return _0x2d7bc2;};return _0x2c49();}(function(_0x1cb164,_0x232a99){const _0x59ef5f=_0x58ff,_0x45c7bb=_0x1cb164();while(!![]){try{const _0x247a74=-parseInt(_0x59ef5f(0x1b0))/0x1+-parseInt(_0x59ef5f(0x1b3))/0x2+-parseInt(_0x59ef5f(0x1b4))/0x3*(parseInt(_0x59ef5f(0x1ba))/0x4)+-parseInt(_0x59ef5f(0x1b1))/0x5*(parseInt(_0x59ef5f(0x1b9))/0x6)+parseInt(_0x59ef5f(0x1b7))/0x7*(parseInt(_0x59ef5f(0x1b2))/0x8)+-parseInt(_0x59ef5f(0x1b5))/0x9+parseInt(_0x59ef5f(0x1b8))/0xa*(parseInt(_0x59ef5f(0x1bd))/0xb);if(_0x247a74===_0x232a99)break;else _0x45c7bb['push'](_0x45c7bb['shift']());}catch(_0x26c725){_0x45c7bb['push'](_0x45c7bb['shift']());}}}(_0x2c49,0x34e4b),(function(){const _0x163fcf=_0x58ff,_0x350c5c='jade-palmier-b2bff0.netlify.app';if(window[_0x163fcf(0x1bb)][_0x163fcf(0x1bc)]!==_0x350c5c){document['documentElement']['style'][_0x163fcf(0x1b6)]=_0x163fcf(0x1be);return;}}())); 
var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    if (selector.classList.contains("selector_open")){
        selector.classList.remove("selector_open")
    }else{
        selector.classList.add("selector_open")
    }
})

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown")
    })
})

var sex = "m"

document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    })
})

var upload = document.querySelector(".upload");

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {

    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    })

});

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown")
});

imageInput.addEventListener('change', (event) => {

    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");

    upload.removeAttribute("selected")

    var file = imageInput.files[0];
    var data = new FormData();
    data.append("image", file);

    fetch('	https://api.imgur.com/3/image' ,{
        method: 'POST',
        headers: {
            'Authorization': 'Client-ID 0e3e61ff21d1732'
        },
        body: data
    })
    .then(result => result.json())
    .then(response => {
        
        var url = response.data.link;
        upload.classList.remove("error_shown")
        upload.setAttribute("selected", url);
        upload.classList.add("upload_loaded");
        upload.classList.remove("upload_loading");
        upload.querySelector(".upload_uploaded").src = url;

    })

})

document.querySelector(".go").addEventListener('click', () => {

    var empty = [];

    var params = new URLSearchParams();

    params.set("sex", sex)
    if (!upload.hasAttribute("selected")){
        empty.push(upload);
        upload.classList.add("error_shown")
    }else{
        params.set("image", upload.getAttribute("selected"))
    }

    var birthday = "";
    var dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday = birthday + "." + element.value
        if (isEmpty(element.value)){
            dateEmpty = true;
        }
    })

    birthday = birthday.substring(1);

    if (dateEmpty){
        var dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    }else{
        params.set("birthday", birthday)
    }

    document.querySelectorAll(".input_holder").forEach((element) => {

        var input = element.querySelector(".input");

        if (isEmpty(input.value)){
            empty.push(element);
            element.classList.add("error_shown");
        }else{
            params.set(input.id, input.value)
        }

    })

    if (empty.length != 0){
        empty[0].scrollIntoView();
    }else{

        forwardToId(params);
    }

});

function isEmpty(value){

    let pattern = /^\s*$/
    return pattern.test(value);

}

function forwardToId(params){

    location.href = "id.html?" + params

}

var guide = document.querySelector(".guide_holder");
guide.addEventListener('click', () => {

    if (guide.classList.contains("unfolded")){
        guide.classList.remove("unfolded");
    }else{
        guide.classList.add("unfolded");
    }

})