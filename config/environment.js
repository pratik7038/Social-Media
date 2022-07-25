
const development = {
    name : "development",
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db : 'codial_development',
    smtp : {
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:"pratikpatharkar123@gmail.com",
            pass:'aweigowanqpmqrfl'
        }
    },
    google_client_id: "523775786556-6s80kl4jcg3kvmptp6oe5iljh39ulmof.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_URL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codial'
}

const production = {
    name: "production"
}

module.exports = development;