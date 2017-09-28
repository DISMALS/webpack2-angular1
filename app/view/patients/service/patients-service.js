module.exports = (ngMold) => {
    ngMold.factory('patientsService', ['Http', '$cookies',
        (Http, $cookies) => {
            let http = new Http();

            let _patients = () => {
                return http.get('./app/config/data/patient.json', { isMask: true });
            }

            return {
                patients: _patients
            }
        }
    ]).name;
};