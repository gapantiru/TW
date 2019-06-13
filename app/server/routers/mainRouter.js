const UserHandler           = require('../controllers/UserAPI');
const AnnouncementHandler   = require('../controllers/AnnouncementAPI');
const LoginHandler          = require('../controllers/loginController');
const staticHandler         = require('../controllers/staticController');

let AnnouncementPage        = require('../controllers/announcements');
let AnnouncementDetailPage  = require('../controllers/announcementsDetail');
let FirstPage               = require('../controllers/firstPage');
let myAccount               = require('../controllers/myAccount');
let Profile                 = require('../controllers/profile');

let middlewares             = require('../utils/middlewares');

let Router                  = require('router');

let mainRouter = Router();

mainRouter.use(middlewares.set_user);

/*
INIT ROUTES API
 */
UserHandler.init_routes(mainRouter);
AnnouncementHandler.init_routes(mainRouter);

/*
INIT STATIC ROUTES
 */
staticHandler.init_routes(mainRouter);

/*
INIT LOGIN ROUTES
 */
LoginHandler.init_routes(mainRouter);

/*
INIT TEMPLATES ROUTES (FROM VIEWS)
 */
myAccount.init_routes(mainRouter);
Profile.init_routes(mainRouter);

AnnouncementPage.init_routes(mainRouter);
AnnouncementDetailPage.init_routes(mainRouter);
FirstPage.init_routes(mainRouter);


/*
EXPORT ROUTER TO BE USED IN MAIN APP
 */
module.exports = mainRouter;


