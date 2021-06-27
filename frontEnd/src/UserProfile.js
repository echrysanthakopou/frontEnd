var UserProfile = (function() {
    var full_name = "";

    var getName = function() {
        return full_name;    // Or pull this from cookie/localStorage
    };

    var setName = function(name) {
        full_name = name;
        // Also set this in cookie/localStorage
    };

    return {
        getName: getName,
        setName: setName
    }

})();

//
// let temp2;
// temp2 = UserProfile.getName();

export default UserProfile;