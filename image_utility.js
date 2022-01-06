
var setupImageOnClick = function(targetImage) {
    var imageUrl = targetImage.src;
    var fullImageUrl = imageUrl;
    if (imageUrl.match("s\\d+-nd-v1")) {
        fullImageUrl = imageUrl.replace(new RegExp("s\\d+-nd-v1"), "s0-nd-v1");
    }
    if (imageUrl.match("=s.*-nd-v1")) {
        fullImageUrl = imageUrl.replace(new RegExp("=s.*-nd-v1"), "=s0-nd-v1");
    }
    targetImage.onclick = function() { window.open(fullImageUrl); }
}

var setupImageOnClickIfNeeded = function(targetImage) {
    if (!targetImage.hasAttribute("src")) {
        // empty image, add observer
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === "attributes" && mutation.attributeName === 'src') {
                    setupImageOnClick(mutation.target)
                }
            })
        });
        observer.observe(targetImage, {
            attributes: true
        })

    } else {
        setupImageOnClick(targetImage)
    }
}

var handleSingleImage = function() {
    var imageContainer = document.getElementById("image-container");
    var targetImage = imageContainer.getElementsByTagName("img")[0];
    setupImageOnClickIfNeeded(targetImage);
}

var handleMultipleImages = function() {
    var images = document.getElementsByTagName("ytd-backstage-image-renderer");
    for (var i = 0; i < images.length; i++) {
        var targetImage = images[i].getElementsByTagName("img")[0];
        setupImageOnClickIfNeeded(targetImage);
    }
}

if (document.getElementsByClassName("ytd-post-multi-image-renderer").length > 0) {
    // multiple images
    handleMultipleImages();
} else {
    // single image
    handleSingleImage();
}
