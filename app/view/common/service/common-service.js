module.exports = ['Http','$cookies',
        (Http,$cookies) => {
            const http = new Http();
            
            let _test = () => {
                return http.get('./app/config/data/menu.json');
            }
            return {
                test: _test
            } 
        }
    ];