const images = [
    'images/anasayfafoto.jpg',
    'images/resim2.jpg',
    'images/anasayfafoto.jpg',
    'images/arkaplan.png',
    'images/arkaplan.png',
    'images/arkaplan.png',

];


let mainimg = document.querySelector(".slider_img")
let sag_ok = document.querySelector(".right")
let sol_ok = document.querySelector(".left")

let imgsayac = 0;
let resimslider


sag_ok.addEventListener("click", function () {
    clearInterval(resimslider);
    if (imgsayac < images.length - 1) {

        imgsayac += 1;
        mainimg.src = images[imgsayac];
    }
    else {
        imgsayac = 0;
        mainimg.src = images[imgsayac];
    }
    slideinterval();
})


sol_ok.addEventListener("click", function () {
    clearInterval(resimslider);
    if (imgsayac > 0) {

        imgsayac -= 1;
        mainimg.src = images[imgsayac];
    }
    else {
        imgsayac = images.length - 1;
        mainimg.src = images[imgsayac];
    }
    slideinterval();

})


function slideinterval() {
    resimslider = setInterval(function () {

        if (imgsayac < images.length - 1) {
            imgsayac += 1;
            mainimg.src = images[imgsayac];
        }
        else {
            imgsayac = 0;
            mainimg.src = images[imgsayac];
        }


    }, 5000)
}

slideinterval();