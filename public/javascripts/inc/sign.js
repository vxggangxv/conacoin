$(function() {
    signpad();
});

function signpad() {
    var signpadModal = document.getElementById("signpadModal"),
    clearButtonList = signpadModal.querySelectorAll("[data-action=clear]"),
    signpadWrapper = document.getElementById("signature-pad"),
    // clearButton = signpadWrapper.querySelector("[data-action=clear]"),
    /*savePNGButton = signpadWrapper.querySelector("[data-action=save-png]"),
    saveSVGButton = signpadWrapper.querySelector("[data-action=save-svg]"),*/
    canvas = signpadWrapper.querySelector("canvas"),
    signaturePad;

    // Adjust canvas coordinate space taking into account pixel ratio,
    // to make it look crisp on mobile devices.
    // This also causes canvas to be cleared.
    function resizeCanvas() {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
    }

    window.onresize = resizeCanvas;
    resizeCanvas();

    signaturePad = new SignaturePad(canvas);

    // clearButton.addEventListener("click", function (event) {
    //     signaturePad.clear();
    // });
    [].forEach.call(clearButtonList, function(item) {
        item.addEventListener('click', signpadClear, false)
    });
    function signpadClear() {
        signaturePad.clear()
    }

    /*savePNGButton.addEventListener("click", function (event) {
        if (signaturePad.isEmpty()) {
            alert("Please provide signature first.");
        } else {
            window.open(signaturePad.toDataURL());
        }
    });

    saveSVGButton.addEventListener("click", function (event) {
        if (signaturePad.isEmpty()) {
            alert("Please provide signature first.");
        } else {
            window.open(signaturePad.toDataURL('image/svg+xml'));
        }
    });*/

}