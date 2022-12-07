module.exports = {
    port: 4000,
    socketPort: 3601,
    appEndpoint: 'http://localhost:3600',
    apiEndpoint: 'http://localhost:3600',
    clientEndpoint: 'http://localhost:3000',
    jwt_secret: 'myS33!!creeeT',
    jwt_expiration_in_seconds: 36000,
    environment: 'dev',
    permissionLevels: {
        NORMAL_USER: 1,
        PAID_USER: 4,
        ADMIN: 2048,
    },
    MAILER_SENDER: 'eventmngsystem@gmail.com',
    MAILER_PASS:'123456789TT'
}
