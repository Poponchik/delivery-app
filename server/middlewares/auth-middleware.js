import tokenService from '../service/token-service.js'

// module.exports = function (req, res, next) {
export default function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        
        if (!authorizationHeader) {
            return next(res.status(500).json({ message: 'Create error1' }))
        }
        
        const accessToken = authorizationHeader
        if (!accessToken) {
            return next(res.status(500).json({ message: 'Create error2' }))
        }

        const userData = tokenService.validateAccessToken(accessToken)
        
        if (!userData) {
            return next(res.status(500).json({ message: 'Create error3' }))
        }

        req.user = userData
        next()
    } catch (e) {
        return next(res.status(500).json({ message: 'Create error4' }))
    }
}





