const express = require('express')
const router = express.Router()
const eventsController = require('./../controllers/events.controller')
const organizationsController = require('./../controllers/organizations.controller')
const invitationsController = require('../controllers/invitations.controller')
const meetingsController = require('../controllers/meetings.controller')
const paymentsController = require('../controllers/payments.controller')
const auth = require('./../authorization/middlewares/verify.user.middleware').auth
const mailService = require('../services/mailer')

// Events
router.post('/event/create', auth, eventsController.create)
router.get('/event/get-own', auth, eventsController.getOwn)
router.get('/event/:id', eventsController.show)
router.post(
    '/event/:eventId/submit-invitation',
    auth,
    invitationsController.submit
)
router.get('/event', auth, eventsController.index)

// Organizations
router.post('/organization/create', auth, organizationsController.create)
router.get(
    '/organization/get-own',
    auth,
    organizationsController.getOwnOrganizations
)
router.get('/organization/:id', organizationsController.show)
router.get('/organization/:id/events', organizationsController.getEvents)
router.post(
    '/organization/:id/post/create',
    auth,
    organizationsController.createPost
)
router.get('/organization/:id/post', organizationsController.posts)



router.post('/meeting/create', auth, meetingsController.create)
router.get('/meeting/:id/messages', auth, meetingsController.getAllMessages)

router.post('/payment/create', auth, paymentsController.create)
router.post('/event/invite-by-mail', auth, mailService.sendMail)
router.get('/event/get-purchases', auth, eventsController.getPurchases)

module.exports = router