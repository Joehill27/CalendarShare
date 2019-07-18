module.exports = {

    //Can't think of any other way to access local images...
    //To be replaced with better way and/or uploading images to database
    chooseUserImage (imageId) {
        switch(imageId) {
            case '1':
                return require('../defaultImages/userProfilePics/1.png');
            case '2':
                return require('../defaultImages/userProfilePics/2.png');
            case '3':
                return require('../defaultImages/userProfilePics/3.png');
            case '4':
                return require('../defaultImages/userProfilePics/4.png');
            case '5':
                return require('../defaultImages/userProfilePics/5.png');
            case '6':
                return require('../defaultImages/userProfilePics/6.png');
            case '7':
                return require('../defaultImages/userProfilePics/7.png');
            case '8':
                return require('../defaultImages/userProfilePics/8.png');
            case '9':
                return require('../defaultImages/userProfilePics/9.png');
            case '10':
                return require('../defaultImages/userProfilePics/10.png');
            case '11':
                return require('../defaultImages/userProfilePics/11.png');
            case '12':
                return require('../defaultImages/userProfilePics/12.png');
            case '13':
                return require('../defaultImages/userProfilePics/13.png');
            case '14':
                return require('../defaultImages/userProfilePics/14.png');
            case '15':
                return require('../defaultImages/userProfilePics/15.png');
            default:
                return require('../defaultImages/userProfilePics/1.png');
        }
    },

    chooseEventImage (imageId) {
        switch(imageId) {
            default:
                return require('../defaultImages/eventPics/2.jpg');
        }
    },

    chooseGroupImage (imageId) {
        switch(imageId) {
            default:
                return require('../defaultImages/groupProfilePics/1.jpg');
        }
    }

}

