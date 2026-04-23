# Monitoring Service

Monitoring service encapsulates user event tracking, error tracking and user
session recordings. It uses Segment, Sentry and LogRocket services for that
respectively. The nice thing about monitoring service is that it abstracts those
services away behind a nice and minimalistic API.

So the end user only has to deal with a single service instead of 3 different
ones.

## Provided Hooks and Utilities

Please check the code of specific functions for available arguments.

`initMonitoringService` - call it once for your application before everything
else; it will initialize all the required services.

`useMonitoringService` - accepts the `currentUser` object, identifies the
current user in all respective services, call it as soon as you get the current
user info.

`reportComponentError` - use it to report errors to Sentry caught by the error
boundary.

`reportGraphqlError` and `reportGraphqlErrors` - use it to report network and
data-related errors to Sentry.

`trackPage` and `trackEvent` - track page views and user custom events with
Google Analytics (uses Segment for that).

`wrapWithPerformanceProfiler` - wrap your application component to get Sentry
performance profiling, returns higher-order component.

`PerformanceCollector` - wrap your application to get some additional
performance tracking.
