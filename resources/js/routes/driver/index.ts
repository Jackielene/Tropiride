import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import profile from './profile'
import booking from './booking'
import password from './password'
import twoFactor from './two-factor'
/**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:17
 * @route '/driver/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/driver/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:17
 * @route '/driver/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:17
 * @route '/driver/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:17
 * @route '/driver/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:17
 * @route '/driver/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:17
 * @route '/driver/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DriverDashboardController::dashboard
 * @see app/Http/Controllers/DriverDashboardController.php:17
 * @route '/driver/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
 * @see routes/web.php:235
 * @route '/driver/debug'
 */
export const debug = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: debug.url(options),
    method: 'get',
})

debug.definition = {
    methods: ["get","head"],
    url: '/driver/debug',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:235
 * @route '/driver/debug'
 */
debug.url = (options?: RouteQueryOptions) => {
    return debug.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:235
 * @route '/driver/debug'
 */
debug.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: debug.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:235
 * @route '/driver/debug'
 */
debug.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: debug.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:235
 * @route '/driver/debug'
 */
    const debugForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: debug.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:235
 * @route '/driver/debug'
 */
        debugForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: debug.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:235
 * @route '/driver/debug'
 */
        debugForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: debug.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    debug.form = debugForm
const driver = {
    dashboard: Object.assign(dashboard, dashboard),
debug: Object.assign(debug, debug),
profile: Object.assign(profile, profile),
booking: Object.assign(booking, booking),
password: Object.assign(password, password),
twoFactor: Object.assign(twoFactor, twoFactor),
}

export default driver