
/*
    Single source of truth for user data.
*/

class User {

    constructor(userHasChanged) {

        // this is so we can notify interface
        // where our values change enough to need updating.
        this.hasChanged = userHasChanged;
        this.initialize();

    }

    initialize = () => {
        fetch('fetch_user.php')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.data = data;
                this.hasChanged();
            });
    }

    isLoggedIn = () => {
        if (this.data && this.data.logged_in) {
            return true;
        } else {
            return false;
        }
    }


    logout = () => {

        fetch('log_out.php')
            .then(response => response.json())
            .then(() => {
                this.initialize();
                this.hasChanged();
            });

    }

    getOrcidId = () => {
        if (this.data && this.data.orcid) {
            return this.data.orcid;
        } else {
            return "";
        }
    }

    getUserName = () => {
        if (this.data && this.data.user_name) {
            return this.data.user_name;
        } else {
            return "";
        }
    }

    getAssignments = () => {
<<<<<<< HEAD
        return this.data ? this.data.assignments : [];
=======
        return this.data.assignments;
>>>>>>> ec37c1a271fdb4e7e52703ce44d2e509035fa5ae
    }

}
export default User