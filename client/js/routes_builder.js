var Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  NotFoundRoute = Router.NotFoundRoute,
  RedirectRoute = Router.RedirectRoute;

router.routes([
  new Route({path: '/about', tag: 'about'}),
  new Route({path: '/contacts/*', tag: 'contacts'}),
  new Route({path: '/feedback', tag: 'feedback'}),
  new Route({path: '/management/contacts',tag:'manager-contact'}),
  new NotFoundRoute({tag: 'not-found'})
  ]);
  riot.mount('*');
  router.start();
