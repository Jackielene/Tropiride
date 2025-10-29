import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import debug070426 from './debug'
/**
* @see \App\Http\Controllers\AdminDashboardController::dashboard
 * @see app/Http/Controllers/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::dashboard
 * @see app/Http/Controllers/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::dashboard
 * @see app/Http/Controllers/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminDashboardController::dashboard
 * @see app/Http/Controllers/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminDashboardController::dashboard
 * @see app/Http/Controllers/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminDashboardController::dashboard
 * @see app/Http/Controllers/AdminDashboardController.php:17
 * @route '/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminDashboardController::dashboard
 * @see app/Http/Controllers/AdminDashboardController.php:17
 * @route '/admin/dashboard'
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
 * @see routes/web.php:161
 * @route '/admin/debug'
 */
export const debug = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: debug.url(options),
    method: 'get',
})

debug.definition = {
    methods: ["get","head"],
    url: '/admin/debug',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:161
 * @route '/admin/debug'
 */
debug.url = (options?: RouteQueryOptions) => {
    return debug.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:161
 * @route '/admin/debug'
 */
debug.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: debug.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:161
 * @route '/admin/debug'
 */
debug.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: debug.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:161
 * @route '/admin/debug'
 */
    const debugForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: debug.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:161
 * @route '/admin/debug'
 */
        debugForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: debug.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:161
 * @route '/admin/debug'
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
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
debug: Object.assign(debug, debug070426),
}

export default admin